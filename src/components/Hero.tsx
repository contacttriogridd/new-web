import { ArrowRight, Phone } from 'lucide-react';
import HeroRotator from './HeroRotator';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-plum-800"
    >
      <div className="absolute inset-0">
        <HeroRotator className="opacity-25" showDots={false} />
        <div className="absolute inset-0 bg-gradient-to-r from-plum-900 via-plum-800/90 to-plum-800/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-900 via-transparent to-plum-900/40" />
      </div>

      <div className="absolute right-8 top-32 hidden h-72 w-72 rounded-full bg-sage-400/10 blur-3xl lg:block" />
      <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-gold-400/5 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-20 lg:px-8">
        <div className="max-w-3xl">
          <div className="animate-fade-down">
            <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest-2 text-gold-400">
              <span className="h-px w-8 bg-gold-400" />
              Integrative Health Coach
            </span>
          </div>

          <h1
            className="mt-6 animate-fade-up font-serif text-4xl font-light leading-[1.15] text-ivory-100 text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ animationDelay: '0.15s', opacity: 0 }}
          >
            Happy inside is
            <br />
            <span className="italic text-gold-400">healthy outside</span>
          </h1>

          <p
            className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-ivory-200/80"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            I'm Nisha Singla — a certified integrative nutrition health coach
            specialising in gut and hormone health. Together, we'll align your
            mind, body and soul for lasting wellness, not quick fixes.
          </p>

          <div
            className="mt-10 flex animate-fade-up flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: '0.45s', opacity: 0 }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-8 py-4 text-base font-semibold text-plum-900 transition-all duration-300 hover:bg-gold-300 hover:shadow-xl hover:shadow-gold-400/25"
            >
              Enquire Now
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory-200/30 px-8 py-4 text-base font-medium text-ivory-100 transition-all duration-300 hover:border-gold-400 hover:text-gold-400"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              Contact Me
            </a>
          </div>

          <div
            className="mt-16 flex animate-fade-up items-center gap-8"
            style={{ animationDelay: '0.6s', opacity: 0 }}
          >
            <div>
              <p className="font-serif text-3xl font-light text-gold-400">5+</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ivory-200/60">
                Years Coaching
              </p>
            </div>
            <div className="h-12 w-px bg-ivory-200/20" />
            <div>
              <p className="font-serif text-3xl font-light text-gold-400">IIN</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ivory-200/60">
                Certified Coach
              </p>
            </div>
            <div className="h-12 w-px bg-ivory-200/20" />
            <div>
              <p className="font-serif text-3xl font-light text-gold-400">Global</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ivory-200/60">
                Online Sessions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-ivory-200/30 pt-2">
          <div className="h-2 w-1 animate-float-slow rounded-full bg-gold-400" />
        </div>
      </div>
    </section>
  );
}
