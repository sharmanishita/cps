import mongoose, { Schema, Document } from 'mongoose';

interface IResource {
  type: string;
  title: string;
  url: string;
}

export interface IConcept extends Document {
  concept_id: string;
  title: string;
  description?: string;
  prerequisites?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  examples?: string[];
  resources?: IResource[];
}

const ResourceSchema: Schema = new Schema<IResource>(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true }
  },
  { _id: false }
);

const ConceptSchema: Schema = new Schema<IConcept>({
  concept_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: String,
  prerequisites: [String],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  tags: [String],
  examples: [String],
  resources: [ResourceSchema]
});

const Concept = mongoose.model<IConcept>('Concept', ConceptSchema);

export default Concept;
