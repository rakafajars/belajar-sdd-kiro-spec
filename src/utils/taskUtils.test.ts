import { describe, test, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  validateTitle,
  addTask,
  toggleTask,
  editTask,
  deleteTask,
  clearCompleted,
  filterTasks,
} from './taskUtils';
import type { Task, FilterType } from '../types';

// ---------------------------------------------------------------------------
// Arbitrary helpers
// ---------------------------------------------------------------------------

function taskArbitrary(): fc.Arbitrary<Task> {
  return fc.record({
    id: fc.uuid(),
    title: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
    completed: fc.boolean(),
    createdAt: fc.integer({ min: 0, max: Number.MAX_SAFE_INTEGER }),
  });
}

function validTitleArbitrary(): fc.Arbitrary<string> {
  return fc.string({ minLength: 1 }).filter(s => s.trim().length > 0);
}

function whitespaceTitleArbitrary(): fc.Arbitrary<string> {
  return fc.array(fc.constantFrom(' ', '\t', '\n', '\r'), { minLength: 1 }).map(chars => chars.join(''));
}

// ---------------------------------------------------------------------------
// Property-Based Tests
// ---------------------------------------------------------------------------

// Feature: todolist-app, Property 1: Penambahan task yang valid selalu masuk ke list
test('Property 1: addTask dengan judul valid menambah tepat satu task ke list', () => {
  fc.assert(
    fc.property(
      fc.array(taskArbitrary()),
      validTitleArbitrary(),
      (tasks, title) => {
        const result = addTask(tasks, title);
        expect(result).toHaveLength(tasks.length + 1);
        expect(result.some(t => t.title === title.trim() && t.completed === false)).toBe(true);
      }
    )
  );
});

// Feature: todolist-app, Property 2: Validasi judul menolak semua string whitespace
test('Property 2: validateTitle menolak semua string whitespace', () => {
  fc.assert(
    fc.property(whitespaceTitleArbitrary(), (ws) => {
      expect(validateTitle(ws)).toBe(false);
    })
  );
});

test('Property 2: addTask dan editTask tidak mengubah list jika judul hanya whitespace', () => {
  fc.assert(
    fc.property(
      fc.array(taskArbitrary(), { minLength: 1 }),
      whitespaceTitleArbitrary(),
      (tasks, ws) => {
        // addTask no-op
        const afterAdd = addTask(tasks, ws);
        expect(afterAdd).toHaveLength(tasks.length);

        // editTask no-op
        const targetId = tasks[0].id;
        const afterEdit = editTask(tasks, targetId, ws);
        expect(afterEdit).toEqual(tasks);
      }
    )
  );
});

// Feature: todolist-app, Property 3: Urutan tampilan task adalah descending berdasarkan waktu pembuatan
test('Property 3: filterTasks mengurutkan task secara descending berdasarkan createdAt', () => {
  fc.assert(
    fc.property(
      fc.array(taskArbitrary(), { minLength: 2 }),
      fc.constantFrom<FilterType>('all', 'active', 'completed'),
      (tasks, filter) => {
        const result = filterTasks(tasks, filter);
        for (let i = 0; i < result.length - 1; i++) {
          expect(result[i].createdAt).toBeGreaterThanOrEqual(result[i + 1].createdAt);
        }
      }
    )
  );
});

// Feature: todolist-app, Property 5: Toggle status task adalah operasi round-trip
test('Property 5: toggleTask dua kali mengembalikan task list ke kondisi semula', () => {
  fc.assert(
    fc.property(
      fc.array(taskArbitrary(), { minLength: 1 }),
      (tasks) => {
        const targetId = tasks[0].id;
        const toggled = toggleTask(tasks, targetId);
        const restored = toggleTask(toggled, targetId);
        expect(restored).toEqual(tasks);
      }
    )
  );
});

// Feature: todolist-app, Property 6: Edit task memperbarui judul dengan benar
test('Property 6: editTask hanya mengubah judul task yang ditarget, field lain tidak berubah', () => {
  fc.assert(
    fc.property(
      fc.array(taskArbitrary(), { minLength: 1 }),
      validTitleArbitrary(),
      (tasks, newTitle) => {
        const target = tasks[0];
        const result = editTask(tasks, target.id, newTitle);

        const updatedTask = result.find(t => t.id === target.id)!;
        expect(updatedTask.title).toBe(newTitle.trim());
        expect(updatedTask.id).toBe(target.id);
        expect(updatedTask.completed).toBe(target.completed);
        expect(updatedTask.createdAt).toBe(target.createdAt);

        // All other tasks unchanged
        const othersBefore = tasks.filter(t => t.id !== target.id);
        const othersAfter = result.filter(t => t.id !== target.id);
        expect(othersAfter).toEqual(othersBefore);
      }
    )
  );
});

