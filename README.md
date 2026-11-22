# Placement Skill Monitoring Management System

A full-stack assignment project built with React, React Router, Axios, Node.js, Express, MongoDB and Mongoose.

## Features
- Home, Add Student Skills, and Student Skill List pages
- Create, read, update and delete student skill records
- Technical skills, aptitude score, communication skills and placement readiness
- Axios-based React-to-Express communication
- MongoDB persistence using the `placementDB` database

## Requirements
- Node.js 18+
- MongoDB running locally, or a MongoDB Atlas connection string

## Setup

1. Open this folder in a terminal.
2. Install root dependencies:
   ```bash
   npm install
   ```
3. Install frontend and backend dependencies:
   ```bash
   npm --prefix server install
   npm --prefix client install
   ```
4. Create `server/.env` using `server/.env.example`. Set `MONGO_URI` to your MongoDB connection string.
5. Start both applications:
   ```bash
   npm run dev
   ```
6. Open the frontend at http://localhost:5173. The API runs at http://localhost:5000.

## MongoDB
For a local MongoDB installation, the example URI is:
`mongodb://127.0.0.1:27017/placementDB`

The database and collection are created by MongoDB/Mongoose when the first record is saved.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/students` | Get all student records |
| GET | `/api/students/:id` | Get one student record |
| POST | `/api/students` | Add a student record |
| PUT | `/api/students/:id` | Update a student record |
| DELETE | `/api/students/:id` | Delete a student record |

## Student fields
- `name` – student name
- `registerNumber` – register number
- `department` – department
- `technicalSkills` – comma-separated skills
- `aptitudeScore` – score from 0 to 100
- `communicationSkills` – Beginner, Intermediate or Advanced
- `placementReadiness` – Ready, In Progress or Not Ready

## Notes
This is an academic starter implementation. Add your own student details and capture screenshots of the running application for your assignment write-up. Do not commit `.env` or database credentials to GitHub.
