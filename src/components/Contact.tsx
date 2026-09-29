import { useState, type FormEvent } from 'react';
import { MessageCircle, Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/hooks/useReveal';
import AmbientBlobs from '@/components/fx/AmbientBlobs';
import { supabase, type Enquiry } from '@/lib/supabase';

const WHATSAPP_NUMBER = '+919843046611';
const PHONE_DISPLAY = '+91 98430 46611';
const EMAIL = 'neesha.healthcoach@gmail.com';

const serviceOptions = [
  'Private 1-on-1 Consultation',
  'Holistic Wellness Coaching',
  'Mental Wellness Consultation',
  'Corporate Wellness Consulting',
  'Corporate Talk / Seminar',
  'Guest Lecture / Panelist / Podcast',
  'Other',
];

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const enquiry: Enquiry = {
      name: (formData.get('name') as string).trim(),
      email: (formData.get('email') as string).trim(),
      phone: (formData.get('phone') as string)?.trim() || undefined,
      service: formData.get('service') as string,
      message: (formData.get('message') as string)?.trim() || undefined,
    };

    if (!enquiry.name || !enquiry.email || !enquiry.service) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email and the service you are interested in.');
      return;
    }

    if (!supabase) {
      setStatus('error');
      setErrorMessage('The enquiry form is not configured yet. Please contact me via WhatsApp or email.');
      return;
    }

    const { error } = await supabase.from('enquiries').insert(enquiry);

    if (error) {
      setStatus('error');
      setErrorMessage('Something went wrong while sending your enquiry. Please try again or reach out via WhatsApp.');
      return;
    }

    setStatus('success');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-plum-300 py-24 lg:py-32">
      <AmbientBlobs />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest-2 text-plum-800">
            <span className="h-px w-8 bg-plum-800" />
            Contact & Enquiry
            <span className="h-px w-8 bg-plum-800" />
          </span>
          <h2 className="mt-5 font-serif text-3xl font-light leading-tight text-plum-900 sm:text-4xl lg:text-5xl">
            Begin your wellness journey
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-plum-900/85">
            Reach out with any questions about consultations, speaking engagements,
            or simply to say hello. I'd love to hear from you.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-plum-900/15 bg-white/30 p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-plum-800/40 hover:bg-white/50 hover:shadow-lg hover:shadow-plum-900/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/40 transition-colors duration-300 group-hover:bg-white/60">
                  <MessageCircle className="h-5 w-5 text-plum-800" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-plum-900/85">WhatsApp</p>
                  <p className="text-sm font-medium text-plum-900">Chat with me directly</p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-4 rounded-2xl border border-plum-900/15 bg-white/30 p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-plum-800/40 hover:bg-white/50 hover:shadow-lg hover:shadow-plum-900/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/40 transition-colors duration-300 group-hover:bg-white/60">
                  <Mail className="h-5 w-5 text-plum-800" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-plum-900/85">Email</p>
                  <p className="text-sm font-medium text-plum-900">{EMAIL}</p>
                </div>
              </a>

              <a
                href={`tel:${WHATSAPP_NUMBER.replace(/[^0-9+]/g, '')}`}
                className="group flex items-center gap-4 rounded-2xl border border-plum-900/15 bg-white/30 p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-plum-800/40 hover:bg-white/50 hover:shadow-lg hover:shadow-plum-900/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/40 transition-colors duration-300 group-hover:bg-white/60">
                  <Phone className="h-5 w-5 text-plum-800" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-plum-900/85">Phone</p>
                  <p className="text-sm font-medium text-plum-900">{PHONE_DISPLAY}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-plum-900/15 bg-white/30 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/40">
                  <MapPin className="h-5 w-5 text-plum-800" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-plum-900/85">Location</p>
                  <p className="text-sm font-medium text-plum-900">Coimbatore, India</p>
                  <p className="mt-0.5 text-xs text-plum-900/85">Serving clients globally online</p>
                </div>
              </div>

              <div className="mt-auto rounded-2xl border border-plum-800/20 bg-white/30 p-5">
                <p className="flex items-start gap-2 text-xs leading-relaxed text-plum-900/85">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-plum-800" strokeWidth={1.5} />
                  <span>
                    This form is for general enquiries only. If you are in crisis or
                    need urgent medical help, please contact a qualified medical
                    professional or emergency services immediately.
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* Enquiry form */}
          <Reveal delay={100} className="lg:col-span-3">
            <div className="rounded-3xl bg-ivory-100 p-8 shadow-2xl shadow-plum-900/20 lg:p-10">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lavender-100">
                    <CheckCircle2 className="h-8 w-8 text-lavender-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-light text-plum-800">
                    Thank you for reaching out
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">
                    Your enquiry has been received. Nisha will personally get back to
                    you within 1–2 business days.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-soft mt-8 rounded-full border border-plum-700 px-6 py-3 text-sm font-semibold text-plum-800 hover:bg-plum-800 hover:text-white"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-plum-800">
                      Enquiry Form
                    </h3>
                    <p className="mt-2 text-sm text-ink/60">
                      Fields marked with * are required.
                    </p>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-300/50 bg-red-50 px-4 py-3 text-sm text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-plum-800">
                        Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full rounded-xl border border-ivory-400 bg-ivory-50 px-4 py-3 text-sm text-ink placeholder-ink/40 transition-colors focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-plum-800">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-xl border border-ivory-400 bg-ivory-50 px-4 py-3 text-sm text-ink placeholder-ink/40 transition-colors focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-plum-800">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full rounded-xl border border-ivory-400 bg-ivory-50 px-4 py-3 text-sm text-ink placeholder-ink/40 transition-colors focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                        placeholder="Optional"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-plum-800">
                        Service interested in *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        defaultValue=""
                        className="w-full rounded-xl border border-ivory-400 bg-ivory-50 px-4 py-3 text-sm text-ink transition-colors focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-plum-800">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full resize-none rounded-xl border border-ivory-400 bg-ivory-50 px-4 py-3 text-sm text-ink placeholder-ink/40 transition-colors focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                      placeholder="Tell me a little about what you're looking for..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-3d group inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum-800 px-8 py-4 text-base font-semibold text-white hover:bg-plum-900 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
                    {status !== 'submitting' && (
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
