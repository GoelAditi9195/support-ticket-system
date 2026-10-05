import { sequelize } from './db.js';
import { Ticket } from './models/ticket.js';
import { buildSeedTickets } from './seedData.js';

const tickets = buildSeedTickets();

await sequelize.sync({ force: true });
await Ticket.bulkCreate(tickets);

console.log(`Seeded ${tickets.length} tickets`);
await sequelize.close();