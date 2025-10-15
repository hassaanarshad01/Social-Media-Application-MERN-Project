const mongoose = require("mongoose");

const UserPref = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  favoriteCategory: {
    type: String,
    enum: ["blush", "eyeliner", "lipstick", "foundation", "mascara"],
    required: true,
  },
});

module.exports = mongoose.model("UserPref", UserPref);
