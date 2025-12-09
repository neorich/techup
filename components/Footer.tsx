import React from 'react';
import { useNav } from '../contexts/NavigationContext';

const Footer: React.FC = () => {
  const { triggerNav } = useNav();
  
  const handleLink = (e: React.MouseEvent) => {
      e.preventDefault();
      triggerNav();
  }

  return (
    <footer className="bg-brand-dark pt-32 pb-12 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
                <div className="col-span-1 lg:col-span-2">
                    <h2 className="text-4xl font-display font-bold text-white mb-6">(t)TechUpLabs</h2>
                    <p className="font-mono text-brand-textMuted max-w-sm">
                        Algorithms for Altruism. <br/>
                        Designed for the future of work.
                    </p>
                </div>
                <div>
                    <h4 className="font-mono text-brand-primary mb-6 uppercase tracking-widest">Connect</h4>
                    <ul className="space-y-4 font-display font-bold text-xl uppercase">
                        <li><a href="#" onClick={handleLink} className="hover:text-brand-primary hover:underline decoration-wavy">LinkedIn</a></li>
                        <li><a href="#" onClick={handleLink} className="hover:text-brand-primary hover:underline decoration-wavy">Twitter</a></li>
                        <li><a href="#" onClick={handleLink} className="hover:text-brand-primary hover:underline decoration-wavy">Instagram</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-mono text-brand-primary mb-6 uppercase tracking-widest">Legal</h4>
                    <ul className="space-y-4 font-display font-bold text-xl uppercase">
                        <li><a href="#" onClick={handleLink} className="hover:text-brand-primary hover:underline decoration-wavy">Privacy</a></li>
                        <li><a href="#" onClick={handleLink} className="hover:text-brand-primary hover:underline decoration-wavy">Terms</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex justify-between items-end">
                 <p className="font-mono text-xs text-white/30">© 2024 TechUp Labs Inc.</p>
                 <div className="text-[12vw] leading-none font-display font-bold text-white/5 select-none pointer-events-none absolute bottom-0 right-0 translate-y-[20%]">
                    TECHUP
                 </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
