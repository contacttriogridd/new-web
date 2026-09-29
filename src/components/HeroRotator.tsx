import { useState, useEffect } from 'react';

const heroImages = [
  {
    src: 'https://images.pexels.com/photos/6648588/pexels-photo-6648588.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Nisha Singla, Integrative Health Coach',
  },
  {
    src: 'https://images.pexels.com/photos/4098365/pexels-photo-4098365.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Online video consultation',
  },
  {
    src: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Whole foods for gut health',
  },
  {
    src: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Mind-body balance and wellness',
  },
];

interface HeroRotatorProps {
  intervalMs?: number;
  className?: string;
  showDots?: boolean;
}

export default function HeroRotator({
  intervalMs = 5000,
  className = '',
  showDots = true,
}: HeroRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {heroImages.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          aria-hidden={i !== index}
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {showDots && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`Show slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
