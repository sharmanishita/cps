import React from "react";

const HomePage = ({ startQuiz }: { startQuiz: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 text-white p-6">
    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">🚀 DSA Quiz Challenge</h1>
    <p className="mb-8 text-lg sm:text-xl text-center max-w-2xl">
      Test your knowledge of core DSA topics like arrays, trees, graphs, and more! Designed for focused, honest attempts with live cheating detection.
    </p>
    <button
      onClick={startQuiz}
      className="px-6 py-3 text-lg bg-white text-indigo-600 rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
    >
      Start Quiz
    </button>
  </div>
);

export default HomePage;
