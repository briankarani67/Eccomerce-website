
const express = require('express');
const router = express.Router();
// Import the entire controller object so you can access all functions
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/profile/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const [user] = await db.execute(
            'SELECT first_name, last_name, email, phone, country FROM users WHERE user_id = ?', 
            [userId]
        );
        if (user.length === 0) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(user[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/create-profile', async (req, res) => {
    const { user_id, first_name, last_name, phone, country } = req.body;
    try {
        await db.execute(
            'INSERT INTO user_profiles (user_id, first_name, last_name, phone, country) VALUES (?, ?, ?, ?, ?)',
            [user_id, first_name, last_name, phone, country]
        );
        res.status(201).json({ message: "Profile created successfully!" });
    } catch (err) {
        console.error("Profile Creation Error:", err);
        res.status(500).json({ message: "Error saving profile details" });
    }
});

module.exports = router;