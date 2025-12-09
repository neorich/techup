import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { NavItem } from '../types';
import { useNav } from '../contexts/NavigationContext';

const navItems: NavItem[] = [
  { label: 'Products', href: '#' },
  { label: 'Engineering', href: '#' },
  { label: 'Careers', href: '#' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerNav } = useNav();

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    triggerNav();
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 pointer-events-none mix-blend-exclusion"
      >
        {/* Brand */}
        <a href="#" onClick={handleLinkClick} className="pointer-events-auto flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-primary flex items-center justify-center font-display font-bold text-black text-xl group-hover:rotate-180 transition-transform duration-500">
                T
            </div>
            <span className="font-display font-bold text-white text-xl tracking-tighter">TechUp<span className="text-brand-primary">.</span></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex pointer-events-auto items-center bg-white/5 backdrop-blur-md px-2 py-2 rounded-full border border-white/10">
            {navItems.map((item) => (
                <a 
                    key={item.label} 
                    href={item.href}
                    onClick={handleLinkClick}
                    className="px-6 py-2 rounded-full text-sm font-mono font-bold uppercase hover:bg-white hover:text-black transition-all duration-300"
                >
                    {item.label}
                </a>
            ))}
            <button onClick={handleLinkClick} className="ml-2 px-6 py-2 bg-brand-primary text-black rounded-full font-mono font-bold uppercase flex items-center gap-2 hover:scale-105 transition-transform">
                <Zap size={16} fill="currentColor" />
                Connect
            </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden pointer-events-auto w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-brand-primary hover:text-black transition-colors"
        >
            <Menu />
        </button>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ clipPath: "circle(0% at 100% 0%)" }}
                animate={{ clipPath: "circle(150% at 100% 0%)" }}
                exit={{ clipPath: "circle(0% at 100% 0%)" }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="fixed inset-0 bg-brand-primary z-[60] flex items-center justify-center"
            >
                <div className="flex flex-col gap-4 text-center">
                    {navItems.map((item, idx) => (
                        <motion.a
                            key={idx}
                            href={item.href}
                            onClick={handleLinkClick}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="font-display text-6xl text-black font-bold uppercase hover:text-white transition-colors"
                        >
                            {item.label}
                        </motion.a>
                    ))}
                    <button onClick={() => setIsOpen(false)} className="mt-8 mx-auto w-16 h-16 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-brand-primary transition-colors">
                        <X size={32} />
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
