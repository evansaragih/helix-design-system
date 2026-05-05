import { forwardRef, useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselItem {
  id: string | number;
  content: React.ReactNode;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  /** Number of visible slides */
  visibleCount?: 1 | 2 | 3 | 4;
  /** Auto-advance interval in ms (0 = disabled) */
  autoPlay?: number;
  showArrows?: boolean;
  showDots?: boolean;
  gap?: number;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(({
  items,
  visibleCount = 1,
  autoPlay = 0,
  showArrows = true,
  showDots = true,
  gap = 16,
  style,
  ...props
}, ref) => {
  const [current, setCurrent] = useState(0);
  const maxIndex = Math.max(0, items.length - visibleCount);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => { setCurrent(c => (c >= maxIndex ? 0 : c + 1)); }, [maxIndex]);
  const prev = useCallback(() => { setCurrent(c => (c <= 0 ? maxIndex : c - 1)); }, [maxIndex]);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setTimeout(next, autoPlay);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [autoPlay, current, next]);

  const slideWidth = `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`;

  return (
    <div
      ref={ref}
      style={{ display: 'flex', flexDirection: 'column', gap: 16, ...style }}
      {...props}
    >
      {/* Track */}
      <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            gap,
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateX(calc(-${current} * (${slideWidth} + ${gap}px)))`,
          }}
        >
          {items.map(item => (
            <div
              key={item.id}
              style={{
                minWidth: slideWidth,
                maxWidth: slideWidth,
                flexShrink: 0,
              }}
            >
              {item.content}
            </div>
          ))}
        </div>

        {/* Arrow buttons */}
        {showArrows && (
          <>
            <button
              onClick={prev}
              disabled={current === 0}
              aria-label="Previous slide"
              style={{
                position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: current === 0 ? 'not-allowed' : 'pointer',
                opacity: current === 0 ? 0.4 : 1,
                zIndex: 10,
              }}
            >
              <ChevronLeft size={18} color="#14141E" />
            </button>
            <button
              onClick={next}
              disabled={current >= maxIndex}
              aria-label="Next slide"
              style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: current >= maxIndex ? 'not-allowed' : 'pointer',
                opacity: current >= maxIndex ? 0.4 : 1,
                zIndex: 10,
              }}
            >
              <ChevronRight size={18} color="#14141E" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {showDots && maxIndex > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: i === current
                  ? 'var(--color-brand-primary, #F57E20)'
                  : 'var(--color-stroke-subtle, #EEEEEE)',
                transition: 'width 0.3s ease, background-color 0.2s',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
});

Carousel.displayName = 'Carousel';
