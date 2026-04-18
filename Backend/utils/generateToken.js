const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generates a signed JWT for a user.
 * @param {Object} user - The user object from the database.
 * @returns {string} - The generated token.
 */
const generateToken = (user) => {
    // The payload contains the data you want to store in the token
    const payload = {
        id: user.user_id,
        role: user.role
    };

    // Sign the token using your secret and expiration from .env
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });
};

module.exports = { generateToken };