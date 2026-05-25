const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    // 1. Get the token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Splits "Bearer <TOKEN>"

    // 2. Check if token doesn't exist
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    

    try {
        // 3. Verify the token using your JWT secret from the .env file
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Attach the user payload to the request object
        // This makes req.user available inside your authController.getAllMembers
        req.user = decoded; 
        
        // 5. Move to the next function (the controller)
        next(); 
    } catch (error) {
        // 4. Catch invalid or expired tokens
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};