import React from 'react';

const Home: React.FC = () => {
  const features = [
    {
      title: 'Multi-Language Support',
      desc: 'Learn DSA in C++, Java, Python, or JavaScript – choose your preferred programming language.',
    },
    {
      title: 'Personalized Assessment',
      desc: 'Get customized quizzes based on your existing knowledge and learning progress.',
    },
    {
      title: 'Adaptive Learning',
      desc: 'Questions adapt to your skill level, ensuring optimal learning curve.',
    },
    {
      title: 'Progress Tracking',
      desc: 'Visual timeline and detailed analytics to track your DSA mastery journey.',
    },
    {
      title: 'Performance Insights',
      desc: 'Get detailed feedback and predictions for your coding interview readiness.',
    },
    {
      title: 'Quick Reviews',
      desc: 'Review your answers and retake quizzes to reinforce learning.',
    },
  ];

  const steps = [
    { number: '1', title: 'Choose Language', desc: 'Select your preferred programming language' },
    { number: '2', title: 'Assessment', desc: 'Tell us what DSA concepts you already know' },
    { number: '3', title: 'Take Quizzes', desc: 'Complete personalized quizzes and assessments' },
    { number: '4', title: 'Track Progress', desc: 'Monitor your learning journey with detailed analytics' },
  ];

  const points = [
    'Comprehensive coverage of all major DSA topics',
    'Real-time performance analytics',
    'Interview preparation focus',
    'Language-specific code examples and explanations',
    'Concept mastery verification',
    'Progress visualization tools',
  ];

  return (
    <div>
      <div className="text-center py-5 bg-light">
        <h1 className="display-4 text-primary fw-bold">DSA Learning Hub</h1>
        <p className="lead mx-auto w-75">
          Master Data Structures & Algorithms with personalized quizzes, adaptive learning, and
          comprehensive progress tracking. Get interview-ready with confidence.
        </p>
        <br/>
        <div className="bg-primary text-white py-4 mt-4 rounded">
          <h4 className="text-white">Ready to Master DSA?</h4>
          <p>Join thousands of developers who've enhanced their coding skills with our platform</p>
          <button className="btn btn-light">Start Learning Now</button>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">Why Choose DSA Learning Hub?</h2>
        <div className="row">
          {features.map((f, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="border rounded p-4 h-100 shadow-sm">
                <h5 className="fw-bold">{f.title}</h5>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-light py-5">
        <h2 className="text-center fw-bold mb-4">How It Works</h2>
        <div className="container">
          <div className="row text-center">
            {steps.map((step, idx) => (
              <div className="col-md-3 mb-4" key={idx}>
                <div className="fs-2 fw-bold text-primary mb-2">{step.number}</div>
                <h5 className="fw-bold">{step.title}</h5>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">What You&apos;ll Get</h2>
        <div className="row">
          {points.map((point, idx) => (
            <div className="col-md-6 mb-3" key={idx}>
              <div className="d-flex align-items-start">
                <span className="text-success me-2 fs-4">✔</span>
                <p className="mb-0">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;