import { useEffect, useRef, type ReactNode } from 'react';
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMotion';

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of the scroll offset to drift by; positive moves slower than the page. */
  speed?: number;
};

/** Scroll-linked drift so an element moves at a slightly different pace than its surroundings. */
export default function Parallax({ children, className = '', speed = 0.08 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const factor = isMobile ? speed * 0.5 : speed;
    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(offset * factor).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) onScroll();
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      el.style.transform = '';
    };
  }, [speed, reduced, isMobile]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
