import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Results = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResult();
  }, [resultId]);

  const fetchResult = async () => {
    try {
      const response = await axios.get(`/api/exam/result/${resultId}`);
      setResult(response.data.result);
    } catch (error) {
      console.error('Error fetching result:', error);
      setError('Failed to load exam result');
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745'; // Green
    if (score >= 60) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  };

  const getGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  if (loading) {
    return <div className="loading">Loading exam results...</div>;
  }

  if (error) {
    return (
      <div className="card">
        <div className="alert alert-error">{error}</div>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="card">
        <div className="alert alert-error">Result not found</div>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Main Result Card */}
      <div className="card text-center">
        <h1 style={{ marginBottom: '30px' }}>Exam Results</h1>
        
        {/* Score Circle */}
        <div style={{ 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%', 
          background: `conic-gradient(${getScoreColor(result.score)} ${result.score * 3.6}deg, #e9ecef 0deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px',
          position: 'relative'
        }}>
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: getScoreColor(result.score) }}>
              {result.score}%
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6c757d' }}>
              Grade: {getGrade(result.score)}
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div style={{ marginBottom: '30px' }}>
          {result.score >= 70 ? (
            <div className="alert alert-success">
              <h3>🎉 Congratulations! You passed the exam!</h3>
              <p>Great job! You have successfully completed the assessment.</p>
            </div>
          ) : result.score >= 50 ? (
            <div className="alert" style={{ background: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' }}>
              <h3>📚 Good effort! You can do better!</h3>
              <p>You're on the right track. Consider reviewing the topics and try again.</p>
            </div>
          ) : (
            <div className="alert alert-error">
              <h3>📖 Keep studying! You need more preparation.</h3>
              <p>Don't give up! Review the material and take the exam again when you're ready.</p>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="card">
        <h2>Exam Statistics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>
              {result.correctAnswers}
            </div>
            <div>Correct Answers</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc3545' }}>
              {result.totalQuestions - result.correctAnswers}
            </div>
            <div>Incorrect Answers</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>
              {result.totalQuestions}
            </div>
            <div>Total Questions</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>
              {formatTime(result.timeTaken)}
            </div>
            <div>Time Taken</div>
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="card">
        <h2>Performance Analysis</h2>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Accuracy Rate</span>
            <span style={{ fontWeight: 'bold' }}>
              {Math.round((result.correctAnswers / result.totalQuestions) * 100)}%
            </span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '20px', 
            background: '#e9ecef', 
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(result.correctAnswers / result.totalQuestions) * 100}%`,
              height: '100%',
              background: getScoreColor(result.score),
              transition: 'width 0.5s ease'
            }}></div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <h4>Time Management</h4>
            <p>
              You completed the exam in {formatTime(result.timeTaken)} out of 30 minutes available.
              {result.timeTaken < 900 ? ' You finished quickly - make sure you reviewed your answers!' : 
               result.timeTaken > 1500 ? ' You used most of your time - good thoroughness!' : 
               ' Good time management!'}
            </p>
          </div>
          
          <div>
            <h4>Overall Performance</h4>
            <p>
              {result.score >= 80 ? 'Excellent work! You have a strong understanding of the material.' :
               result.score >= 60 ? 'Good performance! There are a few areas you could improve on.' :
               'There is room for improvement. Consider reviewing the material and practicing more.'}
            </p>
          </div>
        </div>
      </div>

      {/* Exam Details */}
      <div className="card">
        <h2>Exam Details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <strong>Completed At:</strong><br />
            {formatDate(result.completedAt)}
          </div>
          <div>
            <strong>Result ID:</strong><br />
            <code style={{ fontSize: '12px', background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px' }}>
              {result._id}
            </code>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card text-center">
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
          <Link to="/exam" className="btn btn-secondary">
            Take Another Exam
          </Link>
          <button 
            onClick={() => window.print()} 
            className="btn btn-secondary"
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;