import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = '+919843046611';
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Nisha, I'd like to enquire about your wellness consultations."
);

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      {expanded && (
        <div className="absolute bottom-16 right-0 w-64 animate-fade-up rounded-2xl bg-ivory-100 p-4 shadow-2xl shadow-plum-900/20">
          <div className="flex items-center justify-between">
            <p className="font-serif text-base font-medium text-plum-800">
              Chat on WhatsApp
            </p>
            <button
              onClick={() => setExpanded(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-plum-600 hover:bg-ivory-300"
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink/60">
            Have a question? Send a message and Nisha will get back to you.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-sage-200 px-4 py-2.5 text-sm font-semibold text-plum-800 transition-colors hover:bg-sage-300"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Start Chat
          </a>
        </div>
      )}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-200 text-plum-800 shadow-xl shadow-plum-900/20 transition-all duration-300 hover:bg-sage-300 hover:scale-105"
        aria-label="WhatsApp"
      >
        {expanded ? (
          <X className="h-6 w-6" strokeWidth={1.5} />
        ) : (
          <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
        )}
        {!expanded && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-gold-400" />
          </span>
        )}
      </button>
    </div>
  );
}
