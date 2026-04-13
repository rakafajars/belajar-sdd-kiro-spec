interface ClearCompletedProps {
  hasCompleted: boolean;
  onClear: () => void;
}

export function ClearCompleted({ hasCompleted, onClear }: ClearCompletedProps) {
  return (
    <button
      onClick={onClear}
      disabled={!hasCompleted}
      className={hasCompleted
        ? 'w-full px-4 py-2 text-sm font-black uppercase border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all'
        : 'w-full px-4 py-2 text-sm font-black uppercase border-4 border-black bg-white text-black opacity-50 cursor-not-allowed'
      }
    >
      Hapus Semua Selesai
    </button>
  );
}
