import mongoose, { Document, Schema } from 'mongoose';

export interface IResponse extends Document {
  userId: mongoose.Types.ObjectId;
  quizId: mongoose.Types.ObjectId;
  answers: number[]; // indexes of chosen answers
  score: number;
}

const ResponseSchema: Schema<IResponse> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: { type: [Number], required: true },
  score: { type: Number, required: true },
});

export default mongoose.model<IResponse>('Response', ResponseSchema);
