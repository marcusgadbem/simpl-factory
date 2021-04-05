import { createFactory, createFactoryList } from '../src';
import './factories/Foo.factory';
import './factories/NoTraits.factory';

describe('Factories', () => {
  test('has default values', () => {
    const foo = createFactory('FooFactory');

    expect(foo.id).toBeDefined();
  });

  test('has overwritten values', () => {
    const foo = createFactory('FooFactory', { id: 1 });

    expect(foo.id).toEqual(1);
  });

  test('without trait', () => {
    const noTrait = createFactory('NoTraitsFactory');

    expect(noTrait.description).toEqual(expect.any(String));
  });

  test('accepts traits', () => {
    const foo = createFactory('FooFactory', 'completed');

    expect(foo.state).toEqual('completed');
  });

  test('accepts traits and overrides', () => {
    const foo = createFactory('FooFactory', 'completed', { position: 2 });

    expect(foo.position).toEqual(2);
    expect(foo.state).toEqual('completed');
  });

  test('prio overrides data over traits data', () => {
    const foo = createFactory('FooFactory', 'completed', { type: 'completed' });

    expect(foo.state).toEqual('completed');
  });

  test('with another factory as trait', () => {
    const foo = createFactory('FooFactory', 'withBar');

    expect(foo.bar).toEqual({
      id: expect.any(String),
      description: expect.any(String),
      date: expect.any(Date),
      status: expect.any(String),
    })
  })

  test('with another factory as context', () => {
    const foo = createFactory('FooFactory', { bar: createFactory('BarFactory', 'done') });

    expect(foo.bar).toEqual({
      id: expect.any(String),
      description: expect.any(String),
      date: expect.any(Date),
      status: 'done',
    })
  })
});

describe('createFactoryList', () => {
  test('has 5 factories', () => {
    const count = 5;

    const foo = createFactoryList(
      'FooFactory',
      count,
      'completed',
      'deleted',
      (index) => ({ position: index + 1 })
    );

    expect(foo.length).toEqual(count);

    expect(foo[4]).toEqual({
      id: expect.any(String),
      position: 5,
      title: expect.any(String),
      state: 'completed',
      deletedAt: expect.any(Date),
    });

  });
});
