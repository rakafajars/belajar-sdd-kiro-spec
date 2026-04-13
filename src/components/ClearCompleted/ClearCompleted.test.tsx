import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClearCompleted } from './ClearCompleted';

describe('ClearCompleted', () => {
  it('button is disabled when hasCompleted is false', () => {
    render(<ClearCompleted hasCompleted={false} onClear={() => {}} />);
    expect(screen.getByRole('button', { name: 'Hapus Semua Selesai' })).toBeDisabled();
  });

  it('button is enabled and calls onClear when hasCompleted is true', async () => {
    const onClear = vi.fn();
    render(<ClearCompleted hasCompleted={true} onClear={onClear} />);

    const button = screen.getByRole('button', { name: 'Hapus Semua Selesai' });
    expect(button).toBeEnabled();

    await userEvent.click(button);
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
