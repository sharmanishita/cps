export default async function generateQuiz(topic, prerequisites) {
  // Use Gemini, OpenAI, or static template
  return [
    { question: `What is ${topic}?`, options: ['A', 'B', 'C', 'D'], answer: 'A' },
    // etc.
  ];
};
