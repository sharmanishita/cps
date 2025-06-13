import generateQuiz from '../services/generateQuiz.js';

export async function generate(req, res) {
  try {
    const { topic, prerequisites } = req.body;
    const quiz = await generateQuiz(topic, prerequisites);
    res.json({ quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Quiz generation failed' });
  }
}
