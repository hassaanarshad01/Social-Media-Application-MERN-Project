const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./connectDB');
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.options('/api/auth/*', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/posts', require('./routes/Posts'));
app.use('/api/comments', require('./routes/comments'));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
