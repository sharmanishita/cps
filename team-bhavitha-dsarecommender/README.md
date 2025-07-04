# Personalized Learning Path Recommendation Using Knowledge Graphs

## Project Overview

This project aims to develop a personalized learning system that recommends the next best concept for a student to learn, based on their prior knowledge, performance, and the logical structure of concepts in a domain like Data Structures and Algorithms (DSA).

We propose using a **knowledge graph**, where each node represents a concept and edges define prerequisite relationships. The system continuously tracks each learner’s mastery level using metrics such as quiz scores, engagement data, and attempt history. Based on this, it dynamically recommends the most suitable next concept, ensuring that all prerequisites are met before advancing.

The solution will be built as a full-stack **MERN application** (MongoDB, Express, React, Node.js) with real-time recommendation logic and a user-friendly interface. A synthetic learner simulator will also be developed to test the accuracy and adaptability of the recommendation engine.

The final product will be a deployable, personalized education platform that adapts to individual learning needs and promotes efficient knowledge acquisition.

---

### Goal

To develop a personalized learning system that dynamically recommends the next best concept for a student, ensuring all prerequisites are met, and promoting efficient knowledge acquisition.

## Features

* **Knowledge Graph Construction:** Manually building a domain-specific knowledge graph for Data Structures and Algorithms (DSA) with defined prerequisite relationships.
* **Learner Progress Tracking:** Real-time monitoring of individual learner progress and mastery using quiz scores, engagement data, and attempt history.
* **Recommendation Engine:** A system that suggests the next most suitable learning concept based on the learner's current knowledge state and the knowledge graph structure.
* **Full-Stack Web Application:** A MERN stack (MongoDB, Express, React, Node.js) application for interaction, assessment, and dynamic learning path visualization.
* **Synthetic Learner Simulator:** A module to simulate learner behaviors for testing and evaluating the recommendation system's accuracy and adaptability.

---

## Our Team

We're a collaborative team working together on this project:

| Name | Email | Role |
| :----------------------- | :---------------------------- | :---------------- |
| B Bhavitha | bhavitha9052004@gmail.com | T3 Team Lead |
| Anurag Kumar | anurag2003ias@gmail.com | T3 Contributor |
| Nishant | nishantthakurs7519@gmail.com | T3 Contributor |
| Tamalampudi Sameer Reddy | sameerreddy213@gmail.com | T3 Contributor |

Everyone's contributions are highly valued!

---

## Contribution Guidelines

We welcome contributions from all team members! Here's how you can get started:

1.  **Fork the repository** to your own GitHub account.
2.  **Clone** your fork to your local machine.
3.  **Create a new branch** for your work.
4.  Make your changes, ensuring they follow good coding practices.
5.  **Commit** your changes with a clear message.
6.  **Push** your branch to your fork.
7.  **Open a Pull Request (PR)** to the main repository.

Please make sure to:
* Check if an issue already exists before starting new features or fixes.
* Follow the folder structure (`client/`, `server/`, `scraper/`, `graph/`, `docs/`).
* Add meaningful commit messages.
* Be respectful of others’ work — collaboration is key!

Refer to [`CONTRIBUTING.md`](CONTRIBUTING.md) for more detailed guidelines.

Happy contributing!

## Acknowledgements

This project was developed as part of a research internship under the guidance of Prof Sudarshan Iyengar, Dept of CSE, IIT Ropar and Meenakshi V, DLED Labs, IIT Ropar.

Their support, insights, and encouragement throughout the development of EduAssess were invaluable.