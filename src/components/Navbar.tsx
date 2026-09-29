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
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? 'px-3 pt-3 sm:px-5' : 'px-0 pt-0'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl border transition-[background-color,box-shadow,border-color,border-radius] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled || menuOpen
            ? 'rounded-[1.75rem] border-white/40 bg-plum-300/80 shadow-xl shadow-plum-900/15 backdrop-blur-xl'
            : 'rounded-none border-transparent bg-transparent'
        }`}
      >
      <nav
        className={`flex items-center justify-between px-5 transition-[padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:px-8 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <a href="#home" className="flex items-center transition-opacity duration-300 hover:opacity-90" onClick={closeMenu}>
          <Logo
            variant="light"
            className={`w-auto transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? 'h-10 sm:h-11' : 'h-12 sm:h-14'}`}
          />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium tracking-wide text-plum-900/85 transition-colors duration-300 hover:text-plum-950 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-plum-800 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="btn-3d inline-flex rounded-full bg-plum-800 px-6 py-2.5 text-sm font-semibold tracking-wide text-white hover:bg-plum-900"
          >
            Enquire Now
          </a>
        </div>

        <button
          className="flex items-center justify-center rounded-full p-2 text-plum-900 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden ${
          menuOpen ? 'max-h-96 border-t border-plum-800/20' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-base font-medium text-plum-900 transition-colors hover:bg-white/50 hover:text-plum-950"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="#contact"
              onClick={closeMenu}
              className="btn-3d block rounded-full bg-plum-800 px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Enquire Now
            </a>
          </li>
        </ul>
      </div>
      </div>
    </header>
  );
}
