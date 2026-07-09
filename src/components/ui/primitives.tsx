// ============================================
// 🧱  Walking The World Anime — UI Primitives
// ============================================
import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

// --- BUTTON ---
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: ReactNode;
}

const btnBase =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius-md)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const btnVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]',
  secondary:
    'bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]',
  ghost:
    'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]',
  accent:
    'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-glow-blue)]',
  outline:
    'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white',
};

const btnSizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = `${btnBase} ${btnVariants[variant]} ${btnSizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

// --- BADGE ---
type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  href?: string;
  children: ReactNode;
  className?: string;
}

const badgeBase = 'inline-flex items-center font-semibold rounded-full transition-colors duration-200';

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]',
  primary: 'bg-[var(--color-primary)] text-white',
  accent: 'bg-[var(--color-accent)] text-white',
  success: 'bg-emerald-600 text-white',
  warning: 'bg-amber-600 text-white',
  outline:
    'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-[0.7rem]',
  md: 'px-3 py-1 text-xs',
};

export function Badge({
  variant = 'default',
  size = 'sm',
  href,
  className = '',
  children,
}: BadgeProps) {
  const classes = `${badgeBase} ${badgeVariants[variant]} ${badgeSizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`${classes} hover:opacity-90`}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}

// --- CARD ---
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'section';
  onClick?: () => void;
}

const cardPaddings = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  as: Component = 'div',
  onClick,
}: CardProps) {
  const baseClasses =
    'bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden';
  const hoverClasses = hover ? 'card-hover cursor-pointer' : '';

  return (
    <Component
      className={`${baseClasses} ${hoverClasses} ${cardPaddings[padding]} ${className}`}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

// --- SKELETON ---
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
}: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-[var(--radius-md)]',
    card: 'rounded-[var(--radius-lg)] h-64',
  };

  return (
    <div
      className={`animate-shimmer ${variantClasses[variant]} ${className}`}
      style={{ width: width || '100%', height: height || undefined }}
    />
  );
}

// --- SECTION HEADING ---
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  href?: string;
  className?: string;
  icon?: string;
}

export function SectionHeading({
  title,
  subtitle,
  href,
  className = '',
  icon,
}: SectionHeadingProps) {
  return (
    <div className={`flex items-end justify-between mb-6 ${className}`}>
      <div>
        <h2 className="text-2xl lg:text-3xl font-display font-bold flex items-center gap-3 text-[var(--color-text-primary)]">
          {icon && <span className="text-2xl">{icon}</span>}
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-[var(--color-text-tertiary)] mt-1">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors whitespace-nowrap"
        >
          Ver todo →
        </Link>
      )}
    </div>
  );
}

// --- PAGINATION ---
export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Paginación">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-semibold hover:border-[var(--color-primary)] transition-colors"
        >
          ← Anterior
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`w-10 h-10 flex items-center justify-center rounded-[var(--radius-md)] text-sm font-semibold transition-colors ${
            page === currentPage
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-semibold hover:border-[var(--color-primary)] transition-colors"
        >
          Siguiente →
        </Link>
      )}
    </nav>
  );
}

// --- DIVIDER ---
export function Divider({ className = '' }: { className?: string }) {
  return <hr className={`border-[var(--color-border)] ${className}`} />;
}

// --- TOOLTIP (simplified) ---
export function Tooltip({
  content,
  children,
}: {
  content: string;
  children: ReactNode;
}) {
  return (
    <div className="relative group inline-flex">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] text-xs rounded-[var(--radius-sm)] border border-[var(--color-border)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-[var(--shadow-lg)]">
        {content}
      </div>
    </div>
  );
}
