const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        
        const targetId = req.user.user_id || req.user.id;

        if (!targetId) {
            return res.status(401).json({ message: "Invalid session token identity structure." });
        }

        const [rows] = await db.execute('SELECT role FROM users WHERE user_id = ?', [targetId]);

        if (rows.length === 0 || rows[0].role === 'suspended') {
            return res.status(403).json({ 
                message: "Session expired. This account has been deactivated." 
            });
        }
        
        next(); 
    } catch (error) {
        console.error("Middleware Auth Error:", error.message);
        return res.status(403).json({ message: "Invalid, expired token or unauthorized access." });
    }
};