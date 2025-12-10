import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 10 second timer
    const duration = 10000;
    const intervalTime = 100;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Small delay to allow progress bar to look full before completing
        setTimeout(onComplete, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
        className="fixed inset-0 z-[9999] bg-brand-dark flex flex-col items-center justify-center text-white p-6"
        exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
    >
        <div className="max-w-3xl w-full flex flex-col items-center text-center">
            {/* Main Title */}
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-display font-bold uppercase mb-8 leading-none tracking-tighter"
            >
                <ScrambleText text="Hey Techup Labs," />
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="font-mono text-brand-textMuted text-lg md:text-2xl mb-16 max-w-xl"
            >
                A small experiment in aligning with your <span className="text-brand-primary font-bold">AI-first culture</span>.
            </motion.p>

            {/* Timer / Progress Bar */}
            <div className="w-full max-w-md">
                <div className="flex justify-between items-end mb-2 font-mono text-xs md:text-sm text-brand-primary uppercase tracking-widest">
                    <span>System Sync</span>
                    <span>{(progress / 10).toFixed(2)}s / 10.00s</span>
                </div>
                
                <div className="relative w-full h-2 bg-white/10 rounded-none overflow-hidden">
                    <motion.div 
                        className="h-full bg-brand-primary shadow-[0_0_20px_rgba(204,255,0,0.5)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                
                <div className="flex justify-between mt-2 font-mono text-[10px] text-brand-textMuted/50 uppercase">
                    <span>Init_Sequence_Start</span>
                    <span>Load_Complete</span>
                </div>
            </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-white/20" />
            <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-white/20" />
        </div>
    </motion.div>
  );
};

export default LoadingScreen;