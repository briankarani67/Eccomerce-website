const db = require('../config/db');

// Fetch profile with a JOIN to get email from users table
exports.getProfile = async (req, res) => {
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
};

// Create a new profile entry
exports.createProfile = async (req, res) => {
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
};

// Update existing profile details
exports.updateProfile = async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, phone, country } = req.body;
    try {
        const [result] = await db.execute(
            `UPDATE user_profiles 
             SET first_name = ?, last_name = ?, phone = ?, country = ? 
             WHERE user_id = ?`,
            [first_name, last_name, phone, country, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ message: "Profile updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};