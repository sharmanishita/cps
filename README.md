# AI-Based Personalized Learning Path Recommendation System

An efficient AI-driven platform designed to recommend personalized learning paths using a custom-built knowledge graph. The system dynamically adapts to a learner's current knowledge level and target goals to ensure optimal progression through educational content.

## 📌 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## 🧠 Project Overview

This project aims to solve the problem of one-size-fits-all learning by enabling **adaptive learning paths** based on:
- A learner's current concept mastery.
- A target concept or skill.
- Performance on quizzes and concept-based assessments.

The system utilizes a **custom knowledge graph of DSA concepts**, **user analytics**, and **mastery-based metrics** to recommend the most effective learning path from the current state to the desired goal.

---

## 🚀 Features

- 🔐 **User Authentication & Role Management**  
- 🧩 **Dynamic Learning Path Generator** based on mastery and quiz performance  
- 📊 **Concept Mastery Tracking** per user  
- 📚 **Knowledge Graph-based Curriculum Mapping**  
- 📈 **Real-time Quiz Evaluation** with adaptive difficulty  
- 🎯 **Goal-Oriented Path Recommendation Engine**  
- 🧠 **Model-Driven Recommendations** trained on EdNet KT1 and custom datasets  

---

## 🛠️ Tech Stack

### Frontend
- React.js + TailwindCSS
- Axios for API communication

### Backend
- Node.js + Express
- RESTful APIs

### Database
- MongoDB (Mongoose ODM)

### AI / ML
- Python (pandas, scikit-learn)
- Jupyter Notebooks for experimentation
- Preprocessed EdNet KT1 dataset

### Other Tools
- GitHub Projects for task tracking
- Postman for API testing
- VS Code for development

---

## 📐 System Architecture

```plaintext
User ↔️ Frontend (React)
       ↕️
   Backend API (Node.js)
       ↕️
MongoDB ←→ Python ML Module (via REST API)
       ↕️
Knowledge Graph (DSA Concepts)
