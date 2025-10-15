const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now, // Automatically sets the creation timestamp
  },
  postId: {
    type: String, // UUID of the related post, passed from the frontend
    required: true,
  },
});

// Export the schema
const Comment = mongoose.model('Comment', commentsSchema);
module.exports = Comment;
