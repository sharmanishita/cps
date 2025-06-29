import { Request, Response } from 'express';
import axios from 'axios';
import User from '../models/userModel';
import Concept from '../models/conceptModel';

/**
 * @desc    Generates a personalized learning path by calling the Flask AI service.
 * @route   POST /api/recommendations/generate
 * @access  Private
 */
export const generateRecommendation = async (req: Request, res: Response) => {
    try {
        const { targetConceptId } = req.body;
        if (!targetConceptId) {
            return res.status(400).json({ message: 'A target concept ID is required.' });
        }

        // --- Step 1: Gather data from MongoDB ---
        const user = await User.findById(req.user?.id).select('learningProfile');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const allConcepts = await Concept.find({}).select('_id prerequisites');
        if (!allConcepts || allConcepts.length === 0) {
            return res.status(404).json({ message: 'No learning concepts found.' });
        }

        // --- Step 2: Prepare payload for Flask API ---
        const payload = {
            userId: user._id,
            learningProfile: user.learningProfile,
            targetConceptId: targetConceptId,
            knowledgeGraph: allConcepts,
        };

        // --- Step 3: Call Flask API (using a placeholder for now) ---
        const flaskApiUrl = process.env.FLASK_API_URL || 'http://localhost:5001/recommend';
        
        // Uncomment the following lines to make a real API call
        // const { data } = await axios.post(flaskApiUrl, payload);
        // return res.status(200).json(data);
        
        // Mock response for testing without a live Flask server
        res.status(200).json({
            message: 'This is a mock response. The recommendation engine would be called here.',
            recommendedPath: [
                { conceptId: 'mock_id_1', title: 'Example Prerequisite' },
                { conceptId: targetConceptId, title: 'Your Target Concept' },
            ],
            sentPayload: payload, // Echo back the payload for debugging
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Flask API Error:', error.message);
            return res.status(502).json({ message: 'Recommendation service is unavailable.' });
        }
        console.error('Server Error:', error);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
};