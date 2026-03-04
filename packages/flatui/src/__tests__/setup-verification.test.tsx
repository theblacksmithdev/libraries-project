import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

// Simple test component to verify the full pipeline
function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial);
  return (
    <div>
      <span data-testid="count">{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

describe('Test Setup Verification', () => {
  it('renders a React component', () => {
    render(<Counter />);
    expect(screen.getByTestId('count')).toBeInTheDocument();
  });

  it('supports jest-dom matchers', () => {
    render(<Counter initial={5} />);
    expect(screen.getByTestId('count')).toHaveTextContent('5');
    expect(screen.getByRole('button', { name: 'Increment' })).toBeEnabled();
  });

  it('supports user events', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    expect(screen.getByTestId('count')).toHaveTextContent('0');

    await user.click(screen.getByRole('button', { name: 'Increment' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    await user.click(screen.getByRole('button', { name: 'Increment' }));
    await user.click(screen.getByRole('button', { name: 'Increment' }));
    expect(screen.getByTestId('count')).toHaveTextContent('3');

    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('cleans up between tests (count resets)', () => {
    render(<Counter />);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });
});
