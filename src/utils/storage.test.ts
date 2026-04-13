import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { saveTasks, loadTasks } from './storage';
import { Task } from '../types';

const STORAGE_KEY = 'todolist-app-tasks';

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

// --- Unit tests ---

describe('loadTasks', () => {
  it('returns [] when localStorage is empty', () => {
    expect(loadTasks()).toEqual([]);
  });

  it('returns [] when data is corrupt (invalid JSON)', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json}');
    expect(loadTasks()).toEqual([]);
  });

  it('returns [] when data is not an array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: '1', title: 'task' }));
    expect(loadTasks()).toEqual([]);
  });
});

describe('saveTasks', () => {
  it('does not crash when localStorage.setItem throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => saveTasks([{ id: '1', title: 'test', completed: false, createdAt: 1 }])).not.toThrow();
  });
});

// --- Property test ---

function taskArbitrary(): fc.Arbitrary<Task> {
  return fc.record({
    id: fc.uuid(),
    title: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
    completed: fc.boolean(),
    createdAt: fc.integer({ min: 0 }),
  });
}

// Feature: todolist-app, Property 11: Persistensi storage adalah operasi round-trip
describe('Property 11: storage round-trip', () => {
  it('saveTasks then loadTasks returns structurally identical list', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary()), (tasks) => {
        saveTasks(tasks);
        const loaded = loadTasks();
        expect(loaded).toEqual(tasks);
      })
    );
  });
});
