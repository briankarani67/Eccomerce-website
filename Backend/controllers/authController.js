const db = require('../config/db');
const { hashPassword } = require('../utils/hashPassword');
const { comparePassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/generateToken');

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

    // 3. Generate token using your new utility
    const token = generateToken(user);

    // 4. Send response
    res.status(200).json({
      message: "Login successful",
      token,
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