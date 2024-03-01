// backend/server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 5000;

// PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'zithara',
  password: 'admin',
  port: 5433,
});
  
app.use(cors());

// Route to fetch customers with pagination
app.get('/api/customers', async (req, res) => {
  const page = req.query.page || 1;
  const offset = (page - 1) * 20;
  try {
    
    const result = await pool.query(
      `SELECT * FROM customers ORDER BY created_at DESC  OFFSET $1`,
      [offset]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
