require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import your route files
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
// const auth = require('./routes/auth');

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
app.use('/api/profiles', profileRoutes);
const path = require('path');
const fs = require('fs');

// --- FRONTEND SERVING (The "Catch-All") ---
// Corrected to '../Frontend/dist' to match your exact directory casing
const frontendBuildPath = path.resolve(__dirname, '../Frontend/dist');

if (fs.existsSync(frontendBuildPath)) {
    console.log("✅ Frontend production build found at:", frontendBuildPath);
    
    // Serve static files (CSS, JS, Images) from the built folder
    app.use(express.static(frontendBuildPath));

    // Redirect any direct URL entry (like the email reset link) back to React
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
} else {
    // If you haven't built the frontend yet, this safety block stops the crash!
    console.warn("⚠️ Warning: Frontend production build folder was not found at:", frontendBuildPath);
    console.log("👉 Run 'npm run build' inside your Frontend folder to generate it.");
    
    // Fallback route so your backend API continues running smoothly
    app.get('/', (req, res) => {
        res.send('Backend API is live, but production Frontend build is missing.');
    });
}


// Simple Health Check
app.get('/', (req, res) => {
    res.send('Server is running perfectly.');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
});