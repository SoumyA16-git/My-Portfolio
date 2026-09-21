import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface TextLinkProps {
  href?: string;
  to?: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  'aria-label'?: string;
}

export const TextLink: React.FC<TextLinkProps> = ({
  href,
  to,
  children,
  external = false,
  className = '',
  onClick,
  'aria-label': ariaLabel
}) => {
  const commonClasses = `inline-flex items-center gap-1.5 draw-underline text-[var(--color-fg)] hover:text-[var(--color-fg)] transition-colors duration-200 ${className}`;

  if (to) {
    return (
      <RouterLink
        to={to}
        className={commonClasses}
        onClick={onClick}
        aria-label={ariaLabel}
        data-cursor="link"
      >
        <span>{children}</span>
      </RouterLink>
    );
  }

  if (href) {
    const isExternal = external || href.startsWith('http') || href.startsWith('mailto:');
    return (
      <a
        href={href}
        className={commonClasses}
        onClick={onClick}
        aria-label={ariaLabel}
        data-cursor="link"
        {...(isExternal && !href.startsWith('mailto:')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        <span>{children}</span>
        {isExternal && !href.startsWith('mailto:') && (
          <span className="text-[0.75em] leading-none" aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={commonClasses}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor="link"
    >
      <span>{children}</span>
    </button>
  );
};
