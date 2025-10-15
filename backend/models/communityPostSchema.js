const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuid library

// Schema for Profile Uploads
const profileUploadSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    ref: 'User', // Links to the User schema
  },
  image: {
    type: String, // URL or path to the image
    required: true,
  },
  caption: {
    type: String, // Optional caption
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation timestamp
  },
});

// Schema for Community Uploads
const communityUploadSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    ref: 'User', // Links to the User schema
  },
  image: { // Single image field
    type: String, // URL or path to the image
    required: true,
  },
  caption: {
    type: String, // Optional caption
    trim: true,
  },
  uniqueIdentifier: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4, // Automatically generates a UUID
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation timestamp
  },
});

module.exports = mongoose.model('CommunityUpload', communityUploadSchema);

// Export both models
const ProfileUpload = mongoose.model('ProfileUpload', profileUploadSchema);
const CommunityUpload = mongoose.model('CommunityUpload', communityUploadSchema);

module.exports = {
  ProfileUpload,
  CommunityUpload,
};
