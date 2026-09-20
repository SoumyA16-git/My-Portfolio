import React from 'react';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Grid: React.FC<GridProps> = ({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component className={`studio-grid ${className}`} {...props}>
      {children}
    </Component>
  );
};

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`w-full max-w-[1696px] mx-auto px-[var(--margin)] ${className}`}>
      {children}
    </div>
  );
};
