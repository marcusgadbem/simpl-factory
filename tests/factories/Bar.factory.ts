import faker from 'faker';
import * as SimplFactory from '../../src';

SimplFactory.define('Bar', () => ({
  schema: {
    id: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    date: new Date(),
    status: 'in_progress',
  }
}));
