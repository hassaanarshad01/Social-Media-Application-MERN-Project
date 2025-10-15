const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Replace with a secure secret

router.post('/signup', async (req, res) => {
  console.log('Request for signup');
  const { username, email, password } = req.body;
  console.log('Request received with:', req.body); // Debug log

  try {
    // Check if email is already in use
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Check if username is already in use
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      console.log('User already exists with username:', username);
      return res.status(400).json({ message: 'User already exists with this username' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log('User registered:', username);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


router.post('/login', async (req, res) => {
  console.log('request for login');
  const { email, password } = req.body;
  try {
    console.log('Email:', email, 'Password:', password);
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log('user found and no error in process');
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });
    console.log('password found and no error in process');
    res.status(200).json({ message: 'Login successful', username: user.username});
  } catch (err) {
    console.log('Error during login:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
