const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

/**
 * ✅ 110 brand-new MCQs (rephrased/varied from your friend’s),
 * grouped by subject and difficulty. Same structure, different content.
 */

// JavaScript (20)
const jsQuestions = [
  { question: "Which value is NOT primitive in JavaScript?", options: { A: "String", B: "Number", C: "Boolean", D: "Object" }, correctAnswer: "D", subject: "JavaScript", difficulty: "Easy" },
  { question: "What does '===' compare in JavaScript?", options: { A: "Values only", B: "References only", C: "Value and type", D: "Memory address" }, correctAnswer: "C", subject: "JavaScript", difficulty: "Easy" },
  { question: "Which statement best describes a closure?", options: { A: "A variable that closes a loop", B: "A function bundled with references to its lexical scope", C: "A terminated function", D: "A class method wrapper" }, correctAnswer: "B", subject: "JavaScript", difficulty: "Medium" },
  { question: "Which array method removes the last element?", options: { A: "pop()", B: "push()", C: "shift()", D: "slice()" }, correctAnswer: "A", subject: "JavaScript", difficulty: "Easy" },
  { question: "What is the value of 'this' in a regular function (non-strict) when called globally in browsers?", options: { A: "undefined", B: "window", C: "null", D: "globalThis is always used" }, correctAnswer: "B", subject: "JavaScript", difficulty: "Medium" },
  { question: "Hoisting moves which of the following to the top of scope?", options: { A: "Function declarations and var declarations", B: "Only let/const", C: "Only arrow functions", D: "Only class expressions" }, correctAnswer: "A", subject: "JavaScript", difficulty: "Medium" },
  { question: "Which is NOT a way to handle async code?", options: { A: "Callbacks", B: "Promises", C: "async/await", D: "Mutex" }, correctAnswer: "D", subject: "JavaScript", difficulty: "Medium" },
  { question: "Result of typeof NaN?", options: { A: "NaN", B: "number", C: "undefined", D: "object" }, correctAnswer: "B", subject: "JavaScript", difficulty: "Easy" },
  { question: "Which string method returns a new lowercased string?", options: { A: "toLower()", B: "lower()", C: "toLowerCase()", D: "toSmall()" }, correctAnswer: "C", subject: "JavaScript", difficulty: "Easy" },
  { question: "Function.prototype.bind does what?", options: { A: "Binds event listeners", B: "Returns a new function with bound this/args", C: "Locks object properties", D: "Links modules" }, correctAnswer: "B", subject: "JavaScript", difficulty: "Medium" },
  { question: "Event delegation relies on:", options: { A: "Shadow DOM", B: "Capturing only", C: "Bubbling to a common ancestor", D: "Inline handlers only" }, correctAnswer: "C", subject: "JavaScript", difficulty: "Hard" },
  { question: "Which creates an array with values 1,2,3?", options: { A: "Array.of(1,2,3)", B: "Array(1,2,3,)", C: "new Array('1,2,3')", D: "Array.create(1,2,3)" }, correctAnswer: "A", subject: "JavaScript", difficulty: "Easy" },
  { question: "Major difference between var and let?", options: { A: "let is function-scoped", B: "var is block-scoped", C: "let is block-scoped", D: "They are identical" }, correctAnswer: "C", subject: "JavaScript", difficulty: "Easy" },
  { question: "Objects inherit features via:", options: { A: "Modules", B: "Prototypes", C: "Packages", D: "Namespaces" }, correctAnswer: "B", subject: "JavaScript", difficulty: "Medium" },
  { question: "Which operator checks value equality with coercion?", options: { A: "==", B: "===", C: "!=", D: "=/=" }, correctAnswer: "A", subject: "JavaScript", difficulty: "Easy" },
  { question: "Array.map returns:", options: { A: "A filtered array", B: "A transformed new array", C: "The same array", D: "An iterator only" }, correctAnswer: "B", subject: "JavaScript", difficulty: "Easy" },
  { question: "Destructuring allows you to:", options: { A: "Mutate prototypes", B: "Extract values into variables from arrays/objects", C: "Serialize objects", D: "Create classes" }, correctAnswer: "B", subject: "JavaScript", difficulty: "Medium" },
  { question: "Spread operator (...) can:", options: { A: "Duplicate variables by reference", B: "Expand iterables/object props", C: "Create private fields", D: "Pause execution" }, correctAnswer: "B", subject: "JavaScript", difficulty: "Easy" },
  { question: "null vs undefined best statement:", options: { A: "Same thing", B: "null = intentional empty; undefined = not assigned", C: "undefined is legacy", D: "null means missing type" }, correctAnswer: "B", subject: "JavaScript", difficulty: "Medium" },
  { question: "A Promise state cannot be:", options: { A: "pending", B: "fulfilled", C: "rejected", D: "canceled by default" }, correctAnswer: "D", subject: "JavaScript", difficulty: "Hard" },
];

