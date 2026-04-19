require('dotenv').config();
const express = require('express');
const cors = require('cors');


// Import your route files
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
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