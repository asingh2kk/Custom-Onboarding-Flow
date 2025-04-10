const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    console.log("Fetching config from DB...");
    const result = await pool.query('SELECT * FROM config LIMIT 1');
    console.log("Query result:", result.rows);
    if (result.rows.length === 0) {
      console.log("No config found. Inserting default config...");
      const defaultConfig = {
        page2: JSON.stringify(["AboutMe"]),
        page3: JSON.stringify(["AddressForm", "BirthdatePicker"])
      };
      const insertResult = await pool.query(
        'INSERT INTO config (page2, page3) VALUES ($1, $2) RETURNING *',
        [defaultConfig.page2, defaultConfig.page3]
      );
      console.log("Default config inserted:", insertResult.rows[0]);
      return res.json(insertResult.rows[0]);
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error("Error in GET /api/config:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;