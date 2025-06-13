// prerequisiteRoute.ts
import express, { Request, Response } from 'express';
import Prerequisite from '../models/Prerequisite';
import { Configuration, OpenAIApi } from 'openai';

const router = express.Router();

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store this securely
});
const openai = new OpenAIApi(configuration);

// Generates prerequisite topics using OpenAI
async function generatePrerequisites(topic: string): Promise<string[]> {
  try {
    const prompt = `List 3 prerequisite computer science topics someone should know before learning about "${topic}". Return them as a comma-separated list.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for a programming education platform.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 50,
      temperature: 0.7,
    });

    const content = response.data.choices[0].message?.content || '';
    const prerequisites = content.split(',').map((item) => item.trim());

    return prerequisites.length > 0 ? prerequisites : ['Basics of Programming'];
  } catch (error) {
    console.error('OpenAI API error:', error);
    return ['Basics of Programming']; // Fallback if API fails
  }
}

// GET /api/prerequisite/:topic
router.get('/:topic', async (req: Request, res: Response) => {
  const { topic } = req.params;

  try {
    let prereq = await Prerequisite.findOne({ topic });

    if (!prereq) {
      const prerequisites = await generatePrerequisites(topic);
      prereq = new Prerequisite({ topic, prerequisites });
      await prereq.save();
    }

    res.status(200).json({ topic: prereq.topic, prerequisites: prereq.prerequisites });
  } catch (error) {
    console.error('Error fetching prerequisites:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