// Feature: todolist-app, Property 8: Hapus task mengurangi list tepat satu elemen
test('Property 8: deleteTask mengurangi list tepat satu elemen dan task terhapus tidak ada lagi', () => {
  fc.assert(
    fc.property(
      fc.array(taskArbitrary(), { minLength: 1 }),
      (tasks) => {
        const targetId = tasks[0].id;
        const result = deleteTask(tasks, targetId);
        expect(result).toHaveLength(tasks.length - 1);
        expect(result.find(t => t.id === targetId)).toBeUndefined();
      }
    )
  );
});

// Feature: todolist-app, Property 9: Filter task mengembalikan subset yang benar
test('Property 9: filterTasks mengembalikan subset yang benar untuk setiap FilterType', () => {
  fc.assert(
    fc.property(
      fc.array(taskArbitrary()),
      (tasks) => {
        const all = filterTasks(tasks, 'all');
        expect(all).toHaveLength(tasks.length);

        const active = filterTasks(tasks, 'active');
        expect(active.every(t => t.completed === false)).toBe(true);
        expect(active).toHaveLength(tasks.filter(t => !t.completed).length);

        const completed = filterTasks(tasks, 'completed');
        expect(completed.every(t => t.completed === true)).toBe(true);
        expect(completed).toHaveLength(tasks.filter(t => t.completed).length);
      }
    )
  );
});

// Feature: todolist-app, Property 10: clearCompleted menghapus semua task selesai dan hanya task selesai
test('Property 10: clearCompleted menghapus semua completed task dan mempertahankan semua active task', () => {
  fc.assert(
    fc.property(
      fc.array(taskArbitrary()),
      (tasks) => {
        const result = clearCompleted(tasks);

        // No completed tasks remain
        expect(result.every(t => t.completed === false)).toBe(true);

        // All active tasks are preserved
        const activeBefore = tasks.filter(t => !t.completed);
        expect(result).toHaveLength(activeBefore.length);
        activeBefore.forEach(t => {
          expect(result.find(r => r.id === t.id)).toEqual(t);
        });
      }
    )
  );
});

// ---------------------------------------------------------------------------
// Unit Tests — Edge Cases
// ---------------------------------------------------------------------------

describe('addTask — edge cases', () => {
  test('addTask dengan list kosong menghasilkan list dengan satu task', () => {
    const result = addTask([], 'Beli susu');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Beli susu');
    expect(result[0].completed).toBe(false);
    expect(typeof result[0].id).toBe('string');
    expect(result[0].id.length).toBeGreaterThan(0);
  });
});

describe('toggleTask — edge cases', () => {
  test('toggleTask dengan id yang tidak ditemukan adalah no-op', () => {
    const tasks: Task[] = [
      { id: 'abc', title: 'Task 1', completed: false, createdAt: 1000 },
    ];
    const result = toggleTask(tasks, 'nonexistent-id');
    expect(result).toEqual(tasks);
  });
});

describe('editTask — edge cases', () => {
  test('editTask dengan id yang tidak ditemukan adalah no-op', () => {
    const tasks: Task[] = [
      { id: 'abc', title: 'Task 1', completed: false, createdAt: 1000 },
    ];
    const result = editTask(tasks, 'nonexistent-id', 'Judul Baru');
    expect(result).toEqual(tasks);
  });
});

describe('deleteTask — edge cases', () => {
  test('deleteTask dengan id yang tidak ditemukan adalah no-op', () => {
    const tasks: Task[] = [
      { id: 'abc', title: 'Task 1', completed: false, createdAt: 1000 },
    ];
    const result = deleteTask(tasks, 'nonexistent-id');
    expect(result).toEqual(tasks);
  });
});

describe('filterTasks — edge cases', () => {
  test('filterTasks dengan list kosong mengembalikan array kosong untuk semua filter', () => {
    expect(filterTasks([], 'all')).toEqual([]);
    expect(filterTasks([], 'active')).toEqual([]);
    expect(filterTasks([], 'completed')).toEqual([]);
  });
});
