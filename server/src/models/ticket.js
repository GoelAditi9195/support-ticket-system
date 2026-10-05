import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const PRIORITIES = ['Low', 'Medium', 'High'];
export const STATUSES = ['Open', 'In Progress', 'Resolved'];

export const Ticket = sequelize.define(
  'Ticket',
  {
    title: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    customerEmail: { type: DataTypes.STRING, allowNull: false },
    priority: {
      type: DataTypes.ENUM(...PRIORITIES),
      allowNull: false,
      defaultValue: 'Medium',
    },
    status: {
      type: DataTypes.ENUM(...STATUSES),
      allowNull: false,
      defaultValue: 'Open',
    },
  },
  {
    tableName: 'tickets',
    timestamps: true,
    indexes: [
      { fields: ['status'] },
      { fields: ['priority'] },
      { fields: ['createdAt'] },
    ],
  }
);