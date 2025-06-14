import express, { json } from 'express';
const app = express();
import apiRoutes from './routes/api.js';
import cors from 'cors';

app.use(cors());
app.use(json());
app.use('/api', apiRoutes);

app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));