// React (18)
const reactQuestions = [
  { question: "Hooks enable what in function components?", options: { A: "Routing only", B: "State and lifecycle features", C: "Server rendering only", D: "Build tools" }, correctAnswer: "B", subject: "React", difficulty: "Easy" },
  { question: "Why use a stable 'key' in lists?", options: { A: "To style items", B: "To help React reconcile efficiently", C: "To fetch data", D: "To memoize functions" }, correctAnswer: "B", subject: "React", difficulty: "Easy" },
  { question: "useEffect is primarily for:", options: { A: "Declaring props", B: "Side effects", C: "Creating reducers", D: "Styling" }, correctAnswer: "B", subject: "React", difficulty: "Easy" },
  { question: "JSX is:", options: { A: "Templating language only", B: "Syntax extension that compiles to React.createElement", C: "XML parser", D: "Node server" }, correctAnswer: "B", subject: "React", difficulty: "Medium" },
  { question: "Virtual DOM purpose:", options: { A: "Persist to disk", B: "Efficient diffing vs real DOM", C: "Replace browser DOM", D: "Manage CSS" }, correctAnswer: "B", subject: "React", difficulty: "Medium" },
  { question: "Class state update method:", options: { A: "this.change()", B: "this.setState()", C: "state()", D: "update()" }, correctAnswer: "B", subject: "React", difficulty: "Easy" },
  { question: "Prop drilling refers to:", options: { A: "Passing props through many levels", B: "Debugging props", C: "Encrypting props", D: "Dropping props" }, correctAnswer: "A", subject: "React", difficulty: "Medium" },
  { question: "When to use useReducer?", options: { A: "For simple state only", B: "For complex/transition-heavy state", C: "For DOM refs", D: "For styling" }, correctAnswer: "B", subject: "React", difficulty: "Medium" },
  { question: "useContext lets you:", options: { A: "Create a store", B: "Read context value", C: "Write reducers", D: "Batch updates" }, correctAnswer: "B", subject: "React", difficulty: "Easy" },
  { question: "React.memo helps by:", options: { A: "Caching API calls", B: "Skipping re-render if props unchanged", C: "Saving to localStorage", D: "Minifying bundle" }, correctAnswer: "B", subject: "React", difficulty: "Hard" },
  { question: "After a component mounts (class), which lifecycle fires?", options: { A: "componentDidMount", B: "componentWillMount", C: "shouldComponentUpdate", D: "getSnapshotBeforeUpdate" }, correctAnswer: "A", subject: "React", difficulty: "Easy" },
  { question: "Controlled input means:", options: { A: "DOM stores value", B: "React state is the single source of truth", C: "No state", D: "Only refs used" }, correctAnswer: "B", subject: "React", difficulty: "Medium" },
  { question: "Why use <React.Fragment>?", options: { A: "To add extra DOM nodes", B: "To group children without extra nodes", C: "To style children", D: "To lazy load" }, correctAnswer: "B", subject: "React", difficulty: "Easy" },
  { question: "useMemo purpose:", options: { A: "Memoize expensive values", B: "Memoize event handlers", C: "Create refs", D: "Subscribe to context" }, correctAnswer: "A", subject: "React", difficulty: "Medium" },
  { question: "useCallback memoizes:", options: { A: "Numbers", B: "Functions", C: "Components", D: "Styles" }, correctAnswer: "B", subject: "React", difficulty: "Medium" },
  { question: "React Router provides:", options: { A: "Server-side routing", B: "Client-side navigation", C: "DB queries", D: "Build pipeline" }, correctAnswer: "B", subject: "React", difficulty: "Easy" },
  { question: "componentDidUpdate runs:", options: { A: "Before mount", B: "After props/state update", C: "On unmount only", D: "Never" }, correctAnswer: "B", subject: "React", difficulty: "Medium" },
  { question: "Suspense is mainly for:", options: { A: "Error boundaries only", B: "Data fetching APIs + code splitting loading states", C: "Server only", D: "Animations" }, correctAnswer: "B", subject: "React", difficulty: "Hard" },
];

