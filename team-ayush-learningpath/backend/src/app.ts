import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import { errorHandler } from './middlewares/errorMiddleware'; // Correct import path

// --- Route Imports ---
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import conceptRoutes from './routes/conceptRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import adminRoutes from './routes/adminRoutes';
import quizRoutes from './routes/quizRoutes';

dotenv.config();

const app: Express = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/concepts', conceptRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/admin', adminRoutes);

// --- Centralized Error Handler ---
// This must be the last middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in '${process.env.NODE_ENV || 'development'}' mode on port ${PORT}`);
});