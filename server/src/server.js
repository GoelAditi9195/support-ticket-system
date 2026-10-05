import express from 'express';
import cors from 'cors';
import { sequelize } from './db.js';
import './models/ticket.js';
import ticketRoutes from './routes/ticketRoutes.js';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/tickets', ticketRoutes);

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.path} not found` },
  });
});

// One error handler, so every error has the same shape
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: { code: 'INVALID_JSON', message: 'Request body is not valid JSON' },
    });
  }
  console.error(err);
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' },
  });
});

await sequelize.sync(); // creates the tickets table if it doesn't exist

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});