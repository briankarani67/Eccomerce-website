const db = require('../config/db');
const { hashPassword } = require('../utils/hashPassword');
const { comparePassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/generateToken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');



exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Validation check
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 2. Check Username separately
    const [userCheck] = await db.execute(
      'SELECT username FROM users WHERE username = ?', 
      [username]
    );
    if (userCheck.length > 0) {
      return res.status(400).json({ message: "That username is already taken." });
    }

    // 3. Check Email separately
    const [emailCheck] = await db.execute(
      'SELECT email FROM users WHERE email = ?', 
      [email]
    );
    if (emailCheck.length > 0) {
      return res.status(400).json({ message: "That email is already registered." });
    }

    // 4. If both are clear, Hash the password
    const hashedPassword = await hashPassword(password);

    // 5. Insert the new user
    await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    // 2. Verify password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "The email you have entered doesn't match with that password" });
    }

    // 3. NEW: Check if the user has a profile in the user_profiles table
    const [profiles] = await db.execute(
      'SELECT profile_id FROM user_profiles WHERE user_id = ?', 
      [user.user_id]
    );

    // 4. Generate token using your new utility
    const token = generateToken(user);

    // 5. Send response (Including hasProfile flag for your frontend redirect logic)
    res.status(200).json({
      message: "Login successful",
      token,
      hasProfile: profiles.length > 0, // Returns true if a profile exists, false otherwise
      user: {
        id: user.user_id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("--- Forgot Password Process Started for:", email);

    try {
        // 1. Check if user exists
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(404).json({ message: "That email is not registered." });
        }

        const user = users[0];

        // 2. Generate a secure 32-byte token
        const token = crypto.randomBytes(32).toString('hex');
        const expiry = new Date(Date.now() + 3600000); // Expires in 1 hour

        // 3. Save token to DB (Use 'id' or 'user_id' based on your workbench)
        // Note: Change 'id' to 'user_id' below if that's your column name
        await db.execute(
            'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
            [token, expiry, email]
        );

        // 4. Configure Nodemailer
        const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000,   // 5 seconds
    socketTimeout: 15000     // 15 seconds
});

        // 5. Define the reset link (Switch to localhost:3000 if testing locally)
        const resetUrl = `https://eccomerce-website-77zg.onrender.com/reset-password/${token}`;

        // 6. Send the Mail
        const mailOptions = {
            from: `"Braines Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Request",
            html: `
                <div style="font-family: sans-serif; border: 1px solid #e2e2e2; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #064420;">Password Reset</h2>
                    <p>You requested to reset your password for your Braines account.</p>
                    <p>Click the button below to set a new password. This link is valid for 1 hour.</p>
                    <a href="${resetUrl}" style="background-color: #064420; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
                    <p style="margin-top: 20px; font-size: 12px; color: #666;">If you didn't request this, you can safely ignore this email.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        
        console.log(` Reset email sent to: ${email}`);
        res.status(200).json({ message: "Reset link sent to your email!" });

    } catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error);
        res.status(500).json({ message: "Error sending email. Please check server logs." });
    }
};




exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // 1. Check if token is valid and NOT expired
        const [users] = await db.execute(
            'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()',
            [token]
        );

        if (users.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const user = users[0];

        // 2. Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Update the user record - Use 'user_id' to match your Workbench
        await db.execute(
            'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE user_id = ?',
            [hashedPassword, user.user_id]
        );

        res.status(200).json({ message: "Password updated successfully! You can now login." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.getAllMembers = async (req, res) => {
    try {
        const [members] = await db.execute(`
            SELECT 
                u.user_id, 
                p.first_name, 
                p.last_name, 
                u.email, 
                p.phone, 
                p.country, 
                u.role, 
                u.created_at 
            FROM users u
            LEFT JOIN user_profiles p ON u.user_id = p.user_id
            ORDER BY u.created_at DESC
        `);
        
        res.status(200).json(members);
    } catch (error) {
        console.error("Fetch Members Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};