// Node.js (15)
const nodeQuestions = [
  { question: "Middleware in Express executes:", options: { A: "After response only", B: "Between request and route handler", C: "Only on errors", D: "Only on POST" }, correctAnswer: "B", subject: "Node.js", difficulty: "Medium" },
  { question: "Core module to create HTTP server:", options: { A: "http", B: "net", C: "fs", D: "path" }, correctAnswer: "A", subject: "Node.js", difficulty: "Easy" },
  { question: "Event loop primarily handles:", options: { A: "Synchronous I/O", B: "Asynchronous callbacks/tasks", C: "CSS transforms", D: "SQL queries only" }, correctAnswer: "B", subject: "Node.js", difficulty: "Hard" },
  { question: "npm stands for:", options: { A: "Node Project Manager", B: "Node Package Manager", C: "Network Package Manager", D: "New Package Manager" }, correctAnswer: "B", subject: "Node.js", difficulty: "Easy" },
  { question: "Async file read method:", options: { A: "fs.readFile", B: "fs.readFileSync", C: "fs.openSync", D: "fs.statSync" }, correctAnswer: "A", subject: "Node.js", difficulty: "Easy" },
  { question: "package.json is used to:", options: { A: "Run the kernel", B: "Describe project and dependencies", C: "Compile C++", D: "Store cached node_modules" }, correctAnswer: "B", subject: "Node.js", difficulty: "Easy" },
  { question: "Clustering allows:", options: { A: "Single process only", B: "Multiple worker processes sharing the same port", C: "GPU processing", D: "Blocking I/O" }, correctAnswer: "B", subject: "Node.js", difficulty: "Hard" },
  { question: "Module for path operations:", options: { A: "url", B: "path", C: "http", D: "querystring" }, correctAnswer: "B", subject: "Node.js", difficulty: "Easy" },
  { question: "process.env is commonly used to:", options: { A: "Access environment variables", B: "Log CPU stats", C: "Stream files", D: "Patch modules" }, correctAnswer: "A", subject: "Node.js", difficulty: "Medium" },
  { question: "A Buffer represents:", options: { A: "Array of numbers only", B: "Mutable raw binary data", C: "JSON wrapper", D: "Socket pool" }, correctAnswer: "B", subject: "Node.js", difficulty: "Medium" },
  { question: "Create server snippet is:", options: { A: "http.server()", B: "http.createServer()", C: "http.new()", D: "server.create()" }, correctAnswer: "B", subject: "Node.js", difficulty: "Easy" },
  { question: "CommonJS import keyword:", options: { A: "import", B: "include", C: "use", D: "require" }, correctAnswer: "D", subject: "Node.js", difficulty: "Easy" },
  { question: "Express is:", options: { A: "SQL client", B: "Web framework for Node.js", C: "Build tool", D: "Template engine" }, correctAnswer: "B", subject: "Node.js", difficulty: "Easy" },
  { question: "nodemon helps by:", options: { A: "Linting code", B: "Restarting app on file changes", C: "Compiling TypeScript", D: "Installing packages" }, correctAnswer: "B", subject: "Node.js", difficulty: "Medium" },
  { question: "app.use() is used to:", options: { A: "Mount middleware", B: "Start DB", C: "Render views", D: "Create cluster" }, correctAnswer: "A", subject: "Node.js", difficulty: "Medium" },
];

