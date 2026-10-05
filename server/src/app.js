import express from 'express';
import cors from 'cors';
import ticketRoutes from './routes/ticketRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/tickets', ticketRoutes);


app.use((req, res) => {
  res.status(404).json({
    error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.path} not found` },
  });
});


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

export default app;