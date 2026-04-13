import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskInput } from './TaskInput';

describe('TaskInput', () => {
  test('renders input field and add button', () => {
    render(<TaskInput onAdd={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tambah/i })).toBeInTheDocument();
  });

  test('calls onAdd and clears input when submitted with valid title', async () => {
    const onAdd = vi.fn();
    render(<TaskInput onAdd={onAdd} />);

    await userEvent.type(screen.getByRole('textbox'), 'Beli susu');
    await userEvent.click(screen.getByRole('button', { name: /tambah/i }));

    expect(onAdd).toHaveBeenCalledWith('Beli susu');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('does not call onAdd and shows error when title is empty', async () => {
    const onAdd = vi.fn();
    render(<TaskInput onAdd={onAdd} />);

    await userEvent.click(screen.getByRole('button', { name: /tambah/i }));

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('does not call onAdd and shows error when title is whitespace-only', async () => {
    const onAdd = vi.fn();
    render(<TaskInput onAdd={onAdd} />);

    await userEvent.type(screen.getByRole('textbox'), '   ');
    await userEvent.click(screen.getByRole('button', { name: /tambah/i }));

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('calls onAdd and clears input when Enter key is pressed with valid title', async () => {
    const onAdd = vi.fn();
    render(<TaskInput onAdd={onAdd} />);

    await userEvent.type(screen.getByRole('textbox'), 'Cuci baju{Enter}');

    expect(onAdd).toHaveBeenCalledWith('Cuci baju');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('shows error when Enter is pressed with empty input', async () => {
    const onAdd = vi.fn();
    render(<TaskInput onAdd={onAdd} />);

    await userEvent.type(screen.getByRole('textbox'), '{Enter}');

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
