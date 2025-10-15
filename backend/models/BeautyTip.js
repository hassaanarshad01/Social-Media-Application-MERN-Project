const tipSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    videoUrl: { type: String },
    category: {
      type: String,
      enum: ['skincare', 'makeup', 'haircare', 'general'],
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin or Expert
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Tip', tipSchema);
  