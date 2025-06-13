#  Dependency-Aware Assessment Generator

A full-stack system that helps learners by understanding the **prerequisites** of a concept and generating a **custom quiz** based on their current knowledge level. Upload a **YouTube link**, **PDF**, or **image**, and the system intelligently derives the main topic, finds all prerequisite concepts, and generates quiz questions using those.

---

##  Features

-  Upload input as YouTube Link / PDF / Image  
-  Extract main topic automatically from content  
-  Traverse a concept dependency graph (stored in MongoDB) to find prerequisites  
-  Display topic and prerequisites in frontend  
-  Generate quiz using prerequisite concepts and main topic  
-  Suggest topics  

---

##  Tech Stack

| Layer      | Technology               |
|------------|---------------------------|
| Frontend   | React                     |
| Backend    | Node.js, Express          |
| Database   | MongoDB (Mongoose)        |


---


##  Installation & Setup

###  Backend

1. Navigate to backend:
   ```bash
   cd backend
Install dependencies:


npm install
Create .env and add:


MONGO_URI=mongodb://localhost:27017/concept-graph
Start the server:


node server.js
 Frontend
Navigate to frontend:


cd frontend
Install dependencies:


npm install
Run React app:


npm start