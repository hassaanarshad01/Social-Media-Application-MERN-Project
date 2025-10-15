const express = require('express');
const router = express.Router();
const multer = require('multer');
const { ProfileUpload, CommunityUpload } = require('../models/communityPostSchema'); 

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({ storage });

// Middleware to parse JSON stuff
router.use(express.json());

/* Profile Upload Route */
router.post('/community/upload', upload.single('image'), async (req, res) => {
    const { username, caption } = req.body;
    const image = req.file; 
  
    // Validate input
    if (!username || !caption || !image) {
      return res.status(400).json({
        message: 'Username, caption, and an image are required.',
      });
    }
  
    try {
      // Create a new community upload entry
      const newCommunityUpload = new CommunityUpload({
        username,
        image: image.path, // Single image field
        caption,
      });
  
      // Save to database
      await newCommunityUpload.save();
  
      // Send success response
      res.status(201).json({
        message: 'Community post uploaded successfully.',
        communityPost: newCommunityUpload,
      });
    } catch (err) {
      // Handle server errors
      console.error('Error saving community post:', err.message);
      res.status(500).json({
        message: 'Server error while uploading community post.',
        error: err.message,
      });
    }
  });

/* Community Upload Route */
router.post('/profile/upload', upload.single('image'), async (req, res) => {
    const { username, caption } = req.body;
    const image = req.file;
  
    if (!username || !image) {
      return res.status(400).json({ message: 'Username and image are required.' });
    }
  
    try {
      const newProfileUpload = new ProfileUpload({
        username,
        image: image.path,
        caption,
      });
  
      await newProfileUpload.save();
      res.status(201).json({
        message: 'Profile post uploaded successfully.',
        profilePost: newProfileUpload,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Server error while uploading profile post.',
        error: err.message,
      });
    }
  });

/* Fetch Route for Filtering */
router.get('/fetch', async (req, res) => {
  const { username, type } = req.query;

  try {
    let results;
    if (type === 'profile') {
      results = username
        ? await ProfileUpload.find({ username })
        : await ProfileUpload.find({});
    } else if (type === 'community') {
      results = username
        ? await CommunityUpload.find({ username })
        : await CommunityUpload.find({});
    } else {
      return res.status(400).json({
        message: 'Invalid type specified. Use "profile" or "community".',
      });
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({
      message: 'Server error while fetching content.',
      error: err.message,
    });
  }
});

module.exports = router;
