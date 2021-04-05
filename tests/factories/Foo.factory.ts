import faker from 'faker';
import { registerFactory, createFactory } from '../../src';

import './Bar.factory';

registerFactory('FooFactory', () => ({
  schema: {
    id: faker.datatype.uuid(),
    position: faker.datatype.number(),
    title: faker.lorem.sentence(),
    state: 'started',
  },

  traits: {
    completed: {
      state: 'completed'
    },

    deleted: {
      deletedAt: new Date()
    },

    withBar: {
      bar: createFactory('BarFactory')
    }
  }
}));
