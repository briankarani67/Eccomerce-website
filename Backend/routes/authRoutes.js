
const express = require('express');
const router = express.Router();
const db = require('../config/db')
// Import the entire controller object so you can access all functions
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/profile/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const [user] = await db.execute(
            `SELECT p.first_name, p.last_name, u.email, p.phone, p.country 
             FROM user_profiles p 
             JOIN users u ON p.user_id = u.user_id 
             WHERE p.user_id = ?`, 
            [userId]
        );
        if (user.length === 0) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(user[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/members', verifyToken, authController.getAllMembers);
router.get('/members/:id', verifyToken, authController.getMemberById);

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