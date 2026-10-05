import { faker } from '@faker-js/faker';
import { sequelize } from './db.js';
import { Ticket } from './models/ticket.js';

// [title, status, priority]
const samples = [
  ['Cannot log in to dashboard', 'Open', 'High'],
  ['Password reset email not arriving', 'Open', 'High'],
  ['Invoice shows wrong amount', 'In Progress', 'High'],
  ['App crashes on checkout', 'Open', 'High'],
  ['Request to update billing address', 'Resolved', 'Low'],
  ['Export to CSV is empty', 'In Progress', 'Medium'],
  ['Dark mode request', 'Open', 'Low'],
  ['Two-factor code not working', 'In Progress', 'High'],
  ['Slow loading on reports page', 'Open', 'Medium'],
  ['Unable to delete old projects', 'Resolved', 'Medium'],
  ['Wrong currency on receipt', 'Resolved', 'Medium'],
  ['Mobile app shows blank screen', 'Open', 'High'],
  ['Need help adding team members', 'Resolved', 'Low'],
  ['Notification emails sent twice', 'In Progress', 'Medium'],
  ['Cannot upload files over 5 MB', 'Open', 'Medium'],
  ['Refund not received', 'In Progress', 'High'],
  ['Change account email address', 'Resolved', 'Low'],
  ['Search returns no results', 'Open', 'Medium'],
  ['Typo on pricing page', 'Resolved', 'Low'],
  ['API key stopped working', 'Open', 'High'],
  ['Calendar sync is off by one hour', 'In Progress', 'Medium'],
  ['Request for annual billing option', 'Open', 'Low'],
  ['Cannot download invoice PDF', 'Resolved', 'Medium'],
  ['Account locked after failed logins', 'Resolved', 'High'],
  ['Dashboard graphs not updating', 'In Progress', 'Medium'],
  ['How do I cancel my subscription?', 'Open', 'Low'],
  ['Webhook events arriving late', 'Open', 'High'],
  ['Profile photo will not save', 'In Progress', 'Low'],
];

const tickets = samples.map(([title, status, priority]) => {
  const createdAt = faker.date.recent({ days: 30 });
  return {
    title,
    description: faker.lorem.sentences(2),
    customerEmail: faker.internet.email().toLowerCase(),
    status,
    priority,
    createdAt,
    updatedAt: createdAt,
  };
});

await sequelize.sync({ force: true }); // clears the table first
await Ticket.bulkCreate(tickets);

console.log(`Seeded ${tickets.length} tickets`);
await sequelize.close();