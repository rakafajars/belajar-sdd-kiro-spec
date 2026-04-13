import { useState, KeyboardEvent, useEffect } from 'react';
import { Task } from '../../types';
import { validateTitle } from '../../utils/taskUtils';

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, newTitle: string) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

export function TaskItem({
  task,
  isEditing,
  onToggle,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: TaskItemProps) {
  const [editTitle, setEditTitle] = useState(task.title);
  const [error, setError] = useState('');

  // Sync editTitle when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setEditTitle(task.title);
      setError('');
    }
  }, [isEditing, task.title]);

  function handleSave() {
    if (!validateTitle(editTitle)) {
      setError('Judul tidak boleh kosong atau hanya spasi.');
      return;
    }
    onSave(task.id, editTitle.trim());
    setError('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  }

  if (isEditing) {
    return (
      <li className="flex flex-col gap-2 p-3 border-2 border-black bg-yellow-50">
        <input
          type="text"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Edit judul tugas"
          className="w-full px-3 py-2 border-4 border-black font-mono font-bold text-sm bg-white focus:outline-none focus:bg-yellow-100 transition-colors"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 px-3 py-1.5 text-xs font-black uppercase border-2 border-black bg-black text-yellow-300 shadow-[3px_3px_0px_0px_#facc15] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            Simpan
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-3 py-1.5 text-xs font-black uppercase border-2 border-black bg-white text-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            Batal
          </button>
        </div>
        {error && <span role="alert" className="text-sm font-bold text-red-600 border-2 border-red-600 bg-red-50 px-2 py-1">{error}</span>}
      </li>
    );
  }

  return (
    <li className="flex items-center gap-3 p-3 border-2 border-black bg-white hover:bg-yellow-50 transition-colors">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Tandai selesai: ${task.title}`}
        className="w-5 h-5 border-2 border-black accent-black cursor-pointer flex-shrink-0"
      />
      <span
        className={task.completed ? 'flex-1 font-bold text-sm text-black line-through opacity-60' : 'flex-1 font-bold text-sm text-black'}
        data-completed={task.completed}
      >
        {task.title}
      </span>
      <button
        onClick={() => onEdit(task.id)}
        className="px-2 py-1 text-xs font-black uppercase border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(task.id)}
        className="px-2 py-1 text-xs font-black uppercase border-2 border-black bg-red-500 text-white shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
      >
        Hapus
      </button>
    </li>
  );
}
