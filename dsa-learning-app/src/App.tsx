// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import LanguageSelection from "./components/LanguageSelection";// ✅ Correct casing
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/language-selection" element={<LanguageSelection />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
};

export default App;