import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app.js';
import { sequelize } from '../src/db.js';

//empty fresh table
before(async () => {
  await sequelize.sync({ force: true });
});

describe('Tickets API', () => {
  it('creates a ticket with status Open by default', async () => {
    const res = await request(app).post('/api/tickets').send({
      title: 'Login broken',
      description: 'Cannot log in',
      customerEmail: 'a@b.com',
      priority: 'High',
    });

    expect(res.status).to.equal(201);
    expect(res.body.title).to.equal('Login broken');
    expect(res.body.status).to.equal('Open');
  });

  it('rejects a ticket with a missing title and a bad email', async () => {
    const res = await request(app).post('/api/tickets').send({
      title: '',
      description: 'Something',
      customerEmail: 'not-an-email',
    });

    expect(res.status).to.equal(400);
    expect(res.body.error.code).to.equal('VALIDATION_ERROR');
    expect(res.body.error.details).to.have.property('title');
    expect(res.body.error.details).to.have.property('customerEmail');
  });

  it('updates the status of a ticket and keeps it', async () => {
    const created = await request(app).post('/api/tickets').send({
      title: 'Refund not received',
      description: 'Still waiting',
      customerEmail: 'c@d.com',
    });
    const id = created.body.id;

    const patched = await request(app)
      .patch(`/api/tickets/${id}`)
      .send({ status: 'Resolved' });
    expect(patched.status).to.equal(200);
    
    const fetched = await request(app).get(`/api/tickets/${id}`);
    expect(fetched.body.status).to.equal('Resolved');
  });
});