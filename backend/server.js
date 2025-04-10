const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');
const usersRouter = require('./routes/users');
const configRouter = require('./routes/config');

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  'http://localhost:3000',
  'https://custom-onboarding-flow-sigma.vercel.app',
  'https://custom-onboarding-flow-akashdeep-singhs-projects-9d5a43da.vercel.app',
  'https://custom-onboarding-git-8c1021-akashdeep-singhs-projects-9d5a43da.vercel.app'
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

//API routes
app.use('/api/users', usersRouter);
app.use('/api/config', configRouter);

//health check endpoint
app.get('/', (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    //creating users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        email VARCHAR(255) PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        about_me TEXT,
        street VARCHAR(255),
        city VARCHAR(255),
        state VARCHAR(255),
        zip VARCHAR(20),
        birthdate DATE,
        current_step INTEGER DEFAULT 1
      );
    `);
    //creating config table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS config (
        id SERIAL PRIMARY KEY,
        page2 JSON NOT NULL,
        page3 JSON NOT NULL
      );
    `);
    console.log("Database tables ensured.");
  } catch (err) {
    console.error("Error ensuring tables:", err);
  }
});