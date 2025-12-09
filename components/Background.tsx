import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-brand-dark">
      
      {/* Perspective Grid */}
      <div className="absolute inset-0 z-0 opacity-20"
           style={{
             backgroundImage: `linear-gradient(rgba(204, 255, 0, 0.1) 1px, transparent 1px),
             linear-gradient(90deg, rgba(204, 255, 0, 0.1) 1px, transparent 1px)`,
             backgroundSize: '100px 100px',
             transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
             transformOrigin: 'top center'
           }}
      >
        <motion.div 
            className="w-full h-full bg-gradient-to-b from-transparent to-brand-dark"
            animate={{ backgroundPosition: ['0px 0px', '0px 100px'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      </div>

      {/* Spotlights */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-brand-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-brand-secondary/10 rounded-full blur-[150px]" />
      
    </div>
  );
};

export default Background;