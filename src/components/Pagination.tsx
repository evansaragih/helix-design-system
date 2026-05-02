import { forwardRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  total: number;
  pageSize?: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
}

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

function buildPages(current: number, total: number, siblings: number): (number | '...')[] {
  const totalPages = total;
  if (totalPages <= 7) return range(1, totalPages);

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, totalPages);

  const showLeft = leftSibling > 2;
  const showRight = rightSibling < totalPages - 1;

  if (!showLeft && showRight) {
    const leftItems = range(1, 3 + siblings * 2);
    return [...leftItems, '...', totalPages];
  }
  if (showLeft && !showRight) {
    const rightItems = range(totalPages - 2 - siblings * 2, totalPages);
    return [1, '...', ...rightItems];
  }
  return [1, '...', ...range(leftSibling, rightSibling), '...', totalPages];
}

function PageBtn({
  children, active, disabled, onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const bg = active
    ? 'var(--color-brand-primary, #F57E20)'
    : disabled
    ? 'transparent'
    : hovered
    ? 'var(--color-container-tertiary, #EEEEEE)'
    : 'transparent';

  const color = active
    ? '#FFFFFF'
    : disabled
    ? 'var(--color-text-muted, #9F9F9F)'
    : 'var(--color-text-secondary, #49494A)';

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 32,
        height: 32,
        padding: '0 6px',
        borderRadius: 6,
        border: active ? 'none' : '1px solid transparent',
        backgroundColor: bg,
        color,
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: 'Rubik, sans-serif',
        fontWeight: active ? 500 : 400,
        fontSize: 13,
        lineHeight: '19.2px',
        letterSpacing: '-0.01px',
        outline: 'none',
        transition: 'background-color 0.15s, color 0.15s',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(({
  total,
  pageSize = 10,
  page: controlledPage,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  style,
  className,
  ...props
}, ref) => {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const isControlled = controlledPage !== undefined;
  const current = Math.min(Math.max(isControlled ? controlledPage! : internalPage, 1), totalPages);

  const go = (p: number) => {
    const next = Math.min(Math.max(p, 1), totalPages);
    if (!isControlled) setInternalPage(next);
    onPageChange?.(next);
  };

  const pages = buildPages(current, totalPages, siblingCount);

  return (
    <div
      ref={ref}
      role="navigation"
      aria-label="Pagination"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, ...style }}
      className={className}
      {...props}
    >
      <PageBtn disabled={current <= 1} onClick={() => go(current - 1)}>
        <ChevronLeft size={14} strokeWidth={2} />
      </PageBtn>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, color: 'var(--color-text-muted, #9F9F9F)',
          }}>
            <MoreHorizontal size={14} />
          </span>
        ) : (
          <PageBtn key={p} active={p === current} onClick={() => go(p as number)}>
            {p}
          </PageBtn>
        )
      )}

      <PageBtn disabled={current >= totalPages} onClick={() => go(current + 1)}>
        <ChevronRight size={14} strokeWidth={2} />
      </PageBtn>
    </div>
  );
});

Pagination.displayName = 'Pagination';
