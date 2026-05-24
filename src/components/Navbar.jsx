import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Truck from '../assets/Truck.svg'; // Custom truck icon for the logo
const navLinks = [
  { label: 'HOME', id: 'home' },
  { label: 'SERVICES', id: 'services' },
  { label: 'VEHICLES', id: 'vehicles' },
  { label: 'ABOUT US', id: 'about' },
  { label: 'CONTACT', id: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      
      // Dynamic active section detection on scroll
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, id) => {
    setIsOpen(false);
    setActiveSection(id);
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -70; // constant offset matching mobile/desktop navbar height
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black border-b border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.8)]' 
            : 'bg-black/95 md:bg-black/80'
        }`}
      >
        {/* Fixed heights on mobile (60px) and desktop (80px) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-[60px] md:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3.5 group" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            {/* Custom Golden Sports Car SVG Logo */}
            <div className="flex items-center justify-center shrink-0">
              <img src={Truck} alt="Shazil & Rayan Logo" className="w-8 h-8 group-hover:animate-pulse" />
            </div>
            
            {/* Text Logo */}
            <div className="flex flex-col leading-none">
              <span className="font-black text-[16px] text-white tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>Shazil And Rayan</span>
              <span className="font-extrabold text-[12px] text-[#F5C71A] tracking-wider" style={{ fontFamily: 'Outfit, sans-serif' }}>CARGO CAR CARRIER SERVICES</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-9">
            {navLinks.map(({ label, id }) => (
              <li key={id}>
                <Link
                  to={`/#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`relative font-bold text-xs tracking-wider transition-colors duration-300 pb-1 ${
                    activeSection === id 
                      ? 'text-[#F5C71A]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {label}
                  {activeSection === id && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F5C71A] rounded-full transition-all duration-300" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')} 
              className="bg-[#F5C71A] hover:bg-[#E0B212] text-black font-extrabold text-xs tracking-wider px-5 py-2.5 rounded flex items-center gap-1.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,199,26,0.4)]"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              BOOK NOW <ArrowRight size={13} className="stroke-[3px]" />
            </a>
          </div>

          {/* Mobile Menu Button - Styled with distinct background/border to serve as premium toggle bar */}
          <button 
            className="md:hidden text-[#F5C71A] p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-[#F5C71A]/10 hover:border-[#F5C71A]/20 transition-all duration-300" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} className="stroke-[2.5px]" /> : <Menu size={20} className="stroke-[2.5px]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Solid background aligning pixel-perfectly under h-[60px] */}
      <div
        className={`fixed top-[60px] left-0 w-full z-40 md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-black border-b border-white/5 ${
          isOpen ? 'max-h-[380px] shadow-[0_10px_30px_rgba(0,0,0,0.9)]' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col items-center gap-1.5 py-6 px-6">
          {navLinks.map(({ label, id }) => (
            <Link
              key={id}
              to={`/#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className={`w-full text-center py-3 font-extrabold text-sm tracking-wider rounded-md transition-all duration-200 ${
                activeSection === id
                  ? 'text-[#F5C71A] bg-white/5'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {label}
            </Link>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="w-full text-center bg-[#F5C71A] hover:bg-[#E0B212] text-black font-black text-xs tracking-widest py-3.5 mt-3 rounded-md flex items-center justify-center gap-1.5 transition-all duration-300"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            BOOK NOW <ArrowRight size={13} className="stroke-[3px]" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
