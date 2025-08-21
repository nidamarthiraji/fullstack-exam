import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExamSetup from './ExamSetup';

const Exam = () => {
  const [examStarted, setExamStarted] = useState(false);
  const [examConfig, setExamConfig] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionTimeLeft, setQuestionTimeLeft] = useState(0); // Time for current question
  const [totalTimeLeft, setTotalTimeLeft] = useState(0); // Total exam time left
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [examStartTime, setExamStartTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  
  const navigate = useNavigate();

  // Handle exam start
  const handleStartExam = async (config) => {
    setExamConfig(config);
    setLoading(true);
    
    try {
      const params = new URLSearchParams({
        subject: config.subject,
        questionCount: config.questionCount.toString()
      });
      
      const response = await axios.get(`/api/exam/questions?${params}`);
      const fetchedQuestions = response.data.questions;
      
      setQuestions(fetchedQuestions);
      setExamStartTime(Date.now());
      setQuestionStartTime(Date.now());
      setQuestionTimeLeft(fetchedQuestions[0]?.timeLimit || 45);
      setTotalTimeLeft(response.data.timeLimit);
      setExamStarted(true);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load exam questions');
      setLoading(false);
    }
  };

  // Auto-submit function
  const submitExam = useCallback(async (isAutoSubmit = false, reason = '') => {
    if (submitting) return;
    
    setSubmitting(true);
    
    try {
      const timeTaken = examStartTime ? Math.floor((Date.now() - examStartTime) / 1000) : 0;
      const answersArray = questions.map(question => ({
        questionId: question._id,
        selectedOption: answers[question._id] || 'A' // Default to A if no answer selected
      }));

      const response = await axios.post('/api/exam/submit', {
        answers: answersArray,
        timeTaken
      });

      if (isAutoSubmit) {
        alert(`${reason || 'Time is up!'} Your exam has been automatically submitted.`);
      }

      navigate(`/results/${response.data.result.resultId}`);
    } catch (error) {
      console.error('Error submitting exam:', error);
      setError('Failed to submit exam. Please try again.');
      setSubmitting(false);
    }
  }, [answers, questions, examStartTime, navigate, submitting]);

  // Move to next question automatically when time runs out
  const moveToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setQuestionStartTime(Date.now());
      setQuestionTimeLeft(questions[nextIndex]?.timeLimit || 45);
    } else {
      // Last question, submit exam
      submitExam(true, 'All questions completed!');
    }
  }, [currentQuestionIndex, questions, submitExam]);

  // Question timer effect
  useEffect(() => {
    if (!examStarted || questionTimeLeft <= 0) {
      if (examStarted && questionTimeLeft <= 0) {
        moveToNextQuestion();
      }
      return;
    }

    const timer = setInterval(() => {
      setQuestionTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionTimeLeft, examStarted, moveToNextQuestion]);

  // Total timer effect
  useEffect(() => {
    if (!examStarted || totalTimeLeft <= 0) {
      if (examStarted && totalTimeLeft <= 0) {
        submitExam(true, 'Total exam time expired!');
      }
      return;
    }

    const timer = setInterval(() => {
      setTotalTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalTimeLeft, examStarted, submitExam]);

  // Prevent browser back/refresh during exam
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    const handlePopState = (e) => {
      e.preventDefault();
      if (window.confirm('Are you sure you want to leave the exam? Your progress will be lost.')) {
        window.history.go(-1);
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.pathname);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setQuestionStartTime(Date.now());
      setQuestionTimeLeft(questions[nextIndex]?.timeLimit || 45);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setQuestionStartTime(Date.now());
      setQuestionTimeLeft(questions[prevIndex]?.timeLimit || 45);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setQuestionStartTime(Date.now());
    setQuestionTimeLeft(questions[index]?.timeLimit || 45);
  };

  // Show exam setup if exam hasn't started
  if (!examStarted) {
    return <ExamSetup onStartExam={handleStartExam} />;
  }

  if (loading) {
    return <div className="loading">Loading exam questions...</div>;
  }

  if (error) {
    return (
      <div className="card">
        <div className="alert alert-error">{error}</div>
        <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="card">
        <div className="alert alert-error">No questions available for the exam.</div>
        <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div>
      {/* Dual Timer System */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div className={`timer ${questionTimeLeft <= 10 ? 'warning' : ''}`} style={{ flex: '1', minWidth: '200px' }}>
          Question Time: {formatTime(questionTimeLeft)}
        </div>
        <div className="timer" style={{ flex: '1', minWidth: '200px', background: '#667eea' }}>
          Total Time: {formatTime(totalTimeLeft)}
        </div>
      </div>

      {/* Exam Info Bar */}
      <div className="card" style={{ padding: '16px', marginBottom: '20px', background: '#f8f9fa' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div><strong>Subject:</strong> {examConfig?.subject === 'All' ? 'Mixed Topics' : examConfig?.subject}</div>
          <div><strong>Difficulty:</strong> {currentQuestion.difficulty}</div>
          <div><strong>Time per Question:</strong> 45 seconds</div>
          <div><strong>Progress:</strong> {currentQuestionIndex + 1}/{questions.length}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question Navigation */}
      <div className="card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Question {currentQuestionIndex + 1} of {questions.length}</h3>
          <div>
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`btn ${index === currentQuestionIndex ? 'btn-primary' : 'btn-secondary'} mr-2`}
                style={{ 
                  minWidth: '40px', 
                  height: '40px',
                  marginRight: '8px',
                  marginBottom: '8px',
                  background: answers[questions[index]._id] ? 
                    (index === currentQuestionIndex ? '#667eea' : '#28a745') : 
                    (index === currentQuestionIndex ? '#667eea' : '#f8f9fa'),
                  color: answers[questions[index]._id] ? 'white' : 
                    (index === currentQuestionIndex ? 'white' : '#495057')
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Question */}
        <div className="question-card">
          <div className="question-number">
            Question {currentQuestionIndex + 1}
          </div>
          <h4 style={{ marginBottom: '24px', lineHeight: '1.6' }}>
            {currentQuestion.question}
          </h4>

          {/* Options */}
          <div>
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <div
                key={key}
                className={`option ${answers[currentQuestion._id] === key ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(currentQuestion._id, key)}
              >
                <strong>{key}.</strong> {value}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-3">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="btn btn-secondary"
          >
            ← Previous
          </button>

          <div>
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={() => submitExam(false)}
                disabled={submitting}
                className="btn btn-success"
                style={{ fontSize: '16px', padding: '12px 24px' }}
              >
                {submitting ? 'Submitting...' : 'Submit Exam'}
              </button>
            ) : (
              <button
                onClick={goToNextQuestion}
                className="btn btn-primary"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Exam Stats */}
        <div className="mt-3" style={{ 
          background: '#f8f9fa', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div className="d-flex justify-content-around" style={{ flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <strong>Answered:</strong> {Object.keys(answers).length}/{questions.length}
            </div>
            <div>
              <strong>Remaining:</strong> {questions.length - Object.keys(answers).length}
            </div>
            <div>
              <strong>Question Time:</strong> {formatTime(questionTimeLeft)}
            </div>
            <div>
              <strong>Total Time:</strong> {formatTime(totalTimeLeft)}
            </div>
          </div>
          
          {/* Question difficulty indicator */}
          <div style={{ marginTop: '12px' }}>
            <span style={{
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              background: currentQuestion.difficulty === 'Hard' ? '#dc3545' : 
                         currentQuestion.difficulty === 'Medium' ? '#ffc107' : '#28a745',
              color: currentQuestion.difficulty === 'Medium' ? '#000' : '#fff'
            }}>
              {currentQuestion.difficulty} Question (45s)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;