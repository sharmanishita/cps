import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Concept, { IConcept } from './models/Concept';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/learning-path';

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const dataPath = path.join(__dirname, '../data/dsa_concepts.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const jsonData: IConcept[] = JSON.parse(rawData);

    await Concept.deleteMany();
    await Concept.insertMany(jsonData);

    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();
