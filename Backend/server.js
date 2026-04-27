require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./config/db'); // Path to your db.js

const initDb = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log(" Aiven Database Table is Ready!");
  } catch (err) {
    console.error("❌ Database Init Error:", err);
  }
};

initDb();


// Import your route files
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
// const allowedOrigin ='https://eccomerce-website-1-kxit.onrender.com'; 

// app.use(cors({
//   origin: allowedOrigin,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
const allowedOrigins = [
  /^http:\/\/localhost(:\d+)?$/, // Matches localhost with ANY port (5173, 5174, 3000, etc.)
  'https://eccomerce-website-1-kxit.onrender.com' // Your live Render site
];

app.use(cors({
  origin: function (origin, callback) {
    // 1. Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);

    // 2. Check if the origin matches our Regex or our Live URL
    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); // Essential to parse JSON in req.body

// Mount Routes
// This prefix means all auth routes start with /api/auth
app.use('/api/auth', authRoutes);

// Simple Health Check
app.get('/', (req, res) => {
    res.send('Server is running perfectly.');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
});