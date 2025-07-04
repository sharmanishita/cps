// import mongoose from "mongoose";

// const conceptSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   spotlight_fact: String,
//   lecture: String,
// });

// export default mongoose.model("Concept", conceptSchema);
// import mongoose from "mongoose";

// const conceptSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   spotlight_fact: String,
//   lecture: String,
//   examples: [String],
//   related_topics: [String],
//   quiz_available: Boolean,
// });

// export default mongoose.model("Concept", conceptSchema);

import mongoose from "mongoose";

const conceptSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  spotlight_fact: String,
  lecture: String,
  examples: [String],
  related_topics: [String],
  quiz_available: Boolean,

  // Structured Notes Fields
  structuredNotes: {
    overview: String,
    keyConcepts: [
      {
        name: String,
        explanation: String,
      },
    ],
    frequentlyUsed: [String],
    commonPitfalls: [String],
    bestPractices: [String],
    latestReferences: [String],
  },
});

export default mongoose.model("Concept", conceptSchema);

