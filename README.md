LeadMasters Exam App 🎯
A comprehensive full-stack exam-taking application built for LeadMasters AI Tech Solutions fresher assessment. This application provides a robust platform for conducting timed multiple-choice exams with user authentication, subject-wise question selection, per-question timing, and detailed result analysis.

✨ Key Features
🔐 Authentication & Security
Secure user registration and login with JWT tokens
Password hashing with bcrypt
Protected routes and middleware
Session management with 24-hour token expiry
📚 Comprehensive Question Bank
110+ Tech Questions across 8 major subjects:
JavaScript (20 questions)
React (18 questions)
Node.js (15 questions)
Data Structures & Algorithms (15 questions)
Databases (12 questions)
Web Development (12 questions)
CSS (10 questions)
Python (8 questions)
Questions categorized by difficulty: Easy, Medium, Hard
Subject-wise or mixed-topic exam options
⏱️ Advanced Timing System
Fixed 45-second timer per question
Auto-advance to next question when timer expires
Total exam timer tracking
Visual countdown indicators
Auto-submit on exam completion or timeout
🎮 Interactive Exam Interface
Clean, modern MCQ interface
Flexible exam setup: Choose 5, 10, 15, or 20 questions
Subject selection: Pick specific technology or mixed topics
Question navigation with progress tracking
Real-time timer display
Responsive design for all devices
📊 Comprehensive Results & Analytics
Detailed scoring with percentage and grade
Performance analysis by subject
Question-by-question review
Exam history tracking
Printable result certificates
Time spent analysis
🛠️ Tech Stack
Frontend: React.js 18+ with Hooks, React Router v6
Backend: Node.js with Express.js framework
Database: MongoDB with Mongoose ODM
Authentication: JWT (JSON Web Tokens) with bcrypt
Styling: Modern CSS3 with Flexbox/Grid
HTTP Client: Axios for API communication

📁 Project Structure
LeadMasters-Exam-App/
├── backend/
│   ├── models/
│   │   ├── User.js              # User schema with auth methods
│   │   ├── Question.js          # Question schema with subjects
│   │   └── ExamResult.js        # Exam results and history
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   └── exam.js              # Exam and question endpoints
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── server.js                # Express server setup
│   ├── seedQuestions.js         # Basic question seeder
│   ├── seed100Plus.js           # Comprehensive 110+ questions
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js         # User login form
    │   │   ├── Register.js      # User registration
    │   │   ├── Dashboard.js     # Main dashboard
    │   │   ├── ExamSetup.js     # Exam configuration
    │   │   ├── Exam.js          # Main exam interface
    │   │   ├── Results.js       # Results display
    │   │   └── Navbar.js        # Navigation component
    │   ├── contexts/
    │   │   └── AuthContext.js   # Authentication context
    │   ├── App.js               # Main app component
    │   ├── App.css              # App-specific styles
    │   └── index.css            # Global styles
    └── package.json

🚀 Setup Instructions
Prerequisites
Node.js (v16 or higher) - Download here
MongoDB (local installation or MongoDB Atlas) - Download here
npm or yarn package manager
Git for version control
🔧 Backend Setup
Navigate to backend directory:
cd backend
Install dependencies:
npm install
Create environment file:
cp .env.example .env
Configure environment variables in .env:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/examapp
JWT_SECRET=leadmasters_exam_app_jwt_secret_key_2024
Seed database with 110+ comprehensive questions:
# For comprehensive question bank (recommended)
node seed100Plus.js

# OR for basic sample questions
node seedQuestions.js
Start the backend server:
npm start
✅ Backend server will run on http://localhost:5000

⚛️ Frontend Setup
Navigate to frontend directory:
cd frontend
Install dependencies:
npm install
Start the React development server:
npm start
✅ Frontend will run on http://localhost:3000

