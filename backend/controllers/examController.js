const Question = require("../models/Question");

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 5 } }]); // random 5
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitExam = async (req, res) => {
  try {
    const { answers } = req.body; // [{questionId, selected}]
    let score = 0;

    for (let ans of answers) {
      const q = await Question.findById(ans.questionId);
      if (q && q.correctAnswer === ans.selected) {
        score++;
      }
    }

    res.json({ score, total: answers.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