// Data Structures & Algorithms (15)
const dsaQuestions = [
  { question: "Binary search complexity on sorted array:", options: { A: "O(n)", B: "O(log n)", C: "O(n log n)", D: "O(1)" }, correctAnswer: "B", subject: "Data Structures & Algorithms", difficulty: "Easy" },
  { question: "Typically fastest average-case sort among these:", options: { A: "Bubble", B: "Selection", C: "Quick sort", D: "Gnome" }, correctAnswer: "C", subject: "Data Structures & Algorithms", difficulty: "Medium" },
  { question: "Merge sort space complexity:", options: { A: "O(1)", B: "O(log n)", C: "O(n)", D: "O(n^2)" }, correctAnswer: "C", subject: "Data Structures & Algorithms", difficulty: "Medium" },
  { question: "Stack discipline:", options: { A: "FIFO", B: "LIFO", C: "Random", D: "Priority only" }, correctAnswer: "B", subject: "Data Structures & Algorithms", difficulty: "Easy" },
  { question: "Queue discipline:", options: { A: "LIFO", B: "FIFO", C: "DFS", D: "Greedy" }, correctAnswer: "B", subject: "Data Structures & Algorithms", difficulty: "Easy" },
  { question: "Array access by index:", options: { A: "O(1)", B: "O(log n)", C: "O(n)", D: "O(n^2)" }, correctAnswer: "A", subject: "Data Structures & Algorithms", difficulty: "Easy" },
  { question: "Binary tree is:", options: { A: "At most two children per node", B: "Exactly two children", C: "Only one child", D: "Unordered list" }, correctAnswer: "A", subject: "Data Structures & Algorithms", difficulty: "Medium" },
  { question: "Quicksort worst-case time:", options: { A: "O(n log n)", B: "O(n)", C: "O(n^2)", D: "O(log n)" }, correctAnswer: "C", subject: "Data Structures & Algorithms", difficulty: "Hard" },
  { question: "Hash table is:", options: { A: "Balanced tree", B: "Key to value mapping via hash function", C: "Heap", D: "Queue" }, correctAnswer: "B", subject: "Data Structures & Algorithms", difficulty: "Medium" },
  { question: "Average hash insert time:", options: { A: "O(1)", B: "O(log n)", C: "O(n)", D: "O(n log n)" }, correctAnswer: "A", subject: "Data Structures & Algorithms", difficulty: "Medium" },
  { question: "Linked list:", options: { A: "Contiguous memory", B: "Nodes with pointers", C: "Matrix", D: "Stack only" }, correctAnswer: "B", subject: "Data Structures & Algorithms", difficulty: "Easy" },
  { question: "Dynamic programming is about:", options: { A: "Randomized choices", B: "Optimal substructure + overlapping subproblems", C: "Backtracking", D: "Sorting only" }, correctAnswer: "B", subject: "Data Structures & Algorithms", difficulty: "Hard" },
  { question: "Big-O describes:", options: { A: "Exact runtime", B: "Upper bound growth rate", C: "Space units", D: "CPU brand" }, correctAnswer: "B", subject: "Data Structures & Algorithms", difficulty: "Medium" },
  { question: "Graph consists of:", options: { A: "Vertices and edges", B: "Keys and values", C: "Rows and columns", D: "Stacks and queues" }, correctAnswer: "A", subject: "Data Structures & Algorithms", difficulty: "Easy" },
  { question: "Recursion means:", options: { A: "Looping with while", B: "Function calling itself", C: "Parallelism", D: "Memoization only" }, correctAnswer: "B", subject: "Data Structures & Algorithms", difficulty: "Easy" },
];

// Databases (12)
const dbQuestions = [
  { question: "Choose a document database:", options: { A: "MySQL", B: "PostgreSQL", C: "MongoDB", D: "SQLite" }, correctAnswer: "C", subject: "Databases", difficulty: "Easy" },
  { question: "ACID stands for:", options: { A: "Atomicity, Consistency, Isolation, Durability", B: "Accuracy, Concurrency, Integrity, Durability", C: "Atomicity, Coherency, Isolation, Division", D: "Atomicity, Consistency, Integration, Durability" }, correctAnswer: "A", subject: "Databases", difficulty: "Medium" },
  { question: "Normalization mainly reduces:", options: { A: "Indexes", B: "Redundancy and anomalies", C: "Joins", D: "Storage engines" }, correctAnswer: "B", subject: "Databases", difficulty: "Medium" },
  { question: "Primary key is:", options: { A: "Any nullable column", B: "Unique identifier for a row", C: "Foreign reference", D: "Index type" }, correctAnswer: "B", subject: "Databases", difficulty: "Easy" },
  { question: "SQL expands to:", options: { A: "Structured Query Language", B: "Serialized Query Language", C: "Server Query Language", D: "Scriptable Query Language" }, correctAnswer: "A", subject: "Databases", difficulty: "Easy" },
  { question: "Foreign key:", options: { A: "Links to primary key in another table", B: "Encrypts rows", C: "Backs up DB", D: "Sorts results" }, correctAnswer: "A", subject: "Databases", difficulty: "Medium" },
  { question: "Index improves:", options: { A: "Write latency only", B: "Read/query performance", C: "Storage space", D: "Backup speed only" }, correctAnswer: "B", subject: "Databases", difficulty: "Medium" },
  { question: "JOIN does:", options: { A: "Combine rows across tables by relation", B: "Concatenate columns", C: "Clone a table", D: "Encrypt data" }, correctAnswer: "A", subject: "Databases", difficulty: "Medium" },
  { question: "Transaction property:", options: { A: "Partial updates allowed", B: "All-or-nothing unit of work", C: "Skips consistency", D: "Ignores isolation" }, correctAnswer: "B", subject: "Databases", difficulty: "Hard" },
  { question: "Sharding means:", options: { A: "Vertical partitioning only", B: "Horizontal partition across nodes", C: "Adding indexes", D: "Query caching" }, correctAnswer: "B", subject: "Databases", difficulty: "Hard" },
  { question: "CRUD expands to:", options: { A: "Create, Read, Update, Delete", B: "Copy, Run, Undo, Delete", C: "Create, Replace, Upload, Drop", D: "Cache, Read, Update, Dump" }, correctAnswer: "A", subject: "Databases", difficulty: "Easy" },
  { question: "Replication provides:", options: { A: "Lower availability", B: "Copies of data for redundancy/reads", C: "Schema migration", D: "Compression only" }, correctAnswer: "B", subject: "Databases", difficulty: "Medium" },
];

