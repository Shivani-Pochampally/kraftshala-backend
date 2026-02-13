Calendar Booking Backend Service

This project is a backend service that allows users to schedule meetings while preventing overlapping time slots.
It is built as part of the Kraftshala Backend Developer Intern assignment.

Tech Stack

Node.js

Express.js

Sequelize ORM

SQL Database (MySQL / SQLite)

JavaScript

Project Structure
src/
  modules/
    user/
      routes/
      service/
      model/
      dto/
      interface/
    meeting/
      routes/
      service/
      model/
      dto/
      interface/
  middlewares/
  config/
  utils/
  app.js
  server.js


The project follows a modular architecture with separation of concerns:

Routes handle HTTP requests

Services contain business logic

Models define database schema

DTOs handle validation

Features
User Management

Create User

Get User by ID

Meeting Management

Create Meeting

List Meetings (with optional filters)

Get Meeting by ID

Update Meeting

Delete Meeting

Business Rules

No overlapping meetings are allowed

Conflict condition:

existing.startTime < new.endTime
AND
existing.endTime > new.startTime


If a conflict exists, API returns:

400 Bad Request
Time slot already booked

Validation Rules

startTime must be before endTime

Required fields are validated

Meaningful error messages

Proper HTTP status codes are returned

Database Design

User table

Meeting table

One-to-many relationship (User → Meetings)

Foreign key constraints implemented using Sequelize

Tables created using Sequelize models

API Endpoints
User APIs
Method	Endpoint	Description
POST	/users	Create a new user
GET	/users/:id	Get user by ID
Meeting APIs
Method	Endpoint	Description
POST	/meetings	Create a meeting
GET	/meetings	List meetings (filters: user, date range)
GET	/meetings/:id	Get meeting by ID
PUT	/meetings/:id	Update meeting
DELETE	/meetings/:id	Delete meeting
Setup Instructions
1. Clone the repository
git clone <your-repo-url>
cd backend

2. Install dependencies
npm install

3. Configure Environment Variables

Create a .env file in the root directory:

PORT=3000
DB_NAME=calendar_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_DIALECT=mysql


(You can also use SQLite by changing DB_DIALECT)

4. Run the server
npm run dev


Server will start on:

http://localhost:3000