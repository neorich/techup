import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  isGlitching: boolean;
  triggerNav: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerNav = () => {
    setIsGlitching(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsGlitching(false), 800); // Glitch duration
  };

  return (
    <NavigationContext.Provider value={{ isGlitching, triggerNav }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNav must be used within a NavigationProvider');
  }
  return context;
};