// Web Development (12)
const webQuestions = [
  { question: "REST stands for:", options: { A: "Representational State Transfer", B: "Remote State Transfer", C: "Resource System Transfer", D: "Rendered State Transport" }, correctAnswer: "A", subject: "Web Development", difficulty: "Easy" },
  { question: "HTTP verb commonly used for full resource update:", options: { A: "GET", B: "POST", C: "PUT", D: "TRACE" }, correctAnswer: "C", subject: "Web Development", difficulty: "Easy" },
  { question: "Invalid HTTP status among these:", options: { A: "200", B: "418", C: "404", D: "799" }, correctAnswer: "D", subject: "Web Development", difficulty: "Medium" },
  { question: "CORS allows:", options: { A: "Cross-origin requests with permissions", B: "Only same-origin requests", C: "Cookie deletion", D: "Automatic caching" }, correctAnswer: "A", subject: "Web Development", difficulty: "Medium" },
  { question: "API stands for:", options: { A: "Application Programming Interface", B: "Advanced Program Integration", C: "App Program Interaction", D: "Application Process Indicator" }, correctAnswer: "A", subject: "Web Development", difficulty: "Easy" },
  { question: "JSON is:", options: { A: "Data format based on JS object syntax", B: "Image format", C: "SQL dialect", D: "Compression tool" }, correctAnswer: "A", subject: "Web Development", difficulty: "Easy" },
  { question: "AJAX primarily refers to:", options: { A: "Sync requests", B: "Async JS + XML (or JSON) techniques", C: "WebSockets", D: "CSS animations" }, correctAnswer: "B", subject: "Web Development", difficulty: "Medium" },
  { question: "Cookie best described as:", options: { A: "Server config file", B: "Small key-value pair stored by browser", C: "HTML element", D: "Cache only" }, correctAnswer: "B", subject: "Web Development", difficulty: "Easy" },
  { question: "sessionStorage persists:", options: { A: "Across tabs", B: "Until tab/window closes", C: "Forever", D: "On server only" }, correctAnswer: "B", subject: "Web Development", difficulty: "Medium" },
  { question: "Webhook is:", options: { A: "Polling mechanism", B: "HTTP callback triggered by events", C: "Web worker", D: "Service worker" }, correctAnswer: "B", subject: "Web Development", difficulty: "Hard" },
  { question: "Responsive design goal:", options: { A: "Faster server", B: "Adapt layout to screen sizes", C: "Only desktop view", D: "Disable scrolling" }, correctAnswer: "B", subject: "Web Development", difficulty: "Medium" },
  { question: "CDN purpose:", options: { A: "Edge delivery of assets", B: "Database cluster", C: "Dev server", D: "CSS framework" }, correctAnswer: "A", subject: "Web Development", difficulty: "Medium" },
];

