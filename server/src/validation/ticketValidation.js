import Joi from 'joi';
import { PRIORITIES, STATUSES } from '../models/ticket.js';

const createTicketSchema = Joi.object({
  title: Joi.string().trim().max(120).required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
    'string.max': 'Title must be 120 characters or less',
    'string.base': 'Title must be text',
  }),
  description: Joi.string().trim().required().messages({
    'string.empty': 'Description is required',
    'any.required': 'Description is required',
    'string.base': 'Description must be text',
  }),
  customerEmail: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Customer email is required',
      'any.required': 'Customer email is required',
      'string.email': 'Customer email is not a valid email address',
      'string.base': 'Customer email must be text',
    }),
  priority: Joi.string()
    .valid(...PRIORITIES)
    .messages({
      'any.only': `Priority must be one of: ${PRIORITIES.join(', ')}`,
    }),
});
const updateTicketSchema = Joi.object({
  status: Joi.string()
    .valid(...STATUSES)
    .messages({
      'any.only': `Status must be one of: ${STATUSES.join(', ')}`,
      'string.base': 'Status must be text',
    }),
  priority: Joi.string()
    .valid(...PRIORITIES)
    .messages({
      'any.only': `Priority must be one of: ${PRIORITIES.join(', ')}`,
      'string.base': 'Priority must be text',
    }),
})
  .or('status', 'priority')
  .messages({
    'object.missing': 'Provide a status or a priority to update',
  });
export function validateCreateTicket(body = {}) {
  const { error, value } = createTicketSchema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const errors = {};
  if (error) {
    for (const detail of error.details) {
      const field = detail.path[0];
      if (!errors[field]) errors[field] = detail.message;
    }
  }

  return { errors, isValid: !error, data: value };
}
export function validateUpdateTicket(body = {}) {
  const { error, value } = updateTicketSchema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const errors = {};
  if (error) {
    for (const detail of error.details) {
      const field = detail.path[0] || 'body';
      if (!errors[field]) errors[field] = detail.message;
    }
  }

  return { errors, isValid: !error, data: value };
}