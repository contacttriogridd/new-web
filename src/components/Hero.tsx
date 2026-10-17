import { ArrowRight, Phone } from 'lucide-react';
import HeroRotator from './HeroRotator';
import HeroVisual from '@/components/hero/HeroVisual';
import HeroBackdrop from '@/components/hero/HeroBackdrop';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[radial-gradient(circle_at_50%_10%,#d7c9eb_0%,#b8a7db_46%,#a898ce_100%)]"
    >
      <HeroBackdrop />
      <div className="absolute inset-0">
        <HeroRotator className="opacity-[0.08] mix-blend-soft-light" showDots={false} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#b8a7db]/75 via-[#b8a7db]/35 to-[#b8a7db]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#a898ce]/80 via-transparent to-white/10" />
      </div>

      <div className="ambient-blob right-8 top-32 hidden h-72 w-72 bg-white/30 lg:block" style={{ animationDuration: '30s' }} />
      <div className="ambient-blob bottom-20 left-0 h-96 w-96 bg-white/30" style={{ animationDuration: '34s', animationDelay: '-12s' }} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pt-32 pb-20 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-3xl lg:col-span-7">
          <div className="animate-fade-down">
            <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest-2 text-plum-800">
              <span className="h-px w-8 bg-plum-800" />
              Integrative Health Coach
            </span>
          </div>

          <h1
            className="mt-6 animate-fade-up font-serif text-4xl font-light leading-[1.15] text-plum-900 text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ animationDelay: '0.15s', opacity: 0 }}
          >
            <span className="hero-title-line">Happy inside is</span>
            <span className="hero-title-line hero-title-line--accent italic text-plum-800">healthy outside</span>
          </h1>

          <p
            className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-plum-900/85"
            style={{ animationDelay: '0.35s', opacity: 0 }}
          >
            I'm Nisha Singla — a certified integrative nutrition health coach
            specialising in gut and hormone health. Together, we'll align your
            mind, body and soul for lasting wellness, not quick fixes.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="btn-3d group inline-flex animate-fade-up items-center justify-center gap-2 rounded-full bg-plum-800 px-8 py-4 text-base font-semibold text-white hover:bg-plum-900"
              style={{ animationDelay: '0.5s', opacity: 0 }}
            >
              Enquire Now
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="btn-soft inline-flex animate-fade-up items-center justify-center gap-2 rounded-full border border-plum-900/30 px-8 py-4 text-base font-medium text-plum-900 hover:border-plum-800 hover:bg-white/25 hover:text-plum-950"
              style={{ animationDelay: '0.62s', opacity: 0 }}
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              Contact Me
            </a>
          </div>

          <div
            className="mt-16 flex animate-fade-up items-center gap-6 sm:gap-8"
            style={{ animationDelay: '0.8s', opacity: 0 }}
          >
            <div>
              <p className="font-serif text-3xl font-light text-plum-800">5+</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-plum-900/85">
                Years Coaching
              </p>
            </div>
            <div className="h-12 w-px bg-plum-900/20" />
            <div>
              <p className="font-serif text-3xl font-light text-plum-800">IIN</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-plum-900/85">
                Certified Coach
              </p>
            </div>
            <div className="h-12 w-px bg-plum-900/20" />
            <div>
              <p className="font-serif text-3xl font-light text-plum-800">Global</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-plum-900/85">
                Online Sessions
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-plum-900/30 pt-2">
          <div className="h-2 w-1 animate-float-slow rounded-full bg-plum-800" />
        </div>
      </div>
    </section>
  );
}
