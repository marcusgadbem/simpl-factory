import faker from 'faker';
import SimplFactory from '../../src';

SimplFactory.define('NoTraitsFactory', () => ({
  schema: {
    id: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    date: new Date(),
    status: 'in_progress',
  }
}));
