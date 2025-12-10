import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KeyStrengths from './components/KeyStrengths';
import WorkVsLife from './components/WorkVsLife';
import Values from './components/Values';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import GlitchOverlay from './components/GlitchOverlay';
import LoadingScreen from './components/LoadingScreen';
import { NavigationProvider } from './contexts/NavigationContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NavigationProvider>
        {/* Loading Screen Overlay */}
        <AnimatePresence>
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        <main className="min-h-screen relative font-sans text-brand-text bg-brand-dark selection:bg-brand-primary selection:text-black">
        <CustomCursor />
        <GlitchOverlay />
        <div className="bg-noise"></div>
        <Background />
        <Navbar />
        <Hero />
        <KeyStrengths />
        <WorkVsLife />
        <Values />
        <FAQ />
        <Footer />
        </main>
    </NavigationProvider>
  );
}

export default App;