const express = require('express');
const router = express.Router();
const Comment = require('../models/comments'); // Assuming the Comment schema is in models/Comment.js

// Create a new comment
router.post('/create', async (req, res) => {
  try {
    const { comment, username, postId } = req.body;

    // Validate required fields
    if (!comment || !username || !postId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new comment
    const newComment = new Comment({ comment, username, postId });
    await newComment.save();

    res.status(201).json({ message: 'Comment created successfully.', comment: newComment });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get all comments for a specific postId
router.get('/get/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    // Fetch comments related to the postId
    const comments = await Comment.find({ postId }).sort({ dateCreated: -1 }); // Most recent first

    res.status(200).json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
