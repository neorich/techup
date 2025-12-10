import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import MarqueeStrip from './MarqueeStrip';
import { useNav } from '../contexts/NavigationContext';
import ScrambleText from './ScrambleText';

interface VelocityTextProps {
  children?: React.ReactNode;
  baseVelocity?: number;
}

const VelocityText: React.FC<VelocityTextProps> = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${v}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    
    baseX.set((baseX.get() + moveBy) % 100);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap gap-8" style={{ x }}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-[12vw] font-display font-bold uppercase leading-none text-stroke opacity-30">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const MagneticButton = ({ children, variant = 'primary' }: { children?: React.ReactNode, variant?: 'primary' | 'outline' }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { triggerNav } = useNav();
    
    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };
    
    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };
    
    const { x, y } = position;
    
    const baseStyles = "px-8 py-4 font-display font-bold uppercase text-lg transition-colors duration-300 relative overflow-hidden group";
    const primaryStyles = "bg-white text-black hover:bg-brand-primary";
    const outlineStyles = "border border-white/20 text-white hover:bg-white hover:text-black";

    return (
        <motion.button
            ref={ref}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            onClick={triggerNav}
            className={`${baseStyles} ${variant === 'primary' ? primaryStyles : outlineStyles}`}
        >
             <span className="relative z-10">{children}</span>
        </motion.button>
    )
}

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 overflow-hidden">
      
      {/* Background Parallax Text */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-10 pointer-events-none rotate-[-5deg] z-0"
      >
        <VelocityText baseVelocity={2}>Algorithms Altruism</VelocityText>
      </motion.div>

      <motion.div 
        style={{ scale }}
        className="max-w-[90rem] mx-auto px-6 relative z-10 w-full"
      >
        {/* Animated Marquee Subtitle */}
        <div className="border-l-2 border-brand-primary/50 pl-0 mb-8 overflow-hidden max-w-md">
             <MarqueeStrip 
                text="Remote First // Est. 2016 // Remote First // Est. 2016 //" 
                className="font-mono text-brand-primary text-lg tracking-widest uppercase bg-brand-primary/10 py-1"
                velocity={20}
             />
        </div>

        <div className="relative">
            <motion.h1 
                className="text-[10vw] md:text-[11vw] font-display font-bold uppercase leading-[0.85] tracking-tighter"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
            >
                {/* Algorithms */}
                <div className="overflow-hidden">
                    <motion.div 
                        variants={{ hidden: { y: "100%" }, visible: { y: 0 } }} 
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <ScrambleText text="Algorithms" />
                    </motion.div>
                </div>

                {/* for Altruism */}
                <div className="overflow-hidden flex flex-wrap items-center gap-4">
                    <motion.div 
                        variants={{ hidden: { width: 0 }, visible: { width: "100px" } }} 
                        className="h-[2vw] bg-brand-primary hidden md:block"
                    />
                    <motion.span 
                        variants={{ hidden: { y: "100%" }, visible: { y: 0 } }} 
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                        className="font-serif italic text-brand-textMuted text-[5vw] lowercase"
                    >
                        for
                    </motion.span>
                    
                    <motion.div 
                         variants={{ hidden: { y: "100%" }, visible: { y: 0 } }} 
                         transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                         className="relative text-stroke-thick hover:text-white transition-colors duration-300"
                    >
                         <ScrambleText text="Altruism" />
                         {/* Subtle floating glow behind */}
                         <div className="absolute inset-0 blur-2xl bg-brand-primary/20 -z-10 animate-pulse" />
                    </motion.div>
                </div>
            </motion.h1>
        </div>

        <motion.div 
            style={{ y: y1 }}
            className="flex flex-col md:flex-row items-end justify-between mt-12 gap-12"
        >
            <p className="max-w-md font-mono text-lg text-brand-textMuted leading-relaxed">
                We are a collective of outliers. Innovating, dreaming, and pushing the boundaries of what is possible.
            </p>
            
            <div className="flex gap-4">
                <MagneticButton variant="primary">Explore</MagneticButton>
                <MagneticButton variant="outline">Partner</MagneticButton>
            </div>
        </motion.div>
      </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="font-mono text-xs uppercase tracking-widest text-brand-primary">Scroll</span>
            <ArrowDown size={16} className="text-brand-primary" />
        </motion.div>
    </section>
  );
};

export default Hero;