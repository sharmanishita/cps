// src/controllers/conceptController.ts
import { Request, Response } from 'express';
import Concept from '../models/conceptModel';

/**
 * @desc    Fetch all available learning concepts (course catalog).
 * @route   GET /api/concepts
 * @access  Private
 */
export const getAllConcepts = async (req: Request, res: Response) => {
    try {
        // Only select fields needed for a catalog view to keep the payload small.
        const concepts = await Concept.find({}).select('title description');
        res.status(200).json(concepts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @desc    Fetch a single, detailed concept by its ID.
 * @route   GET /api/concepts/:id
 * @access  Private
 */
export const getConceptById = async (req: Request, res: Response) => {
    try {
        // Populate prerequisites to show their titles, creating the visible graph.
        const concept = await Concept.findById(req.params.id)
            .populate('prerequisites', 'title');
            
        if (concept) {
            res.status(200).json(concept);
        } else {
            res.status(404).json({ message: 'Concept not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