// CSS (10)
const cssQuestions = [
  { question: "Make text bold with:", options: { A: "font-weight", B: "text-weight", C: "font-bold()", D: "weight" }, correctAnswer: "A", subject: "CSS", difficulty: "Easy" },
  { question: "Flexbox is optimized for:", options: { A: "1D layout (row/column)", B: "2D grid layout", C: "Print styles", D: "SVG only" }, correctAnswer: "A", subject: "CSS", difficulty: "Medium" },
  { question: "CSS Grid is:", options: { A: "Animation library", B: "2D layout system", C: "Reset stylesheet", D: "Selector API" }, correctAnswer: "B", subject: "CSS", difficulty: "Medium" },
  { question: "Selector chooses elements by:", options: { A: "Patterns (tag, class, id, etc.)", B: "File name", C: "Screen size", D: "Network speed" }, correctAnswer: "A", subject: "CSS", difficulty: "Easy" },
  { question: "Specificity decides:", options: { A: "Color palette", B: "Which rule wins among conflicts", C: "Compression", D: "Cascading order only by time" }, correctAnswer: "B", subject: "CSS", difficulty: "Hard" },
  { question: ":hover is a:", options: { A: "Pseudo-element", B: "Pseudo-class", C: "Module", D: "Function" }, correctAnswer: "B", subject: "CSS", difficulty: "Medium" },
  { question: "Box model includes:", options: { A: "margin, border, padding, content", B: "flex, grid, block, inline", C: "tag, class, id, attr", D: "div, span, p, a" }, correctAnswer: "A", subject: "CSS", difficulty: "Medium" },
  { question: "Media queries allow:", options: { A: "Conditional styles per device features", B: "SQL queries", C: "DOM selection", D: "JS execution" }, correctAnswer: "A", subject: "CSS", difficulty: "Medium" },
  { question: "CSS animations change properties:", options: { A: "Instantly", B: "Over time via keyframes", C: "Server-side only", D: "Only on hover" }, correctAnswer: "B", subject: "CSS", difficulty: "Hard" },
  { question: "A preprocessor like SASS provides:", options: { A: "Variables/mixins/nesting compiled to CSS", B: "Browser extensions", C: "SVG filters", D: "JS transpilation" }, correctAnswer: "A", subject: "CSS", difficulty: "Hard" },
];

// Python (8)
const pyQuestions = [
  { question: "Create a virtual environment using:", options: { A: "venv", B: "pip", C: "npm", D: "conda only" }, correctAnswer: "A", subject: "Python", difficulty: "Easy" },
  { question: "List comprehension is:", options: { A: "List formatter", B: "Compact syntax to build lists", C: "Type checker", D: "Debugger" }, correctAnswer: "B", subject: "Python", difficulty: "Medium" },
  { question: "PEP 8 relates to:", options: { A: "Performance guide", B: "Style conventions", C: "Packaging only", D: "Async IO" }, correctAnswer: "B", subject: "Python", difficulty: "Medium" },
  { question: "A decorator in Python is:", options: { A: "Function that returns a modified function", B: "Loop helper", C: "Module loader", D: "Class instance" }, correctAnswer: "A", subject: "Python", difficulty: "Hard" },
  { question: "pip stands for:", options: { A: "Package Installer for Python", B: "Python Interface Protocol", C: "Program Install Python", D: "Package Interface Python" }, correctAnswer: "A", subject: "Python", difficulty: "Easy" },
  { question: "Lambda function is:", options: { A: "Anonymous function", B: "Thread", C: "Coroutine", D: "Module" }, correctAnswer: "A", subject: "Python", difficulty: "Medium" },
  { question: "__init__ is:", options: { A: "Destructor", B: "Constructor initializer for class instances", C: "Main script", D: "Decorator" }, correctAnswer: "B", subject: "Python", difficulty: "Medium" },
  { question: "GIL stands for:", options: { A: "Global Interpreter Lock", B: "General Interface Layer", C: "Global Import List", D: "Generic Integration Link" }, correctAnswer: "A", subject: "Python", difficulty: "Hard" },
];

// Combine all 110
const allQuestions = [
  ...jsQuestions,
  ...reactQuestions,
  ...nodeQuestions,
  ...dsaQuestions,
  ...dbQuestions,
  ...webQuestions,
  ...cssQuestions,
  ...pyQuestions,
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/examapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
    console.log(`Seeding ${allQuestions.length} questions...`);

    await Question.deleteMany({});
    await Question.insertMany(allQuestions);

    const subjects = await Question.distinct('subject');
    console.log('\n📊 Questions by subject:');
    for (const subject of subjects) {
      const count = await Question.countDocuments({ subject });
      console.log(` - ${subject}: ${count}`);
    }

    console.log(`\n🎉 Done! Inserted ${allQuestions.length} brand-new questions.`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
