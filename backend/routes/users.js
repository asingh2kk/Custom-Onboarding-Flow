const express = require('express');
const router = express.Router();
const pool = require('../db');

//create/update user
router.post('/', async (req, res) => {
  try {
    const { email, password, aboutMe, street, city, state, zip, birthdate, currentStep } = req.body;
    const result = await pool.query(
      `INSERT INTO users (email, password, about_me, street, city, state, zip, birthdate, current_step)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (email)
       DO UPDATE SET password = EXCLUDED.password, about_me = EXCLUDED.about_me,
                     street = EXCLUDED.street, city = EXCLUDED.city, state = EXCLUDED.state,
                     zip = EXCLUDED.zip, birthdate = EXCLUDED.birthdate, current_step = EXCLUDED.current_step
       RETURNING *`,
      [email, password, aboutMe, street, city, state, zip, birthdate, currentStep || 1]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//clearing user data table
router.delete('/', async (req, res) => {
  try {
    await pool.query('DELETE FROM users');
    res.json({ message: 'All user data cleared.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;