🎯 Quick Start
Clone the repository
Start MongoDB service on your machine
Run backend setup commands above
Run frontend setup commands above
Open browser to http://localhost:3000
Register a new user and start taking exams!
📡 API Endpoints
Authentication Routes (/api/auth)
📝 Register User
POST /api/auth/register
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
🔐 Login User
POST /api/auth/login
Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}
Response: Same as register
👤 Get Current User
GET /api/auth/me
Headers: Authorization: Bearer <jwt_token>
Response: { "user": { user_data } }
Exam Routes (/api/exam)
📚 Get Available Subjects
GET /api/exam/subjects
Headers: Authorization: Bearer <jwt_token>
Response:
{
  "subjects": [
    "JavaScript", "React", "Node.js", "Data Structures & Algorithms",
    "Databases", "Web Development", "CSS", "Python"
  ]
}
❓ Get Questions for Exam
GET /api/exam/questions?subject=JavaScript&count=10
Headers: Authorization: Bearer <jwt_token>
Query Parameters:
subject: Subject name or "All" for mixed topics
count: Number of questions (5, 10, 15, or 20)
Response:
{
  "questions": [
    {
      "_id": "question_id",
      "question": "What is JavaScript?",
      "options": {
        "A": "Programming language",
        "B": "Markup language",
        "C": "Database",
        "D": "Framework"
      },
      "subject": "JavaScript",
      "difficulty": "Easy",
      "timeLimit": 45
    }
  ]
}
📤 Submit Exam
POST /api/exam/submit
Headers: Authorization: Bearer <jwt_token>
Body:
{
  "answers": [
    {
      "questionId": "question_id_1",
      "selectedAnswer": "A",
      "timeSpent": 30
    }
  ],
  "totalTimeSpent": 450,
  "subject": "JavaScript"
}
Response:
{
  "score": 8,
  "totalQuestions": 10,
  "percentage": 80,
  "grade": "B+",
  "resultId": "result_id"
}
📊 Get Exam Result
GET /api/exam/result/:resultId
Headers: Authorization: Bearer <jwt_token>
Response: Detailed exam result with question analysis
📈 Get Exam History
GET /api/exam/history
Headers: Authorization: Bearer <jwt_token>
Response: Array of all user's exam attempts
🧪 Testing the API
Using cURL Commands
1. Register a new user:
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
2. Login user:
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
3. Get available subjects:
curl -X GET http://localhost:5000/api/exam/subjects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
4. Get questions for exam:
curl -X GET "http://localhost:5000/api/exam/questions?subject=JavaScript&count=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
5. Submit exam answers:
curl -X POST http://localhost:5000/api/exam/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "answers": [
      {
        "questionId": "QUESTION_ID_HERE",
        "selectedAnswer": "A",
        "timeSpent": 35
      }
    ],
    "totalTimeSpent": 450,
    "subject": "JavaScript"
  }'
📮 Using Postman
Import Collection: Create a new Postman collection
Set Environment Variables:
baseURL: http://localhost:5000
authToken: Your JWT token (set after login)
Test Endpoints: Use the provided request formats above
Authorization: Add Bearer {{authToken}} to protected routes
🎯 How to Use the Application
For Students:
🔐 Registration/Login

Create a new account with name, email, and password
Login with your credentials to get JWT token
📋 Dashboard

View welcome message and exam instructions
See your exam history and previous scores
Access exam setup to start new exam
⚙️ Exam Setup

Choose from 8 available subjects or select "All" for mixed topics
Select number of questions: 5, 10, 15, or 20
Review exam rules (45 seconds per question)
📝 Taking the Exam

Answer multiple-choice questions with A, B, C, D options
Each question has exactly 45 seconds
Auto-advance when timer expires
Navigate between questions (forward only)
Submit manually or auto-submit on completion
📊 View Results

Detailed score breakdown with percentage and grade
Question-by-question analysis
Performance insights by subject
Printable certificate
Time analysis and efficiency metrics
For Developers:
API Integration: Use the comprehensive REST API
Database Management: MongoDB with 110+ seeded questions
Authentication: JWT-based secure authentication
Customization: Easy to extend with new subjects and questions
🚀 Deployment
Production Deployment
Environment Setup:

NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
Build Frontend:

cd frontend
npm run build
Deploy Backend: Use platforms like Heroku, Vercel, or DigitalOcean

Database: Use MongoDB Atlas for cloud database

Environment Variables: Set all required env vars in production

🤝 Contributing
Fork the repository
Create feature branch: git checkout -b feature/AmazingFeature
Commit changes: git commit -m 'Add AmazingFeature'
Push to branch: git push origin feature/AmazingFeature
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.




