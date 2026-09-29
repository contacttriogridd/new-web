import { useState } from 'react';
import { Instagram, FileText, X } from 'lucide-react';
import Logo from '@/components/Logo';

type LegalPage = 'privacy' | 'terms' | 'cancellation' | 'refund' | null;

const legalContent: Record<
  Exclude<LegalPage, null>,
  { title: string; sections: { heading: string; body: string }[] }
> = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Information We Collect',
        body: 'When you submit an enquiry form, we collect your name, email address, phone number (if provided), the service you are interested in, and any message you include. We do not collect medical, health, or crisis-related information through this website.',
      },
      {
        heading: 'How We Use Your Information',
        body: 'Your information is used solely to respond to your enquiry and to schedule consultations if you choose to proceed. We will never sell, rent, or share your personal information with third parties for marketing purposes.',
      },
      {
        heading: 'Data Storage & Security',
        body: 'Enquiry submissions are stored securely and accessible only to Nisha Singla. We take reasonable technical and organisational measures to protect your data.',
      },
      {
        heading: 'Confidentiality',
        body: 'All consultations and communications are treated with strict confidentiality. Your personal wellness journey remains private and is never shared without your explicit consent.',
      },
      {
        heading: 'Your Rights',
        body: 'You may request access to, correction of, or deletion of your personal data at any time by contacting us directly.',
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      {
        heading: 'Services Provided',
        body: 'Nisha Singla offers integrative nutrition and holistic wellness coaching, including private consultations, corporate wellness consulting, and speaking engagements. All services are provided online unless otherwise agreed.',
      },
      {
        heading: 'Not a Substitute for Medical Care',
        body: 'The information and coaching provided through this website and during consultations is not intended to diagnose, treat, cure, or prevent any disease. It is not medical advice and should not replace consultation with a qualified healthcare professional. Always consult your physician before making changes to your diet, lifestyle, or supplement regimen.',
      },
      {
        heading: 'No Emergency or Crisis Support',
        body: 'This website does not provide emergency, crisis, or urgent medical support. If you are experiencing a medical emergency or mental health crisis, please contact your local emergency services or a qualified medical professional immediately.',
      },
      {
        heading: 'Client Responsibility',
        body: 'Wellness coaching is a collaborative process. Results depend on your active participation and commitment. Nisha Singla does not guarantee specific outcomes.',
      },
      {
        heading: 'Intellectual Property',
        body: 'All content on this website, including text, images, and design, is the property of Nisha Singla and may not be reproduced without permission.',
      },
    ],
  },
  cancellation: {
    title: 'Cancellation Policy',
    sections: [
      {
        heading: 'Cancelling or Rescheduling',
        body: 'Appointments can be cancelled or rescheduled up to 24 hours before the scheduled session time without any charge. Please notify us via email or WhatsApp as early as possible.',
      },
      {
        heading: 'Late Cancellations',
        body: 'Cancellations made less than 24 hours before the scheduled session may be subject to a cancellation fee. This will be communicated at the time of booking.',
      },
      {
        heading: 'No-Shows',
        body: 'If you miss a scheduled session without prior notice, the session will be considered utilised and the full fee may apply.',
      },
      {
        heading: 'Cancellations by Nisha',
        body: 'In the rare event that Nisha needs to cancel or reschedule a session, you will be notified as early as possible and offered an alternative time slot at no additional cost.',
      },
    ],
  },
  refund: {
    title: 'Refund Policy',
    sections: [
      {
        heading: 'Session Packages',
        body: 'Refund terms for consultation packages will be clearly communicated at the time of booking. Generally, sessions already conducted are non-refundable.',
      },
      {
        heading: 'Unused Sessions',
        body: 'Unused sessions within a package may be eligible for a pro-rata refund, subject to the terms agreed at the time of purchase. Please contact us for details.',
      },
      {
        heading: 'Corporate Engagements',
        body: 'Refund terms for corporate wellness consulting and speaking engagements are governed by the specific agreement signed between the parties.',
      },
      {
        heading: 'How to Request a Refund',
        body: 'To request a refund, please contact us directly via email. Refunds, if approved, will be processed within 7–10 business days to the original payment method.',
      },
    ],
  },
};

