import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrambleText = ({ text, className = "" }: { text: string, className?: string }) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
    
    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(prev => 
                prev.split("").map((_, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            
            if (iterations >= text.length) {
                clearInterval(interval);
            }
            
            iterations += 1/3; // Speed of decoding
        }, 30);
        
        return () => clearInterval(interval);
    }, [text]);

    return (
        <motion.span 
            className={`inline-block ${className}`}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => {
                 // Re-trigger scramble on hover logic can be added here
            }}
        >
            {displayText}
        </motion.span>
    );
}

export default ScrambleText;