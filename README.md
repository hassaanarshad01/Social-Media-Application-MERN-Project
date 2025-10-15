# Makeup Marketplace (MERN Stack)

This is a full-stack web application built with the MERN stack (MongoDB, Express, React, and Node.js).  
The platform allows users to browse and purchase makeup products online, as well as share their own makeup looks, comment on posts, and engage with the community.



## Features

- User authentication (signup, login, JWT-based sessions)
- Product listing and purchasing system
- User posts with image uploads
- Commenting and interaction on user posts
- MongoDB-based storage for users, products, and posts
- RESTful API built with Express and Node.js
- React-based frontend with context-driven state management

---

## Tech Stack

**Frontend**
- React.js  
- Context API  
- CSS Modules  

**Backend**
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- Multer (for file uploads)  
- JWT Authentication  

---

## Project Structure
root/
├── backend/ # Express API, routes, models, controllers
├── frontend/ # React frontend (components, pages, context)
├── .gitignore
└── README.md



---

## Setup and Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/makeup-mern-app.git
cd makeup-mern-app

# Install dependencies
cd backend
npm install
cd ../frontend
npm install

# Create environment variables
# Inside backend/.env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

# Run the servers (in separate terminals)
cd backend
npm start

cd ../frontend
npm start
```
Note: This project was developed as a personal learning and portfolio piece to demonstrate full-stack (MERN) development skills, architecture design, and implementation. It is not intended for production use.



