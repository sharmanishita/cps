import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const Home: React.FC = () => {
  const { t } = useTranslation();

 
  const features = t('features', { returnObjects: true }) as { title: string; desc: string }[];
  const steps = t('steps', { returnObjects: true }) as { number: string; title: string; desc: string }[];
  const points = t('points', { returnObjects: true }) as string[];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
  };

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