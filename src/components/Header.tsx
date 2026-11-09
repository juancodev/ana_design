import React from 'react';
import { Menu } from 'lucide-react';
import { DeAndradeEmblem } from './DeAndradeLogo';
import { Link } from '../lib/router';

interface HeaderProps {
  onOpenMenu: () => void;
}

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export const Header: React.FC<HeaderProps> = ({ onOpenMenu }) => (
  <header className="fixed top-0 left-0 right-0 z-40 h-16 md:h-20 bg-olive text-cream shadow-md select-none">
    <div className="max-w-[80rem] mx-auto px-4 sm:px-8 h-full flex items-center justify-between">

      <Link to="/" onClick={scrollTop} className="hover:scale-105 transition-transform" title="De Andrade - Inicio">
        <DeAndradeEmblem size={34} color="#DBCAA2" />
      </Link>

      <Link
        to="/"
        onClick={scrollTop}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center"
        title="De Andrade - Inicio"
      >
        <span className="font-script text-2xl sm:text-3xl leading-none">De Andrade</span>
        <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-medium mt-1">Interior Design</span>
      </Link>

      <button
        onClick={onOpenMenu}
        className="p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Abrir menú"
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
      </button>

    </div>
  </header>
);
