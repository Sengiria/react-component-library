import React from 'react';
import clsx from 'clsx';
import type { ButtonProps } from './types';
import './Button.css';
import { BUTTON_COLORS, COLOR_DEFAULT, RIPPLE_COLORS } from './constants';

const Button: React.FC<ButtonProps> = ({
  color = COLOR_DEFAULT,
  text,
  onClick,
  ripple = true,
  className = '',
  type = 'button',
}) => {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || !buttonRef.current) return;

    const rippleEl = document.createElement('span');
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rippleEl.className = 'ripple-effect';
    rippleEl.style.left = `${x}px`;
    rippleEl.style.top = `${y}px`;
    rippleEl.style.background = RIPPLE_COLORS[color] ?? 'rgba(255,255,255,0.4)';

    buttonRef.current.appendChild(rippleEl);

    setTimeout(() => {
      rippleEl.remove();
    }, 700);

    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      type={type}
      className={clsx(
        'relative overflow-hidden px-6 py-3 rounded-full font-medium shadow-md transition-all duration-200 cursor-pointer hover:brightness-110',
        BUTTON_COLORS[color ?? COLOR_DEFAULT],
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;