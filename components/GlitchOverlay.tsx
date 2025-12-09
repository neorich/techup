import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '../contexts/NavigationContext';

const GlitchOverlay: React.FC = () => {
  const { isGlitching } = useNav();

  return (
    <AnimatePresence>
      {isGlitching && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] pointer-events-none flex flex-col h-full w-full"
        >
            {/* Flash Layer */}
            <motion.div 
                className="absolute inset-0 bg-brand-primary mix-blend-difference"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 0.5, 0] }}
                transition={{ duration: 0.3 }}
            />
            
            {/* Slice Layers */}
            {[...Array(10)].map((_, i) => (
                <motion.div 
                    key={i}
                    className="w-full bg-black/20 backdrop-invert"
                    style={{ height: `${100 / 10}%` }}
                    initial={{ x: 0 }}
                    animate={{ 
                        x: i % 2 === 0 ? [-100, 50, 0] : [100, -50, 0],
                        opacity: [0, 1, 0] 
                    }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                />
            ))}

            {/* Noise Overlay */}
            <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlitchOverlay;
