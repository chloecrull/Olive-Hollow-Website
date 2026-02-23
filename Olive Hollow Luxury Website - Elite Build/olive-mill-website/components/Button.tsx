'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const base =
    'px-6 py-3 rounded-full font-semibold tracking-wide transition-colors duration-300 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';
  const styles =
    variant === 'primary'
      ? 'bg-goldAccent text-olivePrimary hover:bg-oliveSecondary hover:text-creamBackground'
      : 'border border-goldAccent text-goldAccent hover:bg-goldAccent hover:text-olivePrimary';

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
