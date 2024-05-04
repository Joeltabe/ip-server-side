const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const User = require('../models/userModel');
const JWT_SECRET = process.env.JWT_SECRET || 'enjoy';

// Register a new user
router.post('/register', async (req, res) => {
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Login user
router.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Find user by username
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send JWT token to the client
      res.json({ message: 'Login successful', token });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

  

module.exports = router;
