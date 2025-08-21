const express = require('express');
const Question = require('../models/Question');
const ExamResult = require('../models/ExamResult');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/exam/subjects
// @desc    Get available subjects
// @access  Private
router.get('/subjects', auth, async (req, res) => {
  try {
    const subjects = await Question.distinct('subject');
    res.json({ subjects });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({ message: 'Server error while fetching subjects' });
  }
});

// @route   GET /api/exam/questions
// @desc    Get randomized questions for exam
// @access  Private
router.get('/questions', auth, async (req, res) => {
  try {
    const { subject, questionCount = 10 } = req.query;
    let query = {};
    
    // Filter by subject if provided
    if (subject && subject !== 'All') {
      query.subject = subject;
    }
    
    // Get random questions from database
    const questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: parseInt(questionCount) } }
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for the selected criteria' });
    }

    // Remove correct answers from response (don't send to frontend)
    const questionsForExam = questions.map(question => ({
      _id: question._id,
      question: question.question,
      options: question.options,
      subject: question.subject,
      difficulty: question.difficulty,
      timeLimit: 45 // Fixed 45 seconds per question
    }));

    // Calculate total time based on fixed 45 seconds per question
    const totalTimeLimit = questionsForExam.length * 45;

    res.json({
      questions: questionsForExam,
      totalQuestions: questionsForExam.length,
      timeLimit: totalTimeLimit, // Total time in seconds
      subject: subject || 'Mixed',
      perQuestionTiming: true
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({ message: 'Server error while fetching questions' });
  }
});

// @route   POST /api/exam/submit
// @desc    Submit exam answers and calculate score
// @access  Private
router.post('/submit', auth, async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Invalid answers format' });
    }

    // Get the questions with correct answers
    const questionIds = answers.map(answer => answer.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    // Calculate score
    let correctAnswers = 0;
    const detailedAnswers = [];

    answers.forEach(userAnswer => {
      const question = questions.find(q => q._id.toString() === userAnswer.questionId);
      if (question) {
        const isCorrect = question.correctAnswer === userAnswer.selectedOption;
        if (isCorrect) correctAnswers++;

        detailedAnswers.push({
          questionId: question._id,
          selectedOption: userAnswer.selectedOption,
          isCorrect
        });
      }
    });

    const totalQuestions = answers.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Save exam result
    const examResult = new ExamResult({
      userId: req.user._id,
      answers: detailedAnswers,
      score,
      totalQuestions,
      correctAnswers,
      timeTaken: timeTaken || 0
    });

    await examResult.save();

    res.json({
      message: 'Exam submitted successfully',
      result: {
        score,
        correctAnswers,
        totalQuestions,
        percentage: score,
        timeTaken,
        resultId: examResult._id
      }
    });
  } catch (error) {
    console.error('Submit exam error:', error);
    res.status(500).json({ message: 'Server error while submitting exam' });
  }
});

// @route   GET /api/exam/result/:resultId
// @desc    Get detailed exam result
// @access  Private
router.get('/result/:resultId', auth, async (req, res) => {
  try {
    const result = await ExamResult.findOne({
      _id: req.params.resultId,
      userId: req.user._id
    }).populate('answers.questionId');

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json({ result });
  } catch (error) {
    console.error('Get result error:', error);
    res.status(500).json({ message: 'Server error while fetching result' });
  }
});

// @route   GET /api/exam/history
// @desc    Get user's exam history
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const results = await ExamResult.find({ userId: req.user._id })
      .sort({ completedAt: -1 })
      .select('score correctAnswers totalQuestions timeTaken completedAt');

    res.json({ results });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ message: 'Server error while fetching history' });
  }
});

module.exports = router;