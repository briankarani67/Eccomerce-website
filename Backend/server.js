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

const path = require('path');
const fs = require('fs');

// 1. Define the path (Adjust this if your folder is named 'client' or 'build')
const frontendPath = path.resolve(__dirname, './Frontend/dist');

// 2. DEBUG: This will print to your Render logs so you can see if the path is real
if (fs.existsSync(frontendPath)) {
    console.log("✅ Frontend dist folder found at:", frontendPath);
} else {
    console.log("❌ ERROR: Frontend dist folder NOT found at:", frontendPath);
    console.log("Current Directory (__dirname):", __dirname);
}

// 3. Serve Static Files
app.use(express.static(frontendPath));

// 4. The Catch-All
app.get('*', (req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send(`Frontend not built. Looking for index.html at: ${indexPath}`);
    }
});

app.use(express.json()); // Essential to parse JSON in req.body

// Mount Routes
// This prefix means all auth routes start with /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);



// Simple Health Check
app.get('/', (req, res) => {
    res.send('Server is running perfectly.');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
});