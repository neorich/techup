import React from 'react';
import { motion } from 'framer-motion';

const values = [
  { title: "Freedom", desc: "Unleash creativity.", color: "text-brand-primary", border: "border-brand-primary" },
  { title: "Resp.", desc: "Own your actions.", color: "text-brand-secondary", border: "border-brand-secondary" },
  { title: "Empathy", desc: "Humans first.", color: "text-brand-accent", border: "border-brand-accent" }
];

const Values: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark">
      <div className="max-w-[90rem] mx-auto px-6">
        <h2 className="text-center font-display font-bold text-4xl uppercase tracking-widest mb-16 opacity-50">Core Values</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
            {values.map((val, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    viewport={{ once: true }}
                    className={`flex-1 h-[60vh] border ${val.border} relative p-8 flex flex-col justify-between group overflow-hidden bg-white/5 hover:bg-white/10 transition-colors`}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                    
                    {/* Big Background Text */}
                    <span className={`absolute -bottom-10 -right-10 text-[15vw] font-display font-bold leading-none opacity-10 select-none ${val.color} group-hover:opacity-20 transition-opacity duration-500`}>
                        {idx + 1}
                    </span>

                    <div className="relative z-20">
                        <div className={`w-12 h-1 bg-current mb-4 ${val.color}`} />
                        <h3 className={`text-6xl font-display font-bold uppercase mb-4 ${val.color}`}>{val.title}</h3>
                    </div>

                    <div className="relative z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <p className="font-mono text-xl text-white">{val.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Values;