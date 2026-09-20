import React from 'react';

interface RuleProps {
  className?: string;
  strong?: boolean;
}

export const Rule: React.FC<RuleProps> = ({ className = '', strong = false }) => {
  return (
    <hr
      className={`w-full border-0 border-t ${
        strong ? 'border-[var(--color-border-strong)]' : 'border-[var(--color-border)]'
      } ${className}`}
      aria-hidden="true"
    />
  );
};
