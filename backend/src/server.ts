import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './db';
import snippetsRoutes from './routes/snippetsRoutes'
import { errorHandler } from './middleware/errorHandler';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Use the snippets API routes
app.use('/api/snippets', snippetsRoutes);

// Error handling middleware (must be after all routes)
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to SnipHub API');
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM snippets LIMIT 1');
    res.json(result.rows);  // Returns the rows from "snippets" table
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
