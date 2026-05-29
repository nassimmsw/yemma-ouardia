import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Gallery } from '@/components/sections/Gallery';
import { Services } from '@/components/sections/Services';
import { Pricing } from '@/components/sections/Pricing';
import { Contact } from '@/components/sections/Contact';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { BackgroundMusic } from '@/components/ui/BackgroundMusic';
import { useLenis } from '@/hooks/useLenis';

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Lock body scroll during load
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loaded]);

  return (
    <>
      {/* Global overlays */}
      <GrainOverlay />
      <CustomCursor />
      <BackgroundMusic />

      {/* Navbar — parallel to root, outside stacking contexts to avoid fixed position snapping */}
      <Navbar startAnimation={loaded} />

      {/* Main site content — mounted from the start to preload all assets and prevent mount layout flash */}
      <div
        className="relative"
        style={{
          visibility: loaded ? 'visible' : 'hidden',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <main>
          <Hero startAnimation={loaded} />
          <About />
          <Gallery />
          <Services />
          <Pricing />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>
    </>
  );
};

export default App;
