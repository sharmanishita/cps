+----------------+      +---------------------+      +----------------+      +----------------+
|   User's       |      |  Node.js Backend    |      |  Flask API     |      |   MongoDB      |
|   Browser      |      | (The Manager)       |      | (The AI Brain) |      |   Database     |
+----------------+      +---------------------+      +----------------+      +----------------+
       |                        |                              |                      |
       | 1. Request: GET /api/recommendations (with auth cookie)   |                      |
       |----------------------->|                              |                      |
       |                        | 2. Middleware: Authenticate user via cookie          |
       |                        |----------------------------->| 3. Get User Data     |
       |                        |                              |--------------------->|
       |                        | 4. Data Gathering:           |<---------------------| (Returns user profile
       |                        |    - Get entire concept map  |                      |  w/ learning history)
       |                        |----------------------------->|                      |
       |                        |                              |--------------------->|
       |                        | 5. Prepare Payload:          |<---------------------| (Returns all concepts)
       |                        |    (Combine user data + all concepts into one JSON)  |
       |                        |                              |                      |
       |                        | 6. API Call: POST /recommend (sends JSON payload)   |
       |                        |---------------------------------------------------->|
       |                        |                              | 7. AI Processing:    |
       |                        |                              |    - Builds graph    |
       |                        |                              |    - Runs algorithm  |
       |                        |                              |                      |
       |                        | 8. API Response: Return simple path [JSON]          |
       |                        |<----------------------------------------------------|
       |                        |                              |                      |
       | 9. Final Response: Send 200 OK with recommended path |                      |
       |<-----------------------|                              |                      |
       |                        |                              |                      |
       | 10. Render UI: Display the learning path to the user |                      |
       |                        |                              |                      |
