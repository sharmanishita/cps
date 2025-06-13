import express from 'express';
import Prerequisite from '../models/Prerequisite';

const router = express.Router();

// Dummy prerequisite generation function
function generatePrerequisites(topic: string): string[] {
  const map: Record<string, string[]> = {
    'Binary Trees': ['Trees', 'Recursion'],
    'Graphs': ['DFS', 'BFS'],
    'Dynamic Programming': ['Recursion', 'Memoization'],
  };
  return map[topic] || ['Basics of Programming'];
}

// GET /api/prerequisite/:topic
router.get('/:topic', async (req, res) => {
  const { topic } = req.params;

  try {
    let prereq = await Prerequisite.findOne({ topic });

    if (!prereq) {
      const prerequisites = generatePrerequisites(topic);
      prereq = new Prerequisite({ topic, prerequisites });
      await prereq.save();
    }

    res.json({ prerequisites: prereq.prerequisites });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
