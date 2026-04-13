# Project Structure

```
src/
  types/
    index.ts              # Task interface and FilterType type
  utils/
    taskUtils.ts          # Pure business logic functions
    taskUtils.test.ts     # Unit + property tests for pure functions
    storage.ts            # localStorage read/write
    storage.test.ts       # Unit + property tests for storage
  components/
    TaskInput/
      TaskInput.tsx       # Add task form
      TaskInput.test.tsx
    FilterBar/
      FilterBar.tsx       # All / Active / Completed filter buttons
      FilterBar.test.tsx
    TaskList/
      TaskList.tsx        # Renders list of TaskItem, empty state message
      TaskList.test.tsx
    TaskItem/
      TaskItem.tsx        # Single task row (view + inline edit mode)
      TaskItem.test.tsx
    ClearCompleted/
      ClearCompleted.tsx  # Bulk-delete completed tasks button
      ClearCompleted.test.tsx
  App.tsx                 # Root component — holds all state, wires components
  App.test.tsx            # Integration tests
  main.tsx                # Vite entry point
```

## Key Architectural Rules

- `App` is the single source of truth — all state lives here, passed down via props
- Components are pure UI — they receive data and callbacks, never touch `localStorage` directly
- Business logic (add, toggle, edit, delete, filter, clear) is implemented as pure functions in `taskUtils.ts`
- `localStorage` access is isolated to `storage.ts` only
- Unidirectional data flow: state lives in `App`, mutations go up via callbacks, data flows down via props
