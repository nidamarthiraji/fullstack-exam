import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSubjects } from '../api';

const ExamSetup = ({ onStartExam }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [questionCount, setQuestionCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const response = await fetchSubjects();
      setSubjects(['All', ...response.data.subjects]);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setError('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = () => {
    onStartExam({
      subject: selectedSubject,
      questionCount: questionCount
    });
  };

  if (loading) {
    return <div className="loading">Loading exam setup...</div>;
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="text-center mb-3">Exam Setup</h2>
      
      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      <div className="form-group">
        <label className="form-label">Select Subject/Technology</label>
        <select
          className="form-control"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map(subject => (
            <option key={subject} value={subject}>
              {subject === 'All' ? 'Mixed Topics (All Subjects)' : subject}
            </option>
          ))}
        </select>
        <small style={{ color: '#6c757d', marginTop: '8px', display: 'block' }}>
          Choose a specific technology or select "Mixed Topics" for questions from all subjects
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">Number of Questions</label>
        <select
          className="form-control"
          value={questionCount}
          onChange={(e) => setQuestionCount(parseInt(e.target.value))}
        >
          <option value={5}>5 Questions</option>
          <option value={10}>10 Questions</option>
          <option value={15}>15 Questions</option>
          <option value={20}>20 Questions</option>
        </select>
        <small style={{ color: '#6c757d', marginTop: '8px', display: 'block' }}>
          Each question has exactly 45 seconds to answer
        </small>
      </div>

      {/* Exam Preview */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h4>Exam Preview</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <strong>Subject:</strong><br />
            {selectedSubject === 'All' ? 'Mixed Topics' : selectedSubject}
          </div>
          <div>
            <strong>Questions:</strong><br />
            {questionCount} questions
          </div>
          <div>
            <strong>Timing:</strong><br />
            Individual per question
          </div>
          <div>
            <strong>Total Time:</strong><br />
            {Math.round((questionCount * 45) / 60)} minutes
          </div>
        </div>
      </div>

      {/* Timing Information */}
      <div className="alert" style={{ background: '#e3f2fd', color: '#1565c0', border: '1px solid #bbdefb' }}>
        <h4>⏱️ Exam Timing System</h4>
        <ul style={{ marginBottom: '0', paddingLeft: '20px' }}>
          <li><strong>Every Question:</strong> Exactly 45 seconds each</li>
          <li><strong>Auto-Advance:</strong> Timer automatically moves to next question when time runs out</li>
          <li><strong>Manual Navigation:</strong> You can move to next question before time expires</li>
          <li><strong>No Going Back:</strong> Once you move forward, you cannot return to previous questions</li>
          <li><strong>Total Time:</strong> {questionCount} questions × 45 seconds = {Math.round((questionCount * 45) / 60)} minutes</li>
        </ul>
      </div>

      <div className="text-center">
        <button 
          onClick={handleStartExam}
          className="btn btn-primary"
          style={{ fontSize: '18px', padding: '16px 32px' }}
        >
          Start Exam
        </button>
        <br />
        <button 
          onClick={() => navigate('/dashboard')}
          className="btn btn-secondary mt-3"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ExamSetup;