import {
  GraduationCap,
  Scale,
  Leaf,
  Sparkles,
  Brain,
  Heart,
  Activity,
  ShieldCheck,
  Eye,
  Compass,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { Reveal } from '@/hooks/useReveal';

/* ---- Imagery (premium wellness / therapy-inspired, atmospheric only) ---- */

const portraitImg =
  'https://images.pexels.com/photos/20597100/pexels-photo-20597100.jpeg?auto=compress&cs=tinysrgb&w=900';

const philosophyBg =
  'https://images.pexels.com/photos/6899551/pexels-photo-6899551.jpeg?auto=compress&cs=tinysrgb&w=1200';

const approachImg =
  'https://images.pexels.com/photos/6653897/pexels-photo-6653897.jpeg?auto=compress&cs=tinysrgb&w=900';

const personalImg =
  'https://images.pexels.com/photos/10069875/pexels-photo-10069875.jpeg?auto=compress&cs=tinysrgb&w=900';

const ctaBg =
  'https://images.pexels.com/photos/27544686/pexels-photo-27544686.jpeg?auto=compress&cs=tinysrgb&w=1200';

/* ---- Content ---- */

const credentials = [
  { icon: Scale, label: 'BCom, LLB — Mumbai University' },
  { icon: GraduationCap, label: 'LLM — University of Manchester' },
  { icon: Leaf, label: 'Certified Health Coach — IIN' },
  { icon: Sparkles, label: 'Reiki Healer' },
];

const philosophyPillars = [
  {
    icon: Leaf,
    title: 'Gut Health',
    body: 'The gut shapes mood, immunity and energy. When the gut is nourished, the body follows.',
  },
  {
    icon: Activity,
    title: 'Hormonal Balance',
    body: 'Hormones regulate rhythm — sleep, metabolism, and emotional steadiness. Balance is not a destination; it is a practice.',
  },
  {
    icon: Brain,
    title: 'Emotional Wellbeing',
    body: 'Stress is not something to power through. It is information. Learning to listen is where change begins.',
  },
  {
    icon: Heart,
    title: 'Mind-Body Connection',
    body: 'The body holds what the mind carries. Sustainable health asks us to tend to both — not one at the expense of the other.',
  },
];

const approachPoints = [
  {
    title: 'Understanding the Individual',
    body: 'Every consultation begins with listening. Not to symptoms alone, but to the life around them — routines, pressures, relationships, rhythms.',
  },
  {
    title: 'Root-Cause Thinking',
    body: 'Surface symptoms are rarely the whole story. Nisha looks beneath them to the patterns, deficiencies and stressors that sustain imbalance.',
  },
  {
    title: 'Individualised Strategies',
    body: 'No templates, no protocols handed to everyone. Each wellness plan is built for one person — their body, their context, their goals.',
  },
  {
    title: 'Long-Term Sustainability',
    body: 'The aim is not a quick reset. It is a relationship with health that holds steady years from now — grounded in habits that feel natural, not forced.',
  },
];

const whyClients = [
  {
    icon: Eye,
    title: 'Intentional',
    body: 'Nothing is prescribed by default. Every recommendation has a reason, and that reason is explained.',
  },
  {
    icon: Compass,
    title: 'Personalised',
    body: 'Your plan belongs to you alone. It is shaped around your body, your history and your life — not someone else\u2019s framework.',
  },
  {
    icon: Lock,
    title: 'Private',
    body: 'Consultations are one-to-one and strictly confidential. What is shared in a session stays in the session.',
  },
  {
    icon: Leaf,
    title: 'Holistic',
    body: 'Nutrition, stress, sleep, movement, emotional health — addressed together, because they do not exist in isolation.',
  },
  {
    icon: ShieldCheck,
    title: 'Evidence-Informed',
    body: 'Drawing on integrative nutrition training and continuous study, grounded in respect for the body\u2019s own intelligence.',
  },
  {
    icon: Heart,
    title: 'Client-Centred',
    body: 'You set the direction. Nisha brings the map, the knowledge and the steady presence to help you travel it well.',
  },
];

/* ---- Component ---- */

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ivory-100">
      {/* ================================================================ */}
      {/* Section 1 — Premium Introduction ("Meet Nisha")                  */}
      {/* ================================================================ */}
      <div className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-sage-200/25 blur-3xl" />
        <div className="absolute left-0 bottom-10 h-72 w-72 rounded-full bg-gold-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Portrait */}
            <Reveal className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -left-3 -top-3 h-full w-full rounded-[2rem] border border-gold-400/25" />
                <div className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-plum-900/10">
                  <img
                    src={portraitImg}
                    alt="A serene portrait in soft natural light"
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-900/25 via-transparent to-transparent" />
                </div>
                {/* Credentials pill */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-plum-800 px-5 py-2.5 shadow-lg">
                  <span className="text-xs font-semibold tracking-wide text-ivory-100">
                    IIN Certified · 5+ Years · Global Practice
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Introduction text */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest-2 text-sage-600">
                  <span className="h-px w-8 bg-sage-500" />
                  Meet Nisha
                </span>
              </Reveal>

              <Reveal delay={80}>
                <h2 className="mt-6 font-serif text-3xl font-light leading-[1.2] text-plum-800 sm:text-4xl lg:text-[2.75rem] text-balance">
                  An integrative approach to health,
                  <span className="italic text-sage-600"> rooted in the belief</span> that
                  what happens inside shapes everything outside.
                </h2>
              </Reveal>

              <Reveal delay={160}>
                <div className="mt-7 max-w-xl space-y-4 text-base leading-[1.75] text-ink/80">
                  <p>
                    Nisha Singla is a certified integrative nutrition health coach
                    specialising in gut and hormone health. With over five years of
                    private practice and a background that spans law, integrative
                    nutrition and energy work, she brings an uncommon breadth of
                    perspective to every consultation.
                  </p>
                  <p>
                    Her work sits at the intersection of evidence-informed nutrition
                    and a deeper, more human understanding of wellbeing — one that
                    treats the person, not the symptom.
                  </p>
                </div>
              </Reveal>

              {/* Credentials grid */}
              <Reveal delay={240}>
                <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {credentials.map((cred) => (
                    <div
                      key={cred.label}
                      className="flex items-center gap-3 rounded-xl border border-sage-200/60 bg-sage-50/40 px-4 py-3.5 transition-all duration-300 hover:border-gold-400/40 hover:bg-gold-50/20"
                    >
                      <cred.icon className="h-5 w-5 shrink-0 text-sage-600" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-plum-800">{cred.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Section 2 — Her Philosophy                                        */}
      {/* ================================================================ */}
      <div className="relative overflow-hidden">
        {/* Background image — subtle */}
        <div className="absolute inset-0">
          <img
            src={philosophyBg}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ivory-100/97" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest-2 text-sage-700">
              <span className="h-px w-8 bg-sage-600" />
              Her Philosophy
            </span>
            <h3 className="mt-5 font-serif text-2xl font-light leading-tight text-plum-900 sm:text-3xl lg:text-4xl">
              Health is not one thing.
              <span className="italic text-sage-700"> It is everything, connected.</span>
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-[1.75] text-ink">
              The gut influences mood. Hormones shape energy and sleep. Stress lives in
              the body long before it reaches the mind. Nisha does not treat these as
              separate concerns — she sees them as threads of a single system, each one
              pulling on the others. Lasting wellness comes from understanding how they
              interrelate, and working with that relationship rather than against it.
            </p>
          </Reveal>

          {/* Pillars */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {philosophyPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-ivory-300 bg-ivory-50 p-6 transition-all duration-300 hover:border-gold-400/50 hover:shadow-lg hover:shadow-plum-900/5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 transition-colors duration-300 group-hover:bg-gold-400/15">
                    <pillar.icon className="h-5 w-5 text-sage-700 transition-colors duration-300 group-hover:text-gold-600" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-plum-900">{pillar.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Section 3 — Her Approach                                          */}
      {/* ================================================================ */}
      <div className="relative overflow-hidden bg-plum-800 py-24 lg:py-32">
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-gold-400/8 blur-3xl" />
        <div className="absolute left-0 bottom-10 h-72 w-72 rounded-full bg-sage-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Image panel */}
            <Reveal>
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-plum-950/30">
                  <img
                    src={approachImg}
                    alt="A calm workspace with notebook and tea in warm natural light"
                    className="aspect-[5/4] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-950/30 to-transparent" />
                </div>
                {/* Pull quote */}
                <div className="absolute -bottom-8 -right-4 max-w-xs rounded-2xl bg-ivory-100 px-6 py-5 shadow-xl lg:-right-8">
                  <p className="font-serif text-base font-light italic leading-relaxed text-plum-800">
                    "I work with the person, not the diagnosis. The body is wiser than
                    any label."
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Text + approach points */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest-2 text-ivory-100">
                  <span className="h-px w-8 bg-ivory-100" />
                  Her Approach
                </span>
                <h3 className="mt-5 font-serif text-2xl font-light leading-tight text-ivory-100 sm:text-3xl lg:text-4xl">
                  How she works with clients
                </h3>
                <p className="mt-5 max-w-lg text-base leading-[1.75] text-ivory-100/80">
                  A consultation with Nisha is unhurried, private and entirely built
                  around you. She takes the time to understand the full picture — not
                  just what brought you here, but what surrounds it.
                </p>
              </Reveal>

              <div className="mt-8 space-y-5">
                {approachPoints.map((point, i) => (
                  <Reveal key={point.title} delay={i * 80}>
                    <div className="flex gap-4">
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ivory-100/40">
                        <span className="font-serif text-xs text-ivory-100">{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-ivory-100">{point.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-ivory-100/70">{point.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Section 4 — Why Clients Choose Nisha                              */}
      {/* ================================================================ */}
      <div className="relative overflow-hidden bg-ivory-200/50 py-24 lg:py-32">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-sage-200/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest-2 text-sage-600">
              <span className="h-px w-8 bg-sage-500" />
              Why Clients Choose Nisha
            </span>
            <h3 className="mt-5 font-serif text-2xl font-light leading-tight text-plum-800 sm:text-3xl lg:text-4xl">
              An experience defined by intention,
              <span className="italic text-sage-600"> not convention</span>
            </h3>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyClients.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 80}>
                <div className="group h-full rounded-2xl border border-sage-200/50 bg-ivory-50 p-6 transition-all duration-300 hover:border-gold-400/40 hover:shadow-lg hover:shadow-plum-900/5 hover:-translate-y-0.5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-plum-50 transition-colors duration-300 group-hover:bg-gold-400/12">
                    <item.icon className="h-5 w-5 text-plum-700 transition-colors duration-300 group-hover:text-gold-600" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-plum-800">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Section 5 — Personal Side of Nisha                                */}
      {/* ================================================================ */}
      <div className="relative overflow-hidden bg-ivory-100 py-24 lg:py-32">
        <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] shadow-lg shadow-plum-900/10">
                  <img
                    src={personalImg}
                    alt="A quiet moment of reading by a window in soft natural light"
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-900/15 to-transparent" />
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest-2 text-sage-600">
                  <span className="h-px w-8 bg-sage-500" />
                  The Person
                </span>
                <h3 className="mt-5 font-serif text-2xl font-light leading-tight text-plum-800 sm:text-3xl">
                  Behind the practice
                </h3>
              </Reveal>

              <Reveal delay={100}>
                <div className="mt-6 space-y-4 text-base leading-[1.75] text-ink/80">
                  <p>
                    Nisha lives in Coimbatore, where the pace is slower and the light
                    is generous. She begins her mornings with stillness — a practice
                    she recommends to nearly every client, because she has lived its
                    value herself.
                  </p>
                  <p>
                    Her years in law taught her to think structurally, to ask better
                    questions, and to listen with precision. She carries those instincts
                    into every consultation. Integrative nutrition and Reiki gave her
                    the rest — a framework for understanding the body as something to
                    be nourished, not managed.
                  </p>
                  <p>
                    When she is not with clients, she is reading, walking, or revisiting
                    an idea that a conversation sparked. She finds that the best
                    insights often arrive in the quiet between things.
                  </p>
                </div>
              </Reveal>

              {/* Soft personal detail cards */}
              <Reveal delay={180}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['Coimbatore, India', 'Morning stillness', 'Continuous learner', 'Reiki practitioner'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-sage-200/60 bg-sage-50/50 px-4 py-2 text-xs font-medium tracking-wide text-sage-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Section 6 — Closing CTA                                           */}
      {/* ================================================================ */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={ctaBg}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ivory-100/97" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center lg:py-32">
          <Reveal>
            <div className="mx-auto mb-7 h-px w-16 bg-plum-400" />
            <h3 className="font-serif text-3xl font-light leading-tight text-black sm:text-4xl lg:text-[2.75rem]">
              Begin your personalised
              <span className="italic text-plum-700"> wellness journey</span>
            </h3>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-black/80">
              If you are looking for an approach that is considered, private and built
              entirely around you, Nisha would be glad to talk.
            </p>
            <a
              href="#contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-plum-700 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-plum-600 hover:shadow-xl hover:shadow-plum-900/20"
            >
              Enquire Now
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
