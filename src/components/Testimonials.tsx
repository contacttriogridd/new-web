import { Quote } from 'lucide-react';
import { Reveal } from '@/hooks/useReveal';

const testimonials = [
  {
    text: "Working with Nisha transformed not just my digestion, but my entire relationship with food. She helped me understand what my body was telling me. Six months later, I feel like a completely different person.",
    name: 'Anonymous Client',
    role: 'Gut Health Programme',
  },
  {
    text: "After years of hormonal imbalance and feeling unheard, Nisha's holistic approach was the first thing that truly helped. She listened. She didn't just hand me a plan — she walked the journey with me.",
    name: 'Anonymous Client',
    role: 'Hormone Health Consultation',
  },
  {
    text: "Our team's wellness seminar with Nisha was eye-opening. She brought a calm, practical wisdom that resonated with everyone. Several colleagues reached out to her afterwards for one-on-one sessions.",
    name: 'Corporate Client',
    role: 'Wellness Seminar',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-sage-50 py-24 lg:py-32">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-gold-400/5 blur-3xl" />
      <div className="absolute right-0 bottom-20 h-96 w-96 rounded-full bg-sage-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest-2 text-sage-600">
            <span className="h-px w-8 bg-sage-500" />
            Testimonials
            <span className="h-px w-8 bg-sage-500" />
          </span>
          <h2 className="mt-5 font-serif text-3xl font-light leading-tight text-plum-800 sm:text-4xl lg:text-5xl">
            Stories of transformation
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/70">
            Real journeys of people who chose to align their mind, body and soul.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure className="group flex h-full flex-col rounded-3xl border border-sage-200/60 bg-ivory-100 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-sage-900/10 hover:-translate-y-1">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 transition-colors duration-300 group-hover:bg-gold-400/15">
                  <Quote className="h-5 w-5 text-sage-600 transition-colors duration-300 group-hover:text-gold-500" strokeWidth={1.5} />
                </div>
                <blockquote className="flex-1 text-base leading-relaxed text-ink/75">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-6 border-t border-sage-200/60 pt-5">
                  <p className="font-serif text-lg font-medium text-plum-800">{t.name}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-sage-600">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className="mt-10 text-center text-xs text-ink/40">
            Testimonials shown are sample text. Real client testimonials will replace
            these upon receipt of client-approved content.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
