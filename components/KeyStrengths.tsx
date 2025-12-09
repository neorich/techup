import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lightbulb, Users, TrendingUp, Sprout } from 'lucide-react';
import { StrengthItem } from '../types';

const strengths: StrengthItem[] = [
  { title: 'Innovation', description: 'Outliers dreaming big.', icon: <Lightbulb size={32} /> },
  { title: 'Lean Teams', description: 'Ruthless efficiency.', icon: <Users size={32} /> },
  { title: 'Revenue', description: 'Transparent success.', icon: <TrendingUp size={32} /> },
  { title: 'Growth', description: 'Constant evolution.', icon: <Sprout size={32} /> },
];

const TiltCard: React.FC<{ item: StrengthItem; index: number }> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [25, -25]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate percentage from center (-0.5 to 0.5)
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Glare position
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-96 w-full perspective-1000"
    >
        <div className="absolute inset-0 bg-brand-surface border border-brand-glassBorder overflow-hidden backface-hidden transform-style-3d shadow-2xl">
            {/* Dynamic Glare */}
            <motion.div 
                className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3) 0%, transparent 80%)`
                }}
            />

            <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-500" />
            
            {/* Animated Corner Borders */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="h-full flex flex-col justify-between p-8 relative z-10" style={{ transform: "translateZ(30px)" }}>
                <div className="w-16 h-16 bg-white/5 rounded-none border border-white/10 flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-black transition-all duration-300">
                    {item.icon}
                </div>
                
                <div className="transform group-hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-3xl font-display font-bold uppercase text-white mb-2">{item.title}</h3>
                    <p className="font-mono text-brand-textMuted group-hover:text-white transition-colors">{item.description}</p>
                </div>
                
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-display font-bold text-4xl text-brand-glassBorder">0{index + 1}</span>
                </div>
            </div>
        </div>
    </motion.div>
  );
};

const KeyStrengths: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-brand-dark relative z-10">
      <div className="max-w-[90rem] mx-auto">
        <div className="mb-20 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end">
            <h2 className="text-6xl md:text-8xl font-display font-bold uppercase text-white leading-none">
                Core <span className="text-stroke">Power</span>
            </h2>
            <p className="font-mono text-brand-primary uppercase tracking-widest mt-4 md:mt-0">
                System Capabilities
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strengths.map((item, idx) => (
                <TiltCard key={idx} item={item} index={idx} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default KeyStrengths;