import { Router, Request, Response } from 'express';
import Prereq from '../models/Prereq';
import { generatePrerequisites } from '../services/prereqGenerator';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { topic } = req.body;
  try {
    const prereqs = await generatePrerequisites(topic);
    const newEntry = new Prereq({ topic, prerequisites: prereqs });
    await newEntry.save();
    res.json({ topic, prerequisites: prereqs });
  } catch (err) {
    res.status(500).json({ error: 'Error generating prerequisites' });
  }
});

export default router;