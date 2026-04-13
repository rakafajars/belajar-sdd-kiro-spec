import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterBar } from './FilterBar';
import { FilterType } from '../../types';

describe('FilterBar', () => {
  const noop = () => {};

  test('renders three filter buttons', () => {
    render(<FilterBar currentFilter="all" onFilterChange={noop} />);
    expect(screen.getByText('Semua')).toBeInTheDocument();
    expect(screen.getByText('Belum Selesai')).toBeInTheDocument();
    expect(screen.getByText('Selesai')).toBeInTheDocument();
  });

  test('marks the active filter button based on currentFilter', () => {
    const { rerender } = render(<FilterBar currentFilter="all" onFilterChange={noop} />);
    expect(screen.getByText('Semua')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Belum Selesai')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Selesai')).toHaveAttribute('aria-pressed', 'false');

    rerender(<FilterBar currentFilter="active" onFilterChange={noop} />);
    expect(screen.getByText('Semua')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Belum Selesai')).toHaveAttribute('aria-pressed', 'true');

    rerender(<FilterBar currentFilter="completed" onFilterChange={noop} />);
    expect(screen.getByText('Selesai')).toHaveAttribute('aria-pressed', 'true');
  });

  test('calls onFilterChange with "all" when Semua is clicked', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<FilterBar currentFilter="active" onFilterChange={onFilterChange} />);
    await user.click(screen.getByText('Semua'));
    expect(onFilterChange).toHaveBeenCalledWith('all' satisfies FilterType);
  });

  test('calls onFilterChange with "active" when Belum Selesai is clicked', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<FilterBar currentFilter="all" onFilterChange={onFilterChange} />);
    await user.click(screen.getByText('Belum Selesai'));
    expect(onFilterChange).toHaveBeenCalledWith('active' satisfies FilterType);
  });

  test('calls onFilterChange with "completed" when Selesai is clicked', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<FilterBar currentFilter="all" onFilterChange={onFilterChange} />);
    await user.click(screen.getByText('Selesai'));
    expect(onFilterChange).toHaveBeenCalledWith('completed' satisfies FilterType);
  });
});
