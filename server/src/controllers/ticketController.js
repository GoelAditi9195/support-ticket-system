import { Ticket } from '../models/ticket.js';
import {
  validateCreateTicket,
  validateUpdateTicket,
} from '../validation/ticketValidation.js';
import { sequelize } from '../db.js';

export async function createTicket(req, res, next) {
  try {
    const { errors, isValid, data } = validateCreateTicket(req.body);

    if (!isValid) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid ticket data',
          details: errors,
        },
      });
    }

    const ticket = await Ticket.create(data);
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
}
export async function getTickets(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = 10;
    const sort = req.query.sort === 'oldest' ? 'ASC' : 'DESC';

    const { count, rows } = await Ticket.findAndCountAll({
      order: [['createdAt', sort]],
      limit,
      offset: (page - 1) * limit,
    });

    res.json({
      tickets: rows,
      page,
      totalPages: Math.ceil(count / limit),
      totalCount: count,
    });
  } catch (err) {
    next(err);
  }
}

export async function getSummary(req, res, next) {
  try {
    const rows = await Ticket.findAll({
      attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['status'],
      raw: true,
    });

    const summary = { total: 0, Open: 0, 'In Progress': 0, Resolved: 0 };
    for (const row of rows) {
      const count = Number(row.count);
      summary[row.status] = count;
      summary.total += count;
    }

    res.json(summary);
  } catch (err) {
    next(err);
  }
}
export async function getTicketById(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        error: { code: 'INVALID_ID', message: 'Ticket id must be a positive whole number' },
      });
    }

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: `Ticket ${id} not found` },
      });
    }

    res.json(ticket);
  } catch (err) {
    next(err);
  }
}
export async function updateTicket(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        error: { code: 'INVALID_ID', message: 'Ticket id must be a positive whole number' },
      });
    }

    const { errors, isValid, data } = validateUpdateTicket(req.body);

    if (!isValid) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid update data',
          details: errors,
        },
      });
    }

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: `Ticket ${id} not found` },
      });
    }

    await ticket.update(data);
    res.json(ticket);
  } catch (err) {
    next(err);
  }
}