export default function Footer() {
  const [activeLegal, setActiveLegal] = useState<LegalPage>(null);

  const legalLinks: { label: string; key: Exclude<LegalPage, null> }[] = [
    { label: 'Privacy Policy', key: 'privacy' },
    { label: 'Terms & Conditions', key: 'terms' },
    { label: 'Cancellation Policy', key: 'cancellation' },
    { label: 'Refund Policy', key: 'refund' },
  ];

  return (
    <>
      <footer className="relative overflow-hidden bg-plum-900 text-ivory-200">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          {/* CTA banner */}
          <div className="mb-14 flex flex-col items-center gap-6 rounded-3xl border border-gold-400/20 bg-plum-800/50 px-6 py-10 text-center lg:flex-row lg:justify-between lg:px-12 lg:text-left">
            <div>
              <h3 className="font-serif text-2xl font-light text-ivory-100 sm:text-3xl">
                Ready to align your mind, body and soul?
              </h3>
              <p className="mt-2 text-sm text-ivory-200/60">
                Your journey to lasting wellness starts with a single conversation.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 rounded-full bg-gold-400 px-8 py-4 text-sm font-semibold text-plum-900 transition-all duration-300 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/25"
            >
              Enquire Now
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="flex items-center">
                <Logo variant="light" className="h-12 w-auto" />
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-200/60">
                Integrative Nutrition Health Coach specialising in gut and hormone
                health. Aligning mind, body and soul for lasting wellness.
              </p>
              <p className="mt-4 font-serif text-base italic text-gold-400">
                "Happy inside is healthy outside"
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'About', href: '#about' },
                  { label: 'Services', href: '#services' },
                  { label: 'Testimonials', href: '#testimonials' },
                  { label: 'Contact', href: '#contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-ivory-200/60 transition-colors hover:text-gold-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                Legal & Policies
              </h4>
              <ul className="mt-4 space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.key}>
                    <button
                      onClick={() => setActiveLegal(link.key)}
                      className="inline-flex items-center gap-2 text-sm text-ivory-200/60 transition-colors hover:text-gold-400"
                    >
                      <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              <a
                href="https://instagram.com/nisha.d.singla"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory-200/15 text-ivory-200/60 transition-all duration-300 hover:border-gold-400/40 hover:text-gold-400"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory-200/10 pt-8 sm:flex-row">
            <p className="text-xs text-ivory-200/40">
              &copy; {new Date().getFullYear()} Nisha Singla. All rights reserved.
            </p>
            <p className="text-xs text-ivory-200/40">
              Coimbatore, India &middot; Serving clients globally
            </p>
          </div>
        </div>
      </footer>

      {/* Legal modal */}
      {activeLegal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setActiveLegal(null)}
        >
          <div className="absolute inset-0 bg-plum-900/80 backdrop-blur-sm animate-fade-in" />
          <div
            className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-ivory-100 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ivory-300 px-8 py-6">
              <h3 className="font-serif text-2xl font-light text-plum-800">
                {legalContent[activeLegal].title}
              </h3>
              <button
                onClick={() => setActiveLegal(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-plum-600 transition-colors hover:bg-ivory-300"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="overflow-y-auto px-8 py-6">
              <div className="space-y-6">
                {legalContent[activeLegal].sections.map((section, i) => (
                  <div key={i}>
                    <h4 className="font-serif text-lg font-medium text-plum-800">
                      {section.heading}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">
                      {section.body}
                    </p>
                  </div>
                ))}
                <div className="rounded-xl bg-gold-50/50 px-5 py-4">
                  <p className="text-xs leading-relaxed text-ink/50">
                    This is placeholder legal content provided for the initial website
                    launch. It should be reviewed and finalised by a qualified legal
                    professional before going live.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
