# simpl-factory

Simple objects factory. WIP.

## Usage

```javascript
import SimplFactory from 'simpl-factory';

// Register a factory
SimplFactory.define('User', () => ({
  schema: {
    id: faker.datatype.uuid(),
    name: faker.lorem.findName(),
    createdAt: new Date(),
  },
}));

// Create a Bar object
const user = SimplFactory.create('User');

// Output
{
  id: '7565c1e7-6511-4cab-9b43-4b2c999feaa6',
  name: 'Caitlyn Kerluke',
  createdAt: '2021-04-05T14:57:38.429Z',
}
```

## Traits

```javascript
// Register a factory with trait
SimplFactory.define('Post', () => ({
  schema: {
    id: faker.datatype.uuid(),
    text: faker.lorem.paragraph(),
    status: 'draft',
  },

  traits: {
    published: {
      status: 'published',
    }
  }
}));

// Create a Bar object
const post = SimplFactory.create('Post', 'published');

// Output
{
  id: '4fb5ddcf-53bb-4714-825f-62c8981f943a',
  text: 'axime eveniet accusantium architecto voluptate eum molestiae dolor voluptas. Animi repellendus voluptatem non vitae aut molestiae reprehenderit quibusdam.',
  status: 'published'
}
```

## Context

```javascript
// Register a factory
SimplFactory.define('Company', () => ({
  schema: {
    id: faker.datatype.uuid(),
    name: faker.lorem.sentence(),
    tags: ['grocery', 'market']
  },

  traits: {
    local: {
      localCompany: true,
    }
    closed: {
      closed: true,
    }
  }
}));

// Create a Bar object
const closedLocalCompany = SimplFactory.create('Company', 'local', 'closed', { tags: ['giftshop'] });

// Output
{
  id: '4fb5ddcf-53bb-4714-825f-62c8981f943a',
  name: 'Accusantium voluptatum',
  localCompany: true,
  closed: true
  tags: ['giftshop'],
}
```

## API

### SimplFactory.define('factoryName', factoryFn)

```javascript
SimplFactory.define('factoryName', () => ({
  schema: {},
  traits?: {}
}))
```

### SimplFactory.create('factoryName', ...traits?, context?)

```javascript
SimplFactory.create('factoryName')

// with 1+ traits
SimplFactory.create('factoryName', 'trait1', 'trait2', 'trait3')

// with context
SimplFactory.create('factoryName', { extra: 'foo' })

// with 1+ traits and context
SimplFactory.create(
  'factoryName',
  'trait1', 'trait2', 'trait3',
  { extra: 'foo' }
)
```

### SimplFactory.createList('factoryName', <count>, ...traits?, context?)

```javascript
SimplFactory.createList(
  'factoryName',
  5,
  'trait1', 'trait2', 'trait3',
  { extra: 'foo' }
)

SimplFactory.createList(
  'factoryName',
  5,
  (index) => ({ position: index })
)
```

## License

MIT © Marcus Gadbem
