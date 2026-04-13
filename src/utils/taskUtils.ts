import { Task, FilterType } from '../types';

export function validateTitle(title: string): boolean {
  return title.trim().length > 0;
}

export function addTask(tasks: Task[], title: string): Task[] {
  if (!validateTitle(title)) return tasks;
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: Date.now(),
  };
  return [...tasks, newTask];
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
}

export function editTask(tasks: Task[], id: string, newTitle: string): Task[] {
  if (!validateTitle(newTitle)) return tasks;
  return tasks.map(task =>
    task.id === id ? { ...task, title: newTitle.trim() } : task
  );
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter(task => task.id !== id);
}

export function clearCompleted(tasks: Task[]): Task[] {
  return tasks.filter(task => !task.completed);
}

export function filterTasks(tasks: Task[], filter: FilterType): Task[] {
  let result: Task[];
  if (filter === 'active') {
    result = tasks.filter(task => !task.completed);
  } else if (filter === 'completed') {
    result = tasks.filter(task => task.completed);
  } else {
    result = [...tasks];
  }
  return result.sort((a, b) => b.createdAt - a.createdAt);
}
