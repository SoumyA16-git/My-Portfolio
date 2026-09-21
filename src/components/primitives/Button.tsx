import React from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  magnetic?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  magnetic = true,
  className = '',
  ...props
}) => {
  const { elementRef, labelRef } = useMagnetic<HTMLButtonElement>({
    maxDisplacement: variant === 'primary' ? 10 : 8
  });

  const baseStyles =
    'relative inline-flex items-center justify-center rounded-full font-medium text-[15px] tracking-tight transition-all duration-300 select-none overflow-hidden';

  const variantStyles = {
    primary:
      'h-12 px-7 bg-[var(--color-fg)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] active:scale-[0.98]',
    outline:
      'h-9 md:h-10 px-6 border border-[var(--color-border-strong)] text-[var(--color-fg)] hover:border-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)]'
  };

  return (
    <button
      ref={magnetic ? elementRef : undefined}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      data-cursor="link"
      {...props}
    >
      <span
        ref={magnetic ? (labelRef as React.RefObject<HTMLSpanElement>) : undefined}
        className="relative z-10 flex items-center justify-center gap-2 pointer-events-none"
      >
        {children}
      </span>
    </button>
  );
};
