import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-plum-800/95 backdrop-blur-md shadow-lg shadow-plum-900/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="group flex items-center transition-opacity duration-300 group-hover:opacity-90" onClick={closeMenu}>
          <Logo variant="light" className="h-12 w-auto sm:h-14" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium tracking-wide text-ivory-200/80 transition-colors duration-300 hover:text-gold-400 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="rounded-full bg-gold-400 px-6 py-2.5 text-sm font-semibold tracking-wide text-plum-900 transition-all duration-300 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/30"
          >
            Enquire Now
          </a>
        </div>

        <button
          className="flex items-center justify-center rounded-full p-2 text-ivory-100 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden bg-plum-800/98 backdrop-blur-md transition-all duration-500 lg:hidden ${
          menuOpen ? 'max-h-96 border-t border-gold-400/20' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-base font-medium text-ivory-200 transition-colors hover:bg-plum-700/60 hover:text-gold-400"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="#contact"
              onClick={closeMenu}
              className="block rounded-full bg-gold-400 px-6 py-3 text-center text-sm font-semibold text-plum-900"
            >
              Enquire Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
