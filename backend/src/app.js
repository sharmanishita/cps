// Load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const connectDB = require('./config/db'); // A separate service for the database connection

// --- Route Imports ---
const authRoutes = require('./routes/authRoutes');

// --- Initialize Express App ---
const app = express();

// --- Database Connection ---
// connectDB();

// --- Core Middlewares ---
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware for parsing incoming JSON request bodies
app.use(express.json());

// --- API Route Mounting ---
// Mount authentication routes under the '/api/auth' prefix
app.use('/api/auth', authRoutes);

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is active on port ${PORT}`);
});