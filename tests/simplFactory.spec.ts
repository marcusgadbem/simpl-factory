import * as SimplFactory from '../src';

import './factories/Foo.factory';

describe('SimplFactory', () => {
  describe('#create', () => {
    describe('schema and traits', () => {
      it('renders a factory schema without traits', () => {
        expect(
          SimplFactory.create('Foo')
        ).toEqual({
          id: expect.any(String),
          position: expect.any(Number),
          title: expect.any(String),
          state: expect.any(String),
        });
      });

      it('renders a factory schema with single trait', () => {
        expect(
          SimplFactory.create('Foo', 'deleted')
        ).toHaveProperty('deletedAt', expect.any(Date));
      });

      it('renders a factory schema with multiple trait', () => {
        const foo = SimplFactory.create('Foo', 'deleted', 'completed');

        expect(foo).toHaveProperty('deletedAt', expect.any(Date));
        expect(foo).toHaveProperty('state', 'completed');
      });

      it('renders a factory schema with arrays merged correctly', () => {
        SimplFactory.define('FooArray', () => ({
          schema: {
            myArray: [{ foo: 1 }, { bar: 2 }]
          }
        }));

        expect(
          SimplFactory.create('FooArray', { myArray: [{ foo: 3 }, { name: 'john doe' }]})
        ).toEqual({
          myArray: [
            { foo: 1 },
            { bar: 2 },
            { foo: 3 },
            { name: 'john doe' },
          ]
        });
      });

      it('throws error when defining a factory without schema', () => {
        expect(() => {
          // @ts-expect-error: provided wrong setup to `define` for testing purposes.
          SimplFactory.define('Foo', () => ({
            traits: {
              created: { createdAt: new Date() },
            },
          }));
        }).toThrowError('A schema is required to define a factory.');
      });

      it('logs a warning when defining a factory with same name', () => {
        const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => { return; });

        const factoryname = 'FooBar';
        SimplFactory.define(factoryname, () => ({ schema: { foo: 'bar' } }));
        SimplFactory.define(factoryname, () => ({ schema: { foo: 'bar' } }));

        expect(spy).toBeCalledWith(`Factory "${factoryname}" was redefined.`);

        spy.mockRestore();
      });
    });

    describe('context', () => {
      it('adds new data to schema', () => {
        const extra = { bar: 'hey' };
        const foo = SimplFactory.create('Foo', { extra });

        expect(foo).toHaveProperty('extra', extra);
      });

      it('overwrites a schema property', () => {
        const title = 'property overwrite';

        expect(
          SimplFactory.create('Foo', { title })
        ).toHaveProperty('title', title);
      });
    });

    it('renders a factory schema with traits and overwrites', () => {
      const foo = SimplFactory.create('Foo', 'completed', 'withBar', { extra: 1 });

      expect(foo).toHaveProperty('state', 'completed');
      expect(foo).toHaveProperty('bar', expect.objectContaining({ description: expect.any(String) }));
      expect(foo).toHaveProperty('extra', 1);
    });
  });

  describe('#createList', () => {
    it('renders a list with 5 schemas', () => {
      const count = 5;

      const foo = SimplFactory.createList(
        'Foo',
        count,
        'completed',
        'deleted',
        (index) => ({ position: index })
      );

      expect(foo.length).toEqual(count);

      foo.map((item, index) =>
        expect(item).toEqual({
          id: expect.any(String),
          position: index,
          title: expect.any(String),
          state: 'completed',
          deletedAt: expect.any(Date),
        })
      );
    });
  });
});
