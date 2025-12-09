import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  { question: "Why global remote?", answer: "Happiness drives productivity. Remote work isn't just a perk; it's our engine." },
  { question: "Which sectors?", answer: "FinTech, HealthTech, EduTech, Logistics. Scalable, robust engineering." },
  { question: "Service or Product?", answer: "Hybrid. Elite engineering services while incubating internal products." },
  { question: "Is TechUp Profitable?", answer: "Bootstrapped. Profitable. Growing. Since 2016." },
  { question: "Internal Culture?", answer: "Autonomy over micromanagement. Trust over tracking." },
];

const Accordion: React.FC<{ item: FAQItem; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/20">
            <button 
                onClick={onClick}
                className="w-full py-10 flex items-center justify-between text-left group"
            >
                <span className="text-2xl md:text-4xl font-display font-bold uppercase text-white group-hover:text-brand-primary transition-colors">
                    {item.question}
                </span>
                <motion.div 
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="p-2 border border-white/20 rounded-full group-hover:border-brand-primary group-hover:text-brand-primary transition-colors"
                >
                    <Plus size={24} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-10 font-mono text-lg text-brand-textMuted max-w-2xl">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 px-6 bg-brand-surface">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-mono text-brand-primary mb-12 uppercase tracking-widest">// Questions & Answers</h2>
        
        <div className="space-y-2">
            {faqData.map((item, index) => (
                <Accordion
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;