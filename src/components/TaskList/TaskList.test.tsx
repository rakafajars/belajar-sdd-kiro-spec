import { render, screen } from '@testing-library/react';
import { TaskList } from './TaskList';
import { Task } from '../../types';

const noop = () => {};

const makeTask = (id: string, title: string, completed = false): Task => ({
  id,
  title,
  completed,
  createdAt: Date.now(),
});

describe('TaskList', () => {
  it('shows "Belum ada tugas" when tasks is empty', () => {
    render(
      <TaskList
        tasks={[]}
        editingTaskId={null}
        onToggle={noop}
        onEdit={noop}
        onSave={noop}
        onCancel={noop}
        onDelete={noop}
      />
    );
    expect(screen.getByText('Belum ada tugas')).toBeInTheDocument();
  });

  it('renders all TaskItems when tasks are provided', () => {
    const tasks = [
      makeTask('1', 'Task satu'),
      makeTask('2', 'Task dua'),
      makeTask('3', 'Task tiga'),
    ];

    render(
      <TaskList
        tasks={tasks}
        editingTaskId={null}
        onToggle={noop}
        onEdit={noop}
        onSave={noop}
        onCancel={noop}
        onDelete={noop}
      />
    );

    expect(screen.getByText('Task satu')).toBeInTheDocument();
    expect(screen.getByText('Task dua')).toBeInTheDocument();
    expect(screen.getByText('Task tiga')).toBeInTheDocument();
  });
});
