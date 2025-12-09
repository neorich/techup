import React from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import MarqueeStrip from './MarqueeStrip';

const HolographicCard = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
    
    // Chromatic aberration values
    const moveX = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
    const moveY = useSpring(useTransform(y, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div 
            className="relative perspective-[1000px] group cursor-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
             {/* RGB Split Layers for Glitch Effect */}
            <motion.div 
                style={{ x: moveX, y: moveY, opacity: 0.6 }}
                className="absolute inset-0 bg-red-500 mix-blend-screen translate-x-2 pointer-events-none z-0" 
            />
            <motion.div 
                style={{ x: useTransform(moveX, v => -v), y: useTransform(moveY, v => -v), opacity: 0.6 }}
                className="absolute inset-0 bg-blue-500 mix-blend-screen -translate-x-2 pointer-events-none z-0" 
            />

            <div className="relative z-10 border-2 border-white bg-brand-dark p-2 overflow-hidden">
                 <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Team" 
                    className="w-full h-auto grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                 />
                 
                 {/* Hologram Scanline */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-[20%] w-full animate-marquee opacity-20 pointer-events-none" />
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Floating Label */}
            <motion.div 
                className="absolute -bottom-8 -right-8 bg-brand-primary text-black font-mono font-bold p-4 text-sm tracking-widest uppercase shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] z-20"
                style={{ translateZ: 50 }}
            >
                Remote_Access_Granted
            </motion.div>
        </motion.div>
    );
};

const WorkVsLife: React.FC = () => {
  return (
    <section className="py-40 relative overflow-hidden bg-brand-surface border-t border-brand-glassBorder">
      
      {/* Background Decorators */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-[10%] w-64 h-64 border border-dashed border-white/10 rounded-full pointer-events-none z-0"
      />
      <div className="absolute top-40 right-[15%] w-32 h-32 border border-brand-primary/20 rotate-45 pointer-events-none z-0" />

      {/* Marquees */}
      <div className="absolute left-0 top-[10%] w-[150%] -rotate-3 opacity-30 mix-blend-overlay z-0">
          <MarqueeStrip text="WORK LIFE BALANCE // WORK LIFE BALANCE //" className="text-brand-primary font-mono font-bold" />
      </div>
      
      <div className="absolute left-0 bottom-[10%] w-[150%] rotate-2 opacity-30 mix-blend-overlay z-0">
         <MarqueeStrip 
            text="NO MICROMANAGEMENT // ADULTS ONLY //" 
            direction={-1} 
            className="bg-brand-secondary text-white font-mono font-bold" 
         />
      </div>

      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
            
            <div className="space-y-16">
                <h2 className="text-6xl md:text-8xl font-display font-bold uppercase leading-[0.9]">
                    Work
                    <br/>
                    <div className="relative inline-flex items-center justify-center w-[200px] h-[100px] mx-4">
                        <span className="text-brand-textMuted/50 decoration-4 relative z-0">Vs.</span>
                        
                        {/* Crossed Marquee of "AND" */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 overflow-visible">
                            {/* Single Tape */}
                            <motion.div
                                initial={{ scale: 0, rotate: 15, opacity: 0 }}
                                whileInView={{ scale: 1, rotate: -10, opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                className="absolute w-[180%] bg-brand-primary text-black font-bold h-10 flex items-center shadow-lg"
                            >
                                {/* Using &nbsp; to ensure equal spacing and lower density ("really few") */}
                                <MarqueeStrip text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" velocity={30} className="text-xl" />
                            </motion.div>
                        </div>
                    </div>
                    <br/>
                    Life
                </h2>

                <div className="font-mono text-xl text-brand-textMuted space-y-8 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-brand-primary to-transparent" />

                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="pl-8 relative group"
                    >
                        <div className="absolute left-[-5px] top-2 w-2 h-2 bg-brand-primary rounded-full" />
                        <strong className="text-white block mb-2 text-2xl font-display uppercase group-hover:text-brand-primary transition-colors">Output &gt; Location</strong>
                        <p>We don't care about your IP address. We care about your impact code. Work from a beach, a cabin, or Mars.</p>
                    </motion.div>

                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pl-8 relative group"
                    >
                        <div className="absolute left-[-5px] top-2 w-2 h-2 bg-brand-accent rounded-full" />
                        <strong className="text-white block mb-2 text-2xl font-display uppercase group-hover:text-brand-accent transition-colors">Adults Only</strong>
                        <p>No babysitting. No timesheets. We hire adults who own their work, their schedule, and their mistakes.</p>
                    </motion.div>
                </div>
            </div>

            <HolographicCard />

        </div>
      </div>
    </section>
  );
};

export default WorkVsLife;