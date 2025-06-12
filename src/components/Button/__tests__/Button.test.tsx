import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_DANGER,
  COLOR_DEFAULT,
} from '../constants';
import { vi } from 'vitest';

describe('Button component', () => {
  it('renders the button with text', () => {
    render(<Button text="Click Me" />);
    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn(); 
    render(<Button text="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct default color class', () => {
    render(<Button text="Test" />);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/from-purple-700/);
  });
    it('applies the default color variant', () => {
    render(<Button text="Test" color={COLOR_DEFAULT} />);
    expect(screen.getByRole('button').className).toMatch(/from-purple-700/);
  });

  it('applies the primary color variant', () => {
    render(<Button text="Test" color={COLOR_PRIMARY} />);
    expect(screen.getByRole('button').className).toMatch(/from-blue-600/);
  });

  it('applies the secondary color variant', () => {
    render(<Button text="Test" color={COLOR_SECONDARY} />);
    expect(screen.getByRole('button').className).toMatch(/from-gray-200/);
  });

  it('applies the danger color variant', () => {
    render(<Button text="Test" color={COLOR_DANGER} />);
    expect(screen.getByRole('button').className).toMatch(/from-rose-500/);
  });

  it('disables ripple when ripple={false}', () => {
    render(<Button text="No Ripple" ripple={false} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(btn.querySelector('span')).not.toBeInTheDocument();
  });

  it('adds ripple span on click when enabled', () => {
    render(<Button text="Ripple On" ripple />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(btn.querySelector('span')).toBeInTheDocument();
  });
});
