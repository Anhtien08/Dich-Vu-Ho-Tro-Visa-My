import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { UI_COPY } from '../data/visaData';
import { AppScreen, Language } from '../types/visa';

interface NavbarProps {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  language: Language;
}

export function Navbar({ activeScreen, onNavigate, language }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const copy = UI_COPY[language].nav;

  const navItems: { id: AppScreen; label: string }[] = [
    { id: 'overview', label: copy.overview },
    { id: 'pathways', label: copy.pathways },
    { id: 'assessment', label: copy.assessment },
  ];

  const handleSelect = (screen: AppScreen) => {
    onNavigate(screen);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto h-full px-5 md:px-8 lg:px-12 flex items-center justify-between gap-8">
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            handleSelect('overview');
          }}
          className="inline-flex items-center shrink-0 focus-ring-brand rounded"
          aria-label="Visa5S"
        >
          <img
            src="/assets/aistudio/image_5dd9c7ec.png"
            alt="Visa5S — Hãy Đến Nơi Nào Bạn Muốn"
            referrerPolicy="no-referrer"
            className="h-11 w-auto object-contain"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-ring-brand rounded cursor-pointer ${
                  isActive
                    ? 'text-[#1E247E] font-semibold'
                    : 'text-[#475569] hover:text-[#1E247E]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#E11D25] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('assessment')}
            className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-lg bg-[#1E247E] hover:bg-[#151A60] text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-ring-brand cursor-pointer"
          >
            {copy.cta}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E2E8F0] text-[#1E247E] hover:bg-[#F8FAFC] focus-ring-brand"
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] shadow-ambient px-5 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#EEF2FF] text-[#1E247E] font-semibold'
                    : 'text-[#334155] hover:bg-[#F8FAFC]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => handleSelect('assessment')}
              className="w-full h-11 rounded-lg bg-[#E11D25] hover:bg-[#B91C1C] text-white text-sm font-semibold"
            >
              {copy.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
