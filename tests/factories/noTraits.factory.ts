import faker from 'faker';
import { registerFactory } from '../../src';

registerFactory('NoTraitsFactory', () => ({
  schema: {
    id: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    date: new Date(),
    status: 'in_progress',
  }
}));
