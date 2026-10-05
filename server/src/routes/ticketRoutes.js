import { Router } from 'express';
import {
  createTicket,
  getTickets,
  getSummary,
  getTicketById,
  updateTicket,
} from '../controllers/ticketController.js';

const router = Router();

router.get('/summary', getSummary);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.post('/', createTicket);
router.patch('/:id', updateTicket);

export default router;