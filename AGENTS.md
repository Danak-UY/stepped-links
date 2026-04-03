# Agent Instructions for Stepped Links

This is a [Raycast](https://raycast.com) extension written in TypeScript with React. It manages hierarchical/stepped links for quick navigation.

## Project Overview

- **Framework**: Raycast API (React-based)
- **Language**: TypeScript with strict mode
- **Package Manager**: pnpm

## Commands

### Build & Development

```bash
# Development mode (hot reload)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Fix lint issues automatically
npm run fix-lint

# Publish extension
npm run publish
```

### Single Test Execution

There are no dedicated test files in this project. Test individual functions by running them directly or using the Raycast console.

### Type Checking

```bash
# Use the build command which includes type checking
npm run build
```

## Code Style Guidelines

### Formatting (Prettier)

- **Print width**: 120 characters
- **Tab width**: 2 spaces
- **Quotes**: Single quotes
- **Trailing commas**: ES5 (all but last)
- **Semicolons**: Required
- **JSX**: React JSX transform

Run `npm run fix-lint` to auto-format.

### TypeScript

- **Strict mode enabled** - all strict flags are on
- Use `interface` for object shapes, `type` for unions/aliases
- Prefer explicit return types for exported functions
- Use `import type` for type-only imports
- Avoid `any` - use `Record<string, unknown>` or proper generics instead

### Imports

Order (enforced by ESLint):

1. React core: `import React from 'react'`
2. External libraries: `@raycast/api`, `lodash`, etc.
3. Internal modules: relative imports with `../`

```typescript
// Type-only imports
import type { StepTypes } from '../types/Step';

// Default imports for utilities
import { merge } from 'lodash';

// Named imports from @raycast/api
import { Icon, Toast, LocalStorage } from '@raycast/api';

// Relative imports
import Step from '../models/Step';
import Storage from '../services/storage';
```

### Naming Conventions

| Type                | Convention                  | Example                     |
| ------------------- | --------------------------- | --------------------------- |
| Components          | PascalCase                  | `StepsList`, `StepItem`     |
| Hooks               | camelCase with `use` prefix | `useSteppedLinksSearch`     |
| Types/Interfaces    | PascalCase                  | `StepTypes`, `RouteStep`    |
| Variables/Functions | camelCase                   | `searchSteps`, `parseSteps` |
| Classes             | PascalCase                  | `Step`, `Storage`           |
| Constants           | SCREAMING_SNAKE_CASE        | `CONFIG_KEYS`               |

### Components

- Use functional components with `export default function`
- Destructure props in function signature
- Default values in destructuring: `{ steps = [], traveled = [] }`
- Use `React.Fragment` when needed, or shorthand `<>...</>`

```typescript
interface StepsListTypes {
  steps: StepTypes[];
  traveled?: string[];
  currentQuery?: string;
}

export default function StepsList({ steps, traveled = [], currentQuery }: StepsListTypes) {
  // component body
}
```

### Error Handling

- Use try/catch for async operations
- Log errors with `console.error()`
- Show user feedback with `Toast.Style.Failure`
- Always provide fallback values for potentially undefined data

```typescript
export const addStepToStorage = async (step: StepInterface) => {
  try {
    Feedback.toast('Saving new step', Toast.Style.Animated);
    // operations...
    Feedback.toast('Step created', Toast.Style.Success);
  } catch (e) {
    console.error(e);
    Feedback.toast('There was a problem saving step', Toast.Style.Failure);
  }
};
```

### State Management

- Use React hooks: `useState`, `useEffect`, `useMemo`, `useCallback`
- Memoize expensive computations with `useMemo`
- Keep state as local as possible

## Architecture

```
src/
├── components/     # React UI components
├── controller/     # Business logic coordination
├── helpers/        # Pure utility functions (parser, validator, etc.)
├── hooks/          # Custom React hooks
├── models/         # Class-based data models
├── services/       # External integrations (storage, feedback)
├── types/          # TypeScript interfaces and types
└── *.tsx           # Command entry points (Raycast views)
```

### Directory Responsibilities

- **components/**: Presentational React components (List, Item, Actions)
- **controller/**: Orchestrates between services and components
- **helpers/**: Pure functions, no side effects
- **models/**: Classes that encapsulate data logic
- **services/**: Side-effectful code (storage, API calls)
- **types/**: Shared TypeScript type definitions

## Common Patterns

### Storage Access

```typescript
// Getting with default
const stepsInfo = await Storage.getItem('steppedRoutes', {});

// Setting
await Storage.setItem('steppedRoutes', data);
```

### Raycast List Items

```typescript
import { List, Icon } from '@raycast/api';

<List.Item
  title={step.title}
  subtitle={step.subtitle}
  icon={Icon.Link}
  actions={<StepActions step={step} />}
/>
```

### Dynamic Components

```typescript
const Wrapper = condition ? List.Section : React.Fragment;
const wrapperProps = condition ? { title: 'Section' } : {};

return (
  <Wrapper {...wrapperProps}>
    {/* children */}
  </Wrapper>
);
```

## Raycast-Specific Notes

- Commands are defined in `package.json` under `commands`
- Preferences are defined under `preferences` in package.json
- Use `LocalStorage` from `@raycast/api` for persistence
- Toast notifications via `Feedback.toast()` or `Toast` from API
- Icons from `@raycast/api` (Icon namespace)
