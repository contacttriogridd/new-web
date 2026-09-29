import { useEffect, useRef, type CSSProperties } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { usePrefersReducedMotion } from '@/hooks/useMotion';

type Point = { title: string; body: string };

/**
 * Numbered steps that appear one after another, joined by a line that draws
 * itself as the reader scrolls; each dot fills in once the line reaches it.
 */
export default function ApproachSteps({ points }: { points: Point[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const fill = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.75;
      const progress = reduced ? 1 : Math.min(1, Math.max(0, (start - rect.top) / rect.height));
      if (fill.current) fill.current.style.transform = `scaleY(${progress})`;
      dots.current.forEach((dot, i) => {
        if (!dot) return;
        const threshold = points.length > 1 ? (i / (points.length - 1)) * 0.92 : 0;
        dot.classList.toggle('is-reached', progress >= threshold && progress > 0);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, points.length, reduced]);

  return (
    <div ref={ref} className="relative mt-8">
      {/* connecting line: faint track + fill that grows with scroll */}
      <div aria-hidden="true" className="absolute bottom-6 left-3.5 top-4 w-px -translate-x-1/2 bg-plum-900/15">
        <div ref={fill} className="steps-fill h-full w-full bg-plum-800" />
      </div>

      <ol className="space-y-5">
        {points.map((point, i) => (
          <li
            key={point.title}
            className={`step flex gap-4 ${visible ? 'is-visible' : ''}`}
            style={{ '--step-delay': `${i * 180}ms` } as CSSProperties}
          >
            <div
              ref={(node) => {
                dots.current[i] = node;
              }}
              className="step-dot relative z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-plum-900/30 bg-plum-300 text-plum-900"
            >
              <span className="font-serif text-xs">{i + 1}</span>
            </div>
            <div className="step-body">
              <h4 className="text-sm font-semibold text-plum-900">{point.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-plum-900/85">{point.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
