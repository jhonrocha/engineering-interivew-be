import { Status } from '@entity/Task';

export const createTask = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    status: { enum: Object.values(Status) },
  },
  required: ['title'],
  additionalProperties: false,
};
