# Tech Stack

- **Language**: TypeScript
- **Framework**: React
- **Build Tool**: Vite
- **Styling**: CSS Modules or Tailwind CSS
- **State Management**: React `useState` + `useReducer` (no external state library)
- **Persistence**: Browser `localStorage` API (synchronous, no async operations)

## Testing

- **Test Runner**: Vitest (with jsdom environment, globals enabled)
- **Component Testing**: React Testing Library + `@testing-library/user-event`
- **Assertions**: `@testing-library/jest-dom`
- **Property-Based Testing**: fast-check (`fc.assert` / `fc.property`, minimum 100 iterations)

## Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests (single pass)
npx vitest --run

# Run tests in watch mode
npx vitest

# Build for production
npm run build
```

## Key Conventions

- All business logic lives in pure functions in `src/utils/taskUtils.ts` — no side effects, never throw exceptions
- Storage functions in `src/utils/storage.ts` fail silently (catch + console.log), app works without persistence
- No async operations anywhere in the codebase
- UUIDs used for task IDs
- Property-based tests tagged with: `// Feature: todolist-app, Property N: <description>`
