const express = require("express");
const router = express.Router();
const User = require("../models/UserPref");

// Save or update user preferences
router.post("/setUserPref", async (req, res) => {
    console.log('settingUserPref');
    const { username, favoriteCategory } = req.body;

    if (!username || !favoriteCategory) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Find user by username and update preferences, or create if not found
        const user = await User.findOneAndUpdate(
            { username }, // Find user by username
            { favoriteCategory }, // Update the favoriteCategory
            { new: true, upsert: true } // `new: true` returns the updated user, `upsert: true` creates a new user if none found
        );

        // Send success response
        res.status(200).json({ message: "User preferences saved/updated successfully.", user });
        console.log('user preferences updated successfully with: ', favoriteCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

// Get user preferences by username
router.get("/getUserPref/:username", async (req, res) => {
    const { username } = req.params;
    console.log('getting the preferences');
    try {
        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Send the user's preferences
        res.status(200).json({ favoriteCategory: user.favoriteCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;
