import { Task } from '../../types';
import { TaskItem } from '../TaskItem/TaskItem';

interface TaskListProps {
  tasks: Task[];
  editingTaskId: string | null;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, newTitle: string) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

export function TaskList({
  tasks,
  editingTaskId,
  onToggle,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-center font-bold uppercase text-black/40 py-8 tracking-widest">Belum ada tugas</p>;
  }

  return (
    <ul className="flex flex-col gap-2 list-none p-0 m-0">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingTaskId === task.id}
          onToggle={onToggle}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
