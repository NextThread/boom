const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors());
app.use(express.json());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

// Test endpoint
app.get('/test', (req, res) => {
  res.send('Server is running');
});

// Endpoint to find or generate email
app.post('/find-email', async (req, res) => {
  const { companyName, personName } = req.body;
  console.log('Received request to find/generate email for:', companyName, personName);
  try {
    const result = await pool.query(
      'SELECT email FROM emails WHERE company_name = $1 AND person_name = $2',
      [companyName, personName]
    );
    if (result.rows.length > 0) {
      console.log('Email found:', result.rows[0]);
      res.json(result.rows[0]);
    } else {
      const email = `${personName.split(' ').join('.')}@${companyName}.com`;
      await pool.query(
        'INSERT INTO emails (company_name, person_name, email) VALUES ($1, $2, $3)',
        [companyName, personName, email]
      );
      console.log('Email generated and saved:', email);
      res.json({ email });
    }
  } catch (err) {
    console.error('Error finding/generating email:', err);
    res.status(500).send('Server error');
  }
});

// Endpoint to get all emails for a company
app.post('/get-emails-by-company', async (req, res) => {
  const { companyName } = req.body;
  console.log('Received request to get emails for company:', companyName);
  try {
    const result = await pool.query(
      'SELECT person_name, email FROM emails WHERE company_name = $1',
      [companyName]
    );
    console.log('Emails found:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting emails:', err);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // Check database connection
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Database connected:', res.rows);
    }
  });
});
