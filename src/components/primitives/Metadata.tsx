import React from 'react';

interface MetadataProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Metadata: React.FC<MetadataProps> = ({
  children,
  className = '',
  as: Component = 'span'
}) => {
  return (
    <Component
      className={`text-meta text-[var(--color-fg-muted)] tracking-[0.04em] ${className}`}
    >
      {children}
    </Component>
  );
};

export const Tag: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <span
      className={`inline-flex items-center h-7 px-3 rounded-full border border-[var(--color-border)] text-meta text-[var(--color-fg-secondary)] ${className}`}
    >
      {children}
    </span>
  );
};
