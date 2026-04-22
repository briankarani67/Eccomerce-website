// Add this to your backend auth routes
router.get('/profile/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const [user] = await db.execute(
            'SELECT first_name, last_name, email, phone, country FROM users WHERE user_id = ?', 
            [userId]
        );
        if (user.length === 0) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});