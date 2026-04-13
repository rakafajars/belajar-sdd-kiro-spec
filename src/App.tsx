import { useState, useEffect } from 'react';
import { Task, FilterType } from './types';
import { addTask, toggleTask, editTask, deleteTask, clearCompleted, filterTasks } from './utils/taskUtils';
import { loadTasks, saveTasks } from './utils/storage';
import { TaskInput } from './components/TaskInput/TaskInput';
import { FilterBar } from './components/FilterBar/FilterBar';
import { TaskList } from './components/TaskList/TaskList';
import { ClearCompleted } from './components/ClearCompleted/ClearCompleted';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function handleAdd(title: string) {
    setTasks(prev => addTask(prev, title));
  }

  function handleToggle(id: string) {
    setTasks(prev => toggleTask(prev, id));
  }

  function handleEdit(id: string) {
    setEditingTaskId(id);
  }

  function handleSave(id: string, newTitle: string) {
    setTasks(prev => editTask(prev, id, newTitle));
    setEditingTaskId(null);
  }

  function handleCancel() {
    setEditingTaskId(null);
  }

  function handleDelete(id: string) {
    setTasks(prev => deleteTask(prev, id));
  }

  function handleClearCompleted() {
    setTasks(prev => clearCompleted(prev));
  }

  function handleFilterChange(newFilter: FilterType) {
    setFilter(newFilter);
  }

  const filteredTasks = filterTasks(tasks, filter);

  return (
    <div className="min-h-screen bg-yellow-300 p-4 sm:p-8 font-mono">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] mb-6 p-4">
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">
            📝 Todo List
          </h1>
          <p className="text-sm font-bold text-black/60 mt-1">Catat. Selesaikan. Hapus.</p>
        </div>

        {/* Main card */}
        <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] p-5 flex flex-col gap-5">
          <TaskInput onAdd={handleAdd} />
          <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />
          <TaskList
            tasks={filteredTasks}
            editingTaskId={editingTaskId}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
          />
          <ClearCompleted
            hasCompleted={tasks.some(t => t.completed)}
            onClear={handleClearCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
