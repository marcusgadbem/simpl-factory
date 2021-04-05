import {
  buildTraits,
  processArgs,
  renderFactory,
} from '../src/core';

import faker from 'faker';

describe('Core', () => {
  describe('buildTraits', () => {
    const traits = {
      deleted: { deletedAt: new Date() },
      signed: { signed: true, signedAt: new Date(), },
    };

    test('return single trait', () => {
      expect(
        buildTraits(traits, ['signed'])
      ).toEqual([traits.signed]);
    });

    test('return more than one trait', () => {
      expect(
        buildTraits(traits, ['signed', 'deleted'])
      ).toEqual([traits.signed, traits.deleted]);
    });
  });

  describe('processArgs', () => {
    describe('with single arguments', () => {
      test('parse trait and return array with trait', () => {
        const { traits } = processArgs(['singleTrait']);

        expect(traits).toEqual(['singleTrait']);
      });

      test('parse contextual data and return the object', () => {
        const { context } = processArgs([{ foo: 'bar' }]);

        expect(context).toEqual({ foo: 'bar' });
      });
    });

    describe('with multiple mixed arguments', () => {
      test('parse traits and return array of traits', () => {
        const { traits } = processArgs([
          'trait1',
          'trait2',
          'trait3',
          { foo: 'bar' }
        ]);

        expect(traits).toEqual(['trait1', 'trait2', 'trait3']);
      });

      test('parse contextual data and return the object', () => {
        const { context } = processArgs([
          'trait1',
          'trait2',
          { foo: 'bar' },
        ]);

        expect(context).toEqual({ foo: 'bar' });
      });

      test('parse function for contextual data and return a function', () => {
        const { context } = processArgs([
          'trait1',
          'trait2',
          () => ({ foo: 'bar' }),
        ]);

        expect(context).toBeInstanceOf(Function);
      });
    });
  });

  describe('renderFactory', () => {
    const registry = {
      'Foo': () => ({
        schema: {
          id: faker.datatype.uuid(),
          position: faker.datatype.number(),
          title: faker.lorem.sentence(),
          type: 'default',
        },

        traits: {
          checkbox: {
            type: 'checkbox'
          },
          deleted: {
            deletedAt: new Date()
          },
        }
      }),
    };

    test('renders Foo factory with traits and context', () => {
      expect(
        renderFactory(
          registry, 'Foo', ['checkbox'], { position: 1, extra: 'bar' }
        )
      ).toEqual({
        id: expect.any(String),
        position: 1,
        title: expect.any(String),
        type: 'checkbox',
        extra: 'bar',
      });
    });
  });
});
