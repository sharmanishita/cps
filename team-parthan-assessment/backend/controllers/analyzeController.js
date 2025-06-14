import getMainTopic from '../services/getMainTopic.js';
import getAllPrerequisites from '../services/getPrerequisite.js';

const analyzeController = async (req, res) => {
  try {
    const { typeofinput } = req.body;
    let inputData = '';

    if (typeofinput === 'link') {
      inputData = req.body.input;
    } else if (typeofinput === 'pdf' || typeofinput === 'image') {
      if (!req.file) {
        return res.status(400).json({ error: 'File not uploaded' });
      }
      inputData = req.file.path;
    } else {
      return res.status(400).json({ error: 'Invalid input type' });
    }

    const mainTopic = await getMainTopic(inputData, typeofinput);
    const prerequisites = await getAllPrerequisites(mainTopic);

    return res.json({ mainTopic, prerequisites });
  } catch (error) {
    console.error('Error analyzing input:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default analyzeController;