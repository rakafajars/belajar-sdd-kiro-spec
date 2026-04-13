import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Clear localStorage before each test to ensure isolation
beforeEach(() => {
  localStorage.clear();
});

async function addTaskViaUI(user: ReturnType<typeof userEvent.setup>, title: string) {
  const input = screen.getByRole('textbox', { name: /judul tugas/i });
  await user.clear(input);
  await user.type(input, title);
  await user.click(screen.getByRole('button', { name: /tambah/i }));
}

describe('App integration tests', () => {
  test('add task flow: type title → submit → task appears in list', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTaskViaUI(user, 'Beli susu');

    expect(screen.getByText('Beli susu')).toBeInTheDocument();
  });

  test('toggle task flow: click checkbox → status changes visually', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTaskViaUI(user, 'Cuci piring');

    const checkbox = screen.getByRole('checkbox', { name: /tandai selesai: cuci piring/i });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    const span = screen.getByText('Cuci piring');
    expect(span).toHaveAttribute('data-completed', 'true');
  });

  test('edit task flow: click edit → change title → save → title updated', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTaskViaUI(user, 'Tugas lama');

    await user.click(screen.getByRole('button', { name: /edit/i }));

    const editInput = screen.getByRole('textbox', { name: /edit judul tugas/i });
    await user.clear(editInput);
    await user.type(editInput, 'Tugas baru');
    await user.click(screen.getByRole('button', { name: /simpan/i }));

    expect(screen.getByText('Tugas baru')).toBeInTheDocument();
    expect(screen.queryByText('Tugas lama')).not.toBeInTheDocument();
  });

  test('delete task flow: click delete → task removed from list', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTaskViaUI(user, 'Task untuk dihapus');

    expect(screen.getByText('Task untuk dihapus')).toBeInTheDocument();

    const listItem = screen.getByText('Task untuk dihapus').closest('li')!;
    await user.click(within(listItem).getByRole('button', { name: /hapus/i }));

    expect(screen.queryByText('Task untuk dihapus')).not.toBeInTheDocument();
  });

  test('filter flow: add tasks, toggle some, check each filter shows correct tasks', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTaskViaUI(user, 'Task aktif');
    await addTaskViaUI(user, 'Task selesai');

    // Toggle "Task selesai" to completed
    const checkbox = screen.getByRole('checkbox', { name: /tandai selesai: task selesai/i });
    await user.click(checkbox);

    // Filter: All — both tasks visible
    const filterGroup = screen.getByRole('group', { name: /filter tugas/i });
    await user.click(within(filterGroup).getByRole('button', { name: /semua/i }));
    expect(screen.getByText('Task aktif')).toBeInTheDocument();
    expect(screen.getByText('Task selesai')).toBeInTheDocument();

    // Filter: Active — only active task visible
    await user.click(screen.getByRole('button', { name: /belum selesai/i }));
    expect(screen.getByText('Task aktif')).toBeInTheDocument();
    expect(screen.queryByText('Task selesai')).not.toBeInTheDocument();

    // Filter: Completed — only completed task visible
    await user.click(screen.getByRole('button', { name: /^selesai$/i }));
    expect(screen.queryByText('Task aktif')).not.toBeInTheDocument();
    expect(screen.getByText('Task selesai')).toBeInTheDocument();
  });

  test('clear completed flow: mark tasks complete → click clear → only active tasks remain', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTaskViaUI(user, 'Task tetap');
    await addTaskViaUI(user, 'Task dihapus 1');
    await addTaskViaUI(user, 'Task dihapus 2');

    // Complete the two tasks
    await user.click(screen.getByRole('checkbox', { name: /tandai selesai: task dihapus 1/i }));
    await user.click(screen.getByRole('checkbox', { name: /tandai selesai: task dihapus 2/i }));

    await user.click(screen.getByRole('button', { name: /hapus semua selesai/i }));

    expect(screen.getByText('Task tetap')).toBeInTheDocument();
    expect(screen.queryByText('Task dihapus 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Task dihapus 2')).not.toBeInTheDocument();
  });
});
