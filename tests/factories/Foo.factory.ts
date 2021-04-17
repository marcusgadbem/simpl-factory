import faker from 'faker';
import SimplFactory from '../../src';

import './Bar.factory';

SimplFactory.define('FooFactory', () => ({
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
      bar: SimplFactory.create('BarFactory')
    }
  }
}));
