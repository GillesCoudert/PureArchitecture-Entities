# PureArchitecture-Entities

A TypeScript library providing entity interfaces for Pure Architecture domain modeling.

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![npm version](https://badge.fury.io/js/%40gilles-coudert%2Fpure-architecture-entities.svg)](https://www.npmjs.com/package/@gilles-coudert/pure-architecture-entities)

## Overview

This library provides TypeScript interfaces for building domain entities in Pure Architecture applications. It includes three core entity types that handle common lifecycle patterns:

- **ImmutableEntity**: Base entities that cannot be modified after creation
- **UpdatableEntity**: Entities that can be updated after creation
- **SoftRemovableEntity**: Entities supporting soft deletion

All entities support custom identifier types.

## Installation

```bash
npm install @gilles-coudert/pure-architecture-entities
```

## Quick Start

```typescript
import {
    ImmutableEntity,
    UpdatableEntity,
    SoftRemovableEntity,
} from '@gilles-coudert/pure-architecture-entities';

// Define an immutable entity
interface User extends ImmutableEntity<string> {
    email: string;
    username: string;
}

// Define an updatable entity
interface Article extends UpdatableEntity<string> {
    title: string;
    content: string;
}

// Define a soft-removable entity
interface Post extends SoftRemovableEntity<number> {
    title: string;
    body: string;
}
```

## API Reference

### ImmutableEntity

Base interface for entities that cannot be modified after creation.

```typescript
interface ImmutableEntity<TId = string> {
    id: TId;
    createdAt: Date;
}
```

**Type Parameters:**

- `TId`: The type of the entity identifier (defaults to `string`)

**Properties:**

- `id`: Unique identifier for the entity
- `createdAt`: Timestamp when the entity was created

### UpdatableEntity

Interface for entities that can be updated after creation. Extends `ImmutableEntity`.

```typescript
interface UpdatableEntity<TId = string> extends ImmutableEntity<TId> {
    updatedAt: Date;
}
```

**Additional Properties:**

- `updatedAt`: Timestamp of the last update to the entity

### SoftRemovableEntity

Interface for entities that support soft deletion. Extends `ImmutableEntity`.

```typescript
interface SoftRemovableEntity<TId = string> extends ImmutableEntity<TId> {
    removedAt: Date;
}
```

**Additional Properties:**

- `removedAt`: Timestamp when the entity was soft deleted

## Usage Examples

### Basic Entity Definition

```typescript
import { ImmutableEntity } from '@gilles-coudert/pure-architecture-entities';

interface Product extends ImmutableEntity {
    name: string;
    price: number;
    sku: string;
}

const product: Product = {
    id: 'prod-123',
    createdAt: new Date(),
    accessPolicy: undefined,
    name: 'Widget',
    price: 29.99,
    sku: 'WID-001',
};
```

### Entity with Custom ID Type

```tname: 'Widget',
    price: 29.99,
    sku: 'WID-001',
};
```

### Entity with Custom ID Type

```typescript
import { UpdatableEntity } from '@gilles-coudert/pure-architecture-entities';

interface Order extends UpdatableEntity<number> {
    customerId: number;
    items: OrderItem[];
    total: number;
}

const order: Order = {
    id: 12345,
    createdAt: new Date(),
    updatedAt: new Date(),
    customerId: 67890,
    items: [],
    total: 0,
};
```

### Soft-Removable Entity

````typescript
import { SoftRemovableEntity } from '@gilles-coudert/pure-architecture-entities';

interface Document extends SoftRemovableEntity<string> {
    title: string;
    content: string;
}

const document: Document = {
    id: 'doc-456',
    createdAt: new Date(),
    removedAt: new Date()
- Node.js 24 or higher
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/GillesCoudert/PureArchitecture-Entities.git
cd PureArchitecture-Entities

# Install dependencies
npm install

# Build the project
npm run build
````

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run test` - Run tests with Jest
- `npm run lint` - Lint code with ESLint

### Lint Configuration

This project uses a comprehensive ESLint configuration tailored for Pure Architecture projects:

- **Strict TypeScript**: Enforces explicit return types and prevents use of `any`
- **Naming Conventions**: Enforces PascalCase for interfaces, types, and classes
- **Code Quality**: Limits complexity, file size, and function parameters
- **Best Practices**: Enforces modern JavaScript/TypeScript patterns

Run linting with:

```bash
npm run lint
```

## Contributing

Contributions are welcome.

### Mandatory branch naming

Branch prefixes are **required** and define the semantic impact of the change:

- `upgrade/` → breaking changes (major version)
- `us/` → new features (minor version)
- `fix/` → bug fixes (patch version)

### Why not Conventional Commits?

Versioning information belongs to the **branch**, not individual commits.

Branches express intent and scope.
Commits should stay frequent, descriptive, and free of artificial prefixes that often degrade into `wip:` or `chore:` without semantic value.

## License

This project is licensed under the Mozilla Public License 2.0 - see the [LICENSE](LICENSE) file for details.

## Author

**Gilles Coudert**

- Email: pure.framework@gmail.com
- GitHub: [@GillesCoudert](https://github.com/GillesCoudert)

## Related Projects

- [@gilles-coudert/pure-architecture](https://github.com/GillesCoudert/PureArchitecture) - Core Pure Architecture framework

## Support

For issues and questions:

- GitHub Issues: [PureArchitecture-Entities/issues](https://github.com/GillesCoudert/PureArchitecture-Entities/issues)
- Email: pure.framework@gmail.com
