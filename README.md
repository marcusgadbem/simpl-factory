# nfactory

Simple objects factory. WIP.

## Usage

```javascript
import { registerFactory } from 'nfactory';

// Register a factory
registerFactory('BarFactory', () => ({
  schema: {
    id: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    date: new Date(),
    status: 'in_progress',
  },
}));

// Create a Bar object
const myFactory = createFactory('BarFactory');

// Output
{
  id: '7565c1e7-6511-4cab-9b43-4b2c999feaa6',
  description: 'Quam ipsa beatae sit cupiditate quia dolor magni.',
  date: 2021-04-05T14:57:38.429Z,
  status: 'in_progress'
}
```

## Traits

```javascript
// Register a factory with trait
registerFactory('BarFactory', () => ({
  schema: {
    id: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    date: new Date(),
    status: 'in_progress',
  },

  traits: {
    complete: {
      completedAt: new Date(),
    }
  }
}));

// Create a Bar object
const myFactory = createFactory('BarFactory', 'complete');

// Output
{
  id: '4fb5ddcf-53bb-4714-825f-62c8981f943a',
  description: 'Accusantium voluptatum vitae atque dolorem.',
  date: 2021-04-05T14:59:01.149Z,
  status: 'in_progress'
  completedAt: 2021-04-05T14:59:01.149Z
}
```

## Context

```javascript
// Register a factory with trait
registerFactory('BarFactory', () => ({
  schema: {
    id: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    date: new Date(),
    status: 'in_progress',
  },

  traits: {
    complete: {
      completedAt: new Date(),
    }
  }
}));

// Create a Bar object
const myFactory = createFactory('BarFactory', 'complete', { status: 'done', extra: 'foo' });

// Output
{
  id: '4fb5ddcf-53bb-4714-825f-62c8981f943a',
  description: 'Accusantium voluptatum vitae atque dolorem.',
  date: 2021-04-05T14:59:01.149Z,
  status: 'done'
  completedAt: 2021-04-05T14:59:01.149Z
  extra: 'foo',
}
```

## API

### registerFactory('factoryName', factoryFn)

```javascript
registerFactory('factoryName', () => ({
  schema: {},
  traits?: {}
}))
```

### createFactory('factoryName', ...traits?, context?)

```javascript
createFactory('factoryName')

// with 1+ traits
createFactory('factoryName', 'trait1', 'trait2', 'trait3')

// with context
createFactory('factoryName', { extra: 'foo' })

// with 1+ traits and context
createFactory(
  'factoryName',
  'trait1', 'trait2', 'trait3',
  { extra: 'foo' }
)
```

### createFactoryList('factoryName', <count>, ...traits?, context?)

```javascript
createFactoryList(
  'factoryName',
  5,
  'trait1', 'trait2', 'trait3',
  { extra: 'foo' }
)
```
