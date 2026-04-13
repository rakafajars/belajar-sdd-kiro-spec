import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskItem } from './TaskItem';
import { Task } from '../../types';

const baseTask: Task = {
  id: 'task-1',
  title: 'Beli susu',
  completed: false,
  createdAt: 1700000000000,
};

const completedTask: Task = {
  ...baseTask,
  completed: true,
};

function renderItem(overrides: Partial<Parameters<typeof TaskItem>[0]> = {}) {
  const props = {
    task: baseTask,
    isEditing: false,
    onToggle: vi.fn(),
    onEdit: vi.fn(),
    onSave: vi.fn(),
    onCancel: vi.fn(),
    onDelete: vi.fn(),
    ...overrides,
  };
  return { ...render(<TaskItem {...props} />), props };
}

describe('TaskItem — view mode', () => {
  test('renders task title, checkbox, edit and delete buttons', () => {
    renderItem();
    expect(screen.getByText('Beli susu')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hapus/i })).toBeInTheDocument();
  });

  test('checkbox is unchecked for incomplete task', () => {
    renderItem();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('checkbox is checked for completed task', () => {
    renderItem({ task: completedTask });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('completed task title has line-through style', () => {
    renderItem({ task: completedTask });
    const span = screen.getByText('Beli susu');
    expect(span).toHaveClass('line-through');
  });

  test('incomplete task title has no line-through style', () => {
    renderItem();
    const span = screen.getByText('Beli susu');
    expect(span).not.toHaveClass('line-through');
  });

  test('clicking checkbox calls onToggle with task id', async () => {
    const { props } = renderItem();
    await userEvent.click(screen.getByRole('checkbox'));
    expect(props.onToggle).toHaveBeenCalledWith('task-1');
  });

  test('clicking edit button calls onEdit with task id', async () => {
    const { props } = renderItem();
    await userEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(props.onEdit).toHaveBeenCalledWith('task-1');
  });

  test('clicking delete button calls onDelete with task id', async () => {
    const { props } = renderItem();
    await userEvent.click(screen.getByRole('button', { name: /hapus/i }));
    expect(props.onDelete).toHaveBeenCalledWith('task-1');
  });
});

describe('TaskItem — edit mode', () => {
  test('renders input field with current title value', () => {
    renderItem({ isEditing: true });
    const input = screen.getByRole('textbox', { name: /edit judul/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Beli susu');
  });

  test('renders save and cancel buttons in edit mode', () => {
    renderItem({ isEditing: true });
    expect(screen.getByRole('button', { name: /simpan/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /batal/i })).toBeInTheDocument();
  });

  test('does not render edit/delete buttons in edit mode', () => {
    renderItem({ isEditing: true });
    expect(screen.queryByRole('button', { name: /^edit$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^hapus$/i })).not.toBeInTheDocument();
  });

  test('clicking save with valid title calls onSave with id and trimmed title', async () => {
    const { props } = renderItem({ isEditing: true });
    const input = screen.getByRole('textbox', { name: /edit judul/i });
    await userEvent.clear(input);
    await userEvent.type(input, 'Judul baru');
    await userEvent.click(screen.getByRole('button', { name: /simpan/i }));
    expect(props.onSave).toHaveBeenCalledWith('task-1', 'Judul baru');
  });

  test('clicking save with empty title does NOT call onSave and shows error', async () => {
    const { props } = renderItem({ isEditing: true });
    const input = screen.getByRole('textbox', { name: /edit judul/i });
    await userEvent.clear(input);
    await userEvent.click(screen.getByRole('button', { name: /simpan/i }));
    expect(props.onSave).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('clicking save with whitespace-only title does NOT call onSave and shows error', async () => {
    const { props } = renderItem({ isEditing: true });
    const input = screen.getByRole('textbox', { name: /edit judul/i });
    await userEvent.clear(input);
    await userEvent.type(input, '   ');
    await userEvent.click(screen.getByRole('button', { name: /simpan/i }));
    expect(props.onSave).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('pressing Enter with valid title calls onSave', async () => {
    const { props } = renderItem({ isEditing: true });
    const input = screen.getByRole('textbox', { name: /edit judul/i });
    await userEvent.clear(input);
    await userEvent.type(input, 'Judul enter{Enter}');
    expect(props.onSave).toHaveBeenCalledWith('task-1', 'Judul enter');
  });

  test('pressing Escape calls onCancel', async () => {
    const { props } = renderItem({ isEditing: true });
    const input = screen.getByRole('textbox', { name: /edit judul/i });
    await userEvent.type(input, '{Escape}');
    expect(props.onCancel).toHaveBeenCalled();
  });

  test('clicking cancel button calls onCancel', async () => {
    const { props } = renderItem({ isEditing: true });
    await userEvent.click(screen.getByRole('button', { name: /batal/i }));
    expect(props.onCancel).toHaveBeenCalled();
  });
});
