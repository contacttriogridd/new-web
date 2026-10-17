import { Quote } from 'lucide-react';
import { Reveal } from '@/hooks/useReveal';
import TiltCard from '@/components/fx/TiltCard';
import AmbientBlobs from '@/components/fx/AmbientBlobs';

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
    <section id="testimonials" className="relative overflow-hidden bg-lavender-50/72 py-24 lg:py-32">
      <AmbientBlobs tone="light" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest-2 text-lavender-600">
            <span className="h-px w-8 bg-lavender-500" />
            Testimonials
            <span className="h-px w-8 bg-lavender-500" />
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
              <TiltCard className="rounded-3xl" max={4}>
              <figure className="group flex h-full flex-col rounded-3xl border border-lavender-200/60 bg-ivory-50 p-8 shadow-sm">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-lavender-100 transition-colors duration-300 group-hover:bg-gold-400/15">
                  <Quote className="h-5 w-5 text-lavender-600 transition-colors duration-300 group-hover:text-gold-500" strokeWidth={1.5} />
                </div>
                <blockquote className="flex-1 text-base leading-relaxed text-ink/75">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-6 border-t border-lavender-200/60 pt-5">
                  <p className="font-serif text-lg font-medium text-plum-800">{t.name}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-lavender-600">{t.role}</p>
                </figcaption>
              </figure>
              </TiltCard>
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
