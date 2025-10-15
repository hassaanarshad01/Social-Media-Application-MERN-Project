const mongoose = require('mongoose');

const imageGallerySchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title or description of the image
  imageUrl: { type: String, required: true }, // Path or URL to the image
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who uploaded the image
  tags: [String], // Optional tags for categorization (e.g., 'skincare', 'makeup')
  createdAt: { type: Date, default: Date.now }, // Date of upload
});

module.exports = mongoose.model('ImageGallery', imageGallerySchema);
