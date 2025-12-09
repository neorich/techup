import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeStripProps {
    text: string;
    direction?: number;
    className?: string;
    velocity?: number;
}

const MarqueeStrip: React.FC<MarqueeStripProps> = ({ text, direction = 1, className = "", velocity = 10 }) => {
    return (
        <div className={`flex overflow-hidden whitespace-nowrap select-none ${className}`}>
            <motion.div 
                animate={{ x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
                transition={{ repeat: Infinity, duration: velocity, ease: "linear" }}
                className="flex whitespace-nowrap gap-8"
            >
                {/* Increased repeat count to ensure it fills wider screens even with short text content */}
                {[...Array(50)].map((_, i) => (
                    <span key={i} dangerouslySetInnerHTML={{ __html: text }} />
                ))}
            </motion.div>
        </div>
    );
};

export default MarqueeStrip;