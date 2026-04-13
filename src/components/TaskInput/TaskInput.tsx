import { useState, KeyboardEvent } from 'react';
import { validateTitle } from '../../utils/taskUtils';

interface TaskInputProps {
  onAdd: (title: string) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!validateTitle(title)) {
      setError('Judul tidak boleh kosong atau hanya spasi.');
      return;
    }
    onAdd(title);
    setTitle('');
    setError('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tambah tugas baru..."
          aria-label="Judul tugas"
          className="flex-1 px-3 py-2 border-4 border-black font-mono font-bold text-sm bg-white placeholder:text-black/40 focus:outline-none focus:bg-yellow-100 transition-colors"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-black text-yellow-300 font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_#facc15] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
        >
          + Tambah
        </button>
      </div>
      {error && (
        <span role="alert" className="text-sm font-bold text-red-600 border-2 border-red-600 bg-red-50 px-2 py-1">
          ⚠ {error}
        </span>
      )}
    </div>
  );
}
