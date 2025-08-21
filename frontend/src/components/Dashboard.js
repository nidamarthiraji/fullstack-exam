import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [examHistory, setExamHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExamHistory();
  }, []);

  const fetchExamHistory = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/exam/history', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    console.log("Exam history response:", response.data);

    // Backend returns { results: [...] }
    if (response.data.results) {
      setExamHistory(response.data.results);
    } else {
      setExamHistory(response.data); 
    }
  } catch (error) {
    console.error('Error fetching exam history:', error);
    setError('Failed to load exam history');
  } finally {
    setLoading(false);
  }
};


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="card">
        <h1>Welcome, {user?.name}!</h1>
        <p className="mb-3">Ready to take your exam? Click the button below to start.</p>
        
        <div className="text-center">
          <Link to="/exam" className="btn btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>
            Start Exam
          </Link>
        </div>
      </div>

      <div className="card">
        <h2>Exam Instructions</h2>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>The exam consists of 10 multiple-choice questions</li>
          <li>You have 30 minutes to complete the exam</li>
          <li>Each question has 4 options (A, B, C, D)</li>
          <li>You can navigate between questions using Next/Previous buttons</li>
          <li>The exam will auto-submit when time runs out</li>
          <li>Make sure you have a stable internet connection</li>
          <li>Once submitted, you cannot retake the same exam</li>
        </ul>
      </div>

      <div className="card">
        <h2>Exam History</h2>
        {loading ? (
          <div className="loading">Loading exam history...</div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : examHistory.length === 0 ? (
          <p>No exams taken yet. Start your first exam above!</p>
        ) : (
          <div className="table-responsive">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Score</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Correct Answers</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Time Taken</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {examHistory.map((result, index) => (
                  <tr key={result._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px' }}>{formatDate(result.completedAt)}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        fontWeight: 'bold',
                        color: result.score >= 70 ? '#28a745' : result.score >= 50 ? '#ffc107' : '#dc3545'
                      }}>
                        {result.score}%
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {result.correctAnswers}/{result.totalQuestions}
                    </td>
                    <td style={{ padding: '12px' }}>{formatTime(result.timeTaken)}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        background: result.score >= 70 ? '#d4edda' : result.score >= 50 ? '#fff3cd' : '#f8d7da',
                        color: result.score >= 70 ? '#155724' : result.score >= 50 ? '#856404' : '#721c24'
                      }}>
                        {result.score >= 70 ? 'PASSED' : result.score >= 50 ? 'AVERAGE' : 'FAILED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;