import faker from 'faker';
import SimplFactory from '../../src';

SimplFactory.define('BarFactory', () => ({
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
