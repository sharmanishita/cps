// src/app.ts
import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';

// --- Route Imports ---
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import conceptRoutes from './routes/conceptRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import adminRoutes from './routes/adminRoutes'; // <-- Import admin routes

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app: Express = express();

// Connect to Database
connectDB();

// --- Core Middlewares ---
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// --- API Route Mounting ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/concepts', conceptRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/admin', adminRoutes); // <-- Mount admin routes

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in '${process.env.NODE_ENV || 'development'}' mode on port ${PORT}`);
});