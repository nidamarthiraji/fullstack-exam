const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

const sampleQuestions = [
  // JavaScript Questions
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: {
      A: "String",
      B: "Boolean",
      C: "Float",
      D: "Number"
    },
    correctAnswer: "C",
    subject: "JavaScript",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between '==' and '===' in JavaScript?",
    options: {
      A: "No difference",
      B: "=== checks type and value, == only checks value",
      C: "== is faster than ===",
      D: "=== is deprecated"
    },
    correctAnswer: "B",
    subject: "JavaScript",
    difficulty: "Medium"
  },
  {
    question: "What is a closure in JavaScript?",
    options: {
      A: "A way to close browser windows",
      B: "A function that has access to variables in its outer scope",
      C: "A method to end loops",
      D: "A type of error handling"
    },
    correctAnswer: "B",
    subject: "JavaScript",
    difficulty: "Hard"
  },

  // React Questions
  {
    question: "What is the purpose of React hooks?",
    options: {
      A: "To add state to functional components",
      B: "To create class components",
      C: "To handle routing",
      D: "To manage CSS styles"
    },
    correctAnswer: "A",
    subject: "React",
    difficulty: "Medium"
  },
  {
    question: "What is the purpose of the 'key' prop in React lists?",
    options: {
      A: "To style list items",
      B: "To help React identify which items have changed",
      C: "To sort the list items",
      D: "To add event listeners"
    },
    correctAnswer: "B",
    subject: "React",
    difficulty: "Medium"
  },
  {
    question: "Which hook is used for side effects in React?",
    options: {
      A: "useState",
      B: "useEffect",
      C: "useContext",
      D: "useReducer"
    },
    correctAnswer: "B",
    subject: "React",
    difficulty: "Easy"
  },

  // Node.js Questions
  {
    question: "What is the purpose of middleware in Express.js?",
    options: {
      A: "To handle database connections",
      B: "To process requests before they reach route handlers",
      C: "To render HTML templates",
      D: "To manage user sessions"
    },
    correctAnswer: "B",
    subject: "Node.js",
    difficulty: "Medium"
  },
  {
    question: "Which module is used to create HTTP servers in Node.js?",
    options: {
      A: "fs",
      B: "path",
      C: "http",
      D: "url"
    },
    correctAnswer: "C",
    subject: "Node.js",
    difficulty: "Easy"
  },
  {
    question: "What is the event loop in Node.js?",
    options: {
      A: "A loop that handles synchronous operations",
      B: "A mechanism that handles asynchronous operations",
      C: "A debugging tool",
      D: "A package manager"
    },
    correctAnswer: "B",
    subject: "Node.js",
    difficulty: "Hard"
  },

  // Data Structures & Algorithms
  {
    question: "What is the time complexity of binary search?",
    options: {
      A: "O(n)",
      B: "O(log n)",
      C: "O(n²)",
      D: "O(1)"
    },
    correctAnswer: "B",
    subject: "Data Structures & Algorithms",
    difficulty: "Medium"
  },
  {
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: {
      A: "Bubble Sort",
      B: "Selection Sort",
      C: "Quick Sort",
      D: "Insertion Sort"
    },
    correctAnswer: "C",
    subject: "Data Structures & Algorithms",
    difficulty: "Medium"
  },
  {
    question: "What is the space complexity of merge sort?",
    options: {
      A: "O(1)",
      B: "O(log n)",
      C: "O(n)",
      D: "O(n²)"
    },
    correctAnswer: "C",
    subject: "Data Structures & Algorithms",
    difficulty: "Hard"
  },

  // Databases
  {
    question: "Which of the following is a NoSQL database?",
    options: {
      A: "MySQL",
      B: "PostgreSQL",
      C: "MongoDB",
      D: "SQLite"
    },
    correctAnswer: "C",
    subject: "Databases",
    difficulty: "Easy"
  },
  {
    question: "What does ACID stand for in database transactions?",
    options: {
      A: "Atomicity, Consistency, Isolation, Durability",
      B: "Accuracy, Consistency, Integrity, Durability",
      C: "Atomicity, Concurrency, Isolation, Durability",
      D: "Accuracy, Concurrency, Integrity, Durability"
    },
    correctAnswer: "A",
    subject: "Databases",
    difficulty: "Medium"
  },
  {
    question: "What is database normalization?",
    options: {
      A: "Making database faster",
      B: "Organizing data to reduce redundancy",
      C: "Backing up database",
      D: "Encrypting database"
    },
    correctAnswer: "B",
    subject: "Databases",
    difficulty: "Hard"
  },

  // Web Development
  {
    question: "What does REST stand for?",
    options: {
      A: "Representational State Transfer",
      B: "Remote State Transfer",
      C: "Representational System Transfer",
      D: "Remote System Transfer"
    },
    correctAnswer: "A",
    subject: "Web Development",
    difficulty: "Easy"
  },
  {
    question: "Which HTTP method is used to update a resource?",
    options: {
      A: "GET",
      B: "POST",
      C: "PUT",
      D: "DELETE"
    },
    correctAnswer: "C",
    subject: "Web Development",
    difficulty: "Easy"
  },
  {
    question: "Which of the following is NOT a valid HTTP status code?",
    options: {
      A: "200",
      B: "404",
      C: "999",
      D: "500"
    },
    correctAnswer: "C",
    subject: "Web Development",
    difficulty: "Medium"
  },

  // CSS
  {
    question: "Which CSS property is used to make text bold?",
    options: {
      A: "text-weight",
      B: "font-weight",
      C: "text-style",
      D: "font-style"
    },
    correctAnswer: "B",
    subject: "CSS",
    difficulty: "Easy"
  },
  {
    question: "What is CSS Flexbox used for?",
    options: {
      A: "Creating animations",
      B: "Layout and alignment of elements",
      C: "Styling text",
      D: "Managing colors"
    },
    correctAnswer: "B",
    subject: "CSS",
    difficulty: "Medium"
  },

  // Python
  {
    question: "Which of the following is used to create a virtual environment in Python?",
    options: {
      A: "pip",
      B: "venv",
      C: "npm",
      D: "yarn"
    },
    correctAnswer: "B",
    subject: "Python",
    difficulty: "Easy"
  },
  {
    question: "What is a list comprehension in Python?",
    options: {
      A: "A way to understand lists",
      B: "A concise way to create lists",
      C: "A method to compress lists",
      D: "A debugging technique"
    },
    correctAnswer: "B",
    subject: "Python",
    difficulty: "Medium"
  },

  // Security & Authentication
  {
    question: "What does JWT stand for?",
    options: {
      A: "JavaScript Web Token",
      B: "JSON Web Token",
      C: "Java Web Token",
      D: "JavaScript Web Technology"
    },
    correctAnswer: "B",
    subject: "Security & Authentication",
    difficulty: "Easy"
  },
  {
    question: "What is the purpose of HTTPS?",
    options: {
      A: "To make websites faster",
      B: "To encrypt data transmission",
      C: "To compress data",
      D: "To cache content"
    },
    correctAnswer: "B",
    subject: "Security & Authentication",
    difficulty: "Medium"
  },

  // System Design
  {
    question: "What is the default port for HTTP?",
    options: {
      A: "80",
      B: "443",
      C: "8080",
      D: "3000"
    },
    correctAnswer: "A",
    subject: "System Design",
    difficulty: "Easy"
  },
  {
    question: "What is load balancing?",
    options: {
      A: "Balancing server loads physically",
      B: "Distributing incoming requests across multiple servers",
      C: "Balancing database queries",
      D: "Managing server power consumption"
    },
    correctAnswer: "B",
    subject: "System Design",
    difficulty: "Medium"
  }
];

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/examapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log(`Inserted ${sampleQuestions.length} sample questions`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedQuestions();