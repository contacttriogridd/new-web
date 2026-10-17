import { useEffect, useRef, useState } from 'react';

export default function ScrollSanctuary() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  return (
    <section ref={sectionRef} className="sanctuary-scroll relative h-[280vh] bg-[#f5faf1]" style={{ '--sanctuary-progress': progress } as React.CSSProperties}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,#fffdf7_0%,#e9f2e0_42%,#dce9d8_100%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="max-w-md">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-plum-700"><span className="h-px w-8 bg-plum-400" /> A space to come home to</p>
            <h2 className="font-serif text-5xl font-light leading-[0.98] text-plum-950 sm:text-6xl">Let calm <em className="text-plum-700">take shape.</em></h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-plum-900/70">Keep scrolling. Watch a small sanctuary unfold—one breath, one layer, one gentle choice at a time.</p>
            <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-plum-700/70"><span className="h-8 w-px bg-plum-400/60" /><span>{progress < .34 ? 'Creating space' : progress < .68 ? 'Finding stillness' : 'Returning inward'}</span></div>
          </div>
          <div className="sanctuary-stage relative mx-auto aspect-[1.12] w-full max-w-2xl" aria-label="A meditation sanctuary building as you scroll">
            <div className="sanctuary-sun" /><div className="sanctuary-haze sanctuary-haze-one" /><div className="sanctuary-haze sanctuary-haze-two" /><div className="sanctuary-mountain mountain-back" /><div className="sanctuary-mountain mountain-front" /><div className="sanctuary-ground" /><div className="sanctuary-platform" />
            <div className="sanctuary-tree tree-left"><span /><i /><b /></div><div className="sanctuary-tree tree-right"><span /><i /><b /></div><div className="sanctuary-tree tree-center"><span /><i /><b /></div>
            <div className="sanctuary-stone stone-one" /><div className="sanctuary-stone stone-two" /><div className="sanctuary-stone stone-three" /><div className="sanctuary-lotus"><span /><i /><b /></div>
            <div className="meditator"><div className="meditator-glow" /><div className="meditator-head" /><div className="meditator-body" /><div className="meditator-arm meditator-arm-left" /><div className="meditator-arm meditator-arm-right" /><div className="meditator-leg meditator-leg-left" /><div className="meditator-leg meditator-leg-right" /></div>
            <div className="sanctuary-caption"><span className="caption-line" /> inhale</div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.2em] text-plum-700/60 sm:flex"><span className="h-px w-10 bg-plum-400/60" /> Scroll to build your pause <span className="h-px w-10 bg-plum-400/60" /></div>
      </div>
    </section>
  );
}
