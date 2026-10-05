import { sequelize } from './db.js';
import './models/ticket.js';
import app from './app.js';

const PORT = process.env.PORT || 4000;

await sequelize.sync();

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});