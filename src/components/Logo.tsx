type LogoProps = {
  variant?: 'light' | 'dark';
  className?: string;
};

export default function Logo({ variant = 'light', className = '' }: LogoProps) {
  const purple = '#6B5A9E';
  const ink = variant === 'light' ? '#FFFFFF' : '#6B5A9E';
  const border = variant === 'light' ? '#FFFFFF' : '#6B5A9E';

  return (
    <svg
      viewBox="0 0 122 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="NEESHA — Integrative Nutrition Health Coach"
    >
      <rect x="2" y="2" width="118" height="172" rx="56" fill={purple} />
      <rect x="3.5" y="3.5" width="115" height="169" rx="54.5" stroke={border} strokeWidth="1" opacity="0.95" />

      <text x="61" y="30" textAnchor="middle" fontFamily="Mulish, sans-serif" fontSize="6.4" fontWeight="700" letterSpacing="1.2" fill={ink}>
        INTEGRATIVE NUTRITION HEALTH COACH
      </text>
      <path d="M48 40H74" stroke={ink} strokeWidth="0.7" opacity="0.9" />

      <path d="M61 58C51 64 47 74 49 85C56 82 63 76 66 67C67 63 65 60 61 58Z" fill={ink} opacity="0.96" />
      <path d="M62 83C69 78 72 70 71 63C77 69 77 78 70 85C68 87 65 88 62 88" fill="none" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M61 87V110C60 103 56 97 49 94M61 96C66 91 69 88 71 82M61 104C56 101 52 99 47 99" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M42 111C49 107 56 108 61 113C66 108 73 107 80 111" stroke={ink} strokeWidth="1.1" strokeLinecap="round" />

      <text x="61" y="131" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="18" fontWeight="500" letterSpacing="3.6" fill={ink}>
        NEESHA
      </text>
      <text x="61" y="143" textAnchor="middle" fontFamily="Mulish, sans-serif" fontSize="5.2" fontWeight="500" letterSpacing="0.4" fill={ink}>
        Advocate (LLM)
      </text>
      <text x="61" y="153" textAnchor="middle" fontFamily="Mulish, sans-serif" fontSize="4.2" fontWeight="500" fill={ink}>
        Integrative Health Coach (New York)
      </text>
      <text x="61" y="161" textAnchor="middle" fontFamily="Mulish, sans-serif" fontSize="4.2" fontWeight="500" fill={ink}>
        Specialised in Hormone & Gut Health
      </text>
    </svg>
  );
}
