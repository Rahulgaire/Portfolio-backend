import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './src/database/db.js';
import router from './src/routes/contact.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://portfolio-frontend-ej4p.onrender.com/'], // Support both local and production
  credentials: true
}));

// Health Check Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Main API routes
app.use('/api', router);

// Database connection & server start
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to start server: ${error.message}`);
  });
