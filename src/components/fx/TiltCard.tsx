import { useRef, type ReactNode, type PointerEvent } from 'react';
import { useFinePointer, usePrefersReducedMotion } from '@/hooks/useMotion';

type TiltCardProps = {
  children: ReactNode;
  /** Wrapper classes — include the card's rounding (e.g. rounded-2xl) so the sheen matches. */
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
};

/**
 * Soft 3D card: lifts toward the viewer on hover and tilts gently with the
 * cursor. Cursor tracking is disabled on touch devices and for reduced motion.
 */
export default function TiltCard({ children, className = '', max = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const interactive = finePointer && !reduced;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !interactive) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--tilt-x', `${(-py * max).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${(px * max).toFixed(2)}deg`);
      el.style.setProperty('--sheen-x', `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--sheen-y', `${((py + 0.5) * 100).toFixed(1)}%`);
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-card group/tilt relative h-full ${interactive ? 'is-interactive' : ''} ${className}`}
    >
      {children}
      {interactive && <span aria-hidden="true" className="tilt-sheen" />}
    </div>
  );
}
