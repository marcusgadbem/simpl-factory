import faker from 'faker';
import { registerFactory } from '../../src';

registerFactory('BarFactory', () => ({
  schema: {
    id: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    date: new Date(),
    status: 'in_progress',
  },

  traits: {
    done: {
      status: 'done'
    },
  }
}));
