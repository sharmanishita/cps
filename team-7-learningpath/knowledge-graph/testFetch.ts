import { connect, Mongoose } from 'mongoose';
import find from './models/Concept.js';

connect('mongodb://localhost:27017/ai_learning');

find.find().then(data => {
  console.log("Data from MongoDB:", data);
  // If you want to close the connection, use mongoose.connection.close()
  // import mongoose at the top if not already imported
  // mongoose.connection.close();
});
