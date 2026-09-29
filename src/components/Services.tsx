import {
  Clock,
  Calendar,
  MessageCircle,
  Mail,
  Phone,
  Video,
  Brain,
  Heart,
  Building2,
  Mic,
  GraduationCap,
  Podcast,
  ArrowRight,
} from 'lucide-react';
import { Reveal } from '@/hooks/useReveal';

const corporateImage =
  'https://images.pexels.com/photos/8761541/pexels-photo-8761541.jpeg?auto=compress&cs=tinysrgb&w=900';

const consultationFeatures = [
  { icon: Video, label: 'Online 1-on-1 Sessions', desc: 'Face-to-face from anywhere in the world' },
  { icon: Heart, label: 'Holistic Wellness', desc: 'Nutrition, lifestyle and gut health' },
  { icon: Brain, label: 'Mental Wellness', desc: 'Stress, sleep and emotional balance' },
];

const bookingOptions = [
  { icon: Calendar, label: 'Online Calendar' },
  { icon: MessageCircle, label: 'WhatsApp' },
  { icon: Mail, label: 'Email' },
  { icon: Phone, label: 'Phone Call' },
];

const speakingRoles = [
  { icon: Building2, label: 'Corporate Wellness Consulting' },
  { icon: Mic, label: 'Seminars & Corporate Talks' },
  { icon: GraduationCap, label: 'Guest Lecturer' },
  { icon: Podcast, label: 'Podcast Guest' },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-ivory-200/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest-2 text-sage-600">
            <span className="h-px w-8 bg-sage-500" />
            Services
            <span className="h-px w-8 bg-sage-500" />
          </span>
          <h2 className="mt-5 font-serif text-3xl font-light leading-tight text-plum-800 sm:text-4xl lg:text-5xl">
            How we can work together
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/70">
            Whether you're seeking personal transformation or looking to bring
            holistic wellness into your organisation, there's a path tailored for you.
          </p>
        </Reveal>

        {/* Private Consultations — Primary */}
        <Reveal delay={100}>
          <div className="mt-16 overflow-hidden rounded-3xl bg-plum-800 shadow-2xl shadow-plum-900/20">
            <div className="grid lg:grid-cols-5">
              <div className="relative lg:col-span-2 min-h-[280px] lg:min-h-full">
                <img
                  src="https://images.pexels.com/photos/6958062/pexels-photo-6958062.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Calm yoga pose in natural light"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-900/80 via-plum-800/30 to-transparent lg:bg-gradient-to-r" />
              </div>

              <div className="p-8 lg:col-span-3 lg:p-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400">
                  Primary Service
                </span>
                <h3 className="mt-5 font-serif text-2xl font-light text-ivory-100 sm:text-3xl lg:text-4xl">
                  Private 1-on-1 Consultations
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ivory-200/70">
                  A personalised wellness journey designed around your unique needs.
                  We'll work together on gut health, hormone balance, nutrition and
                  mental wellbeing — aligning your mind, body and soul for lasting
                  change.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {consultationFeatures.map((feat) => (
                    <div
                      key={feat.label}
                      className="rounded-2xl border border-ivory-200/10 bg-plum-700/40 p-4"
                    >
                      <feat.icon className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
                      <p className="mt-3 text-sm font-semibold text-ivory-100">{feat.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-ivory-200/50">{feat.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-ivory-200/10 pt-6">
                  <div className="flex items-center gap-2 text-ivory-200/70">
                    <Clock className="h-5 w-5 text-gold-400" strokeWidth={1.5} />
                    <span className="text-sm">60 or 90-minute sessions</span>
                  </div>
                  <div className="flex items-center gap-2 text-ivory-200/70">
                    <Calendar className="h-5 w-5 text-gold-400" strokeWidth={1.5} />
                    <span className="text-sm">Mon–Fri, 9am–4pm IST</span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-gold-400/10 px-6 py-4">
                  <p className="text-sm text-ivory-200/80">
                    <span className="font-semibold text-gold-400">Starting from</span>{' '}
                    <span className="font-serif text-2xl font-light text-gold-400">
                      ₹[X]
                    </span>
                    <span className="ml-2 text-xs text-ivory-200/50">
                      (fee to be confirmed)
                    </span>
                  </p>
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-xs uppercase tracking-wider text-ivory-200/50">
                    Book your session via
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {bookingOptions.map((opt) => (
                      <span
                        key={opt.label}
                        className="inline-flex items-center gap-2 rounded-full border border-ivory-200/15 px-4 py-2 text-sm text-ivory-200/80 transition-colors hover:border-gold-400/40 hover:text-gold-400"
                      >
                        <opt.icon className="h-4 w-4" strokeWidth={1.5} />
                        {opt.label}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold text-plum-900 transition-all duration-300 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/25"
                >
                  Enquire Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Corporate & Speaking — Secondary */}
        <Reveal delay={150}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-sage-200/60 bg-ivory-100 shadow-lg shadow-sage-900/5">
            <div className="grid lg:grid-cols-5">
              <div className="p-8 lg:col-span-3 lg:p-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sage-700">
                  Speaking & Corporate
                </span>
                <h3 className="mt-5 font-serif text-2xl font-light text-plum-800 sm:text-3xl">
                  Corporate & Speaking Engagements
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink/70">
                  Bringing holistic wellness into the workplace and onto the stage.
                  Nisha partners with MNCs and business families, and is available as
                  a chief guest, panelist, guest lecturer and podcast guest.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {speakingRoles.map((role) => (
                    <div
                      key={role.label}
                      className="flex items-center gap-3 rounded-xl border border-sage-200/60 bg-sage-50/50 px-4 py-3.5 transition-all duration-300 hover:border-gold-400/40 hover:bg-gold-50/30"
                    >
                      <role.icon className="h-5 w-5 shrink-0 text-sage-600" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-plum-800">{role.label}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full border border-plum-700 px-7 py-3.5 text-sm font-semibold text-plum-800 transition-all duration-300 hover:bg-plum-800 hover:text-ivory-100"
                >
                  Enquire Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              <div className="relative lg:col-span-2 min-h-[240px] lg:min-h-full">
                <img
                  src={corporateImage}
                  alt="Professional woman presenting at a business seminar"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ivory-100/60 lg:bg-gradient-to-l" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
