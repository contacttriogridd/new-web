import { Component, lazy, Suspense, useState, type CSSProperties, type ReactNode } from 'react';
import {
  supportsWebGL,
  useFinePointer,
  useMediaQuery,
  usePrefersReducedMotion,
} from '@/hooks/useMotion';
import { HERO_PORTRAIT, HERO_PORTRAIT_ALT } from '@/components/hero/heroAssets';

// three.js only downloads on devices that actually render the 3D scene
const HeroScene = lazy(() => import('@/components/hero/HeroScene'));

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function LeafMark({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 32" className={className} style={style} aria-hidden="true">
      <path d="M12 1C20 7 21 19 12 31C3 19 4 7 12 1Z" fill="currentColor" />
      <path d="M12 6V27" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
    </svg>
  );
}

/** Lightweight CSS-3D version of the hero composition for phones and reduced motion. */
function CssComposition({ animated }: { animated: boolean }) {
  const float = animated ? 'css-float' : '';
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className={`absolute inset-[4%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7),rgba(255,255,255,0)_68%)] ${animated ? 'css-breathe' : ''}`} />
      <div className="morph-blob absolute right-[4%] top-[8%] h-[34%] w-[34%] bg-plum-200/80" />

      <div className="absolute inset-x-[19%] inset-y-[12%]">
        <div className={`h-full w-full ${float}`} style={{ animationDuration: '9s' }}>
          <div className="arch-frame h-full w-full rounded-t-full p-[6%]">
            <div className="relative h-full w-full overflow-hidden rounded-t-full">
              <img src={HERO_PORTRAIT} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-600/35 via-transparent to-ivory-100/10" />
            </div>
          </div>
        </div>
      </div>

      {/* zen pebbles */}
      <div className="absolute bottom-[8%] left-[8%] w-[22%]">
        <div className={float} style={{ animationDuration: '11s' }}>
          <div className="pebble mx-auto h-3 w-[55%] bg-plum-300" />
          <div className="pebble mx-auto -mt-0.5 h-4 w-[75%] bg-lavender-200" />
          <div className="pebble -mt-1 h-6 w-full bg-plum-50" />
        </div>
      </div>

      <span className={`css-orb right-[9%] top-[46%] h-[11%] w-[11%] ${float}`} style={{ animationDuration: '8s' }} />
      <span className={`css-orb left-[12%] top-[20%] h-[6%] w-[6%] ${float}`} style={{ animationDuration: '10s', animationDelay: '-3s' }} />
      <span className={`css-orb bottom-[10%] right-[24%] h-[7%] w-[7%] ${float}`} style={{ animationDuration: '9s', animationDelay: '-5s' }} />

      <LeafMark className={`absolute right-[10%] top-[18%] w-[8%] text-[#A9C89A] ${animated ? 'css-drift' : ''}`} style={{ rotate: '35deg' }} />
      <LeafMark className={`absolute left-[7%] top-[52%] w-[6%] text-[#C7DDBA] ${animated ? 'css-drift' : ''}`} style={{ rotate: '-40deg', animationDelay: '-6s' }} />
    </div>
  );
}

export default function HeroVisual() {
  const reduced = usePrefersReducedMotion();
  const tabletUp = useMediaQuery('(min-width: 768px)');
  const desktop = useMediaQuery('(min-width: 1024px)');
  const finePointer = useFinePointer();
  const [webgl] = useState(supportsWebGL);
  const use3D = tabletUp && webgl && !reduced;

  return (
    <div className="hero-visual relative mx-auto aspect-[4/5] w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[520px]">
      <span className="sr-only">{HERO_PORTRAIT_ALT}</span>
      <div
        aria-hidden="true"
        className="absolute bottom-[7%] left-1/2 h-8 w-[60%] -translate-x-1/2 rounded-[50%] bg-plum-900/25 blur-2xl"
      />
      {use3D ? (
        <SceneBoundary fallback={<CssComposition animated />}>
          <Suspense fallback={null}>
            <HeroScene quality={desktop ? 'high' : 'low'} interactive={finePointer && desktop} />
          </Suspense>
        </SceneBoundary>
      ) : (
        <CssComposition animated={!reduced} />
      )}
    </div>
  );
}
