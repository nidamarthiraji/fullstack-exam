# Exam Application

A full-stack web application for conducting online exams with user authentication, question management, and result tracking.

## 🚀 Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Exam Management**: Create and take multiple-choice exams
- **Real-time Results**: Instant scoring and result tracking
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Protected Routes**: Secure access to exam content for authenticated users only

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
exam-app/
├── backend/
│   ├── controllers/
│   │   └── examController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Question.js
│   │   └── ExamResult.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── examRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Exam.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Results.js
│   │   │   └── Navbar.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd exam-app
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/examapp
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   Application will open on `http://localhost:3000`

## 📝 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - User login

### Exam Routes (`/api/exam`)
- `GET /questions` - Get exam questions (protected)
- `POST /submit` - Submit exam answers (protected)
- `GET /results/:id` - Get exam results (protected)

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Dashboard**: View available exams and previous results
3. **Take Exam**: Answer multiple-choice questions within the time limit
4. **View Results**: Check your score and correct answers after submission

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes with middleware
- Input validation and sanitization
- CORS configuration for secure cross-origin requests

## 🎨 UI Components

- **Navbar**: Navigation with authentication status
- **Login/Register**: User authentication forms
- **Dashboard**: Overview of exams and results
- **Exam**: Interactive question interface
- **Results**: Detailed score breakdown

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy using platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the React application:
   ```bash
   npm run build
   ```
2. Deploy the build folder to platforms like Netlify, Vercel, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
