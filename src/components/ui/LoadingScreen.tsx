import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center amazigh-bg-pattern"
      style={{ background: '#FAF3E8' }}
    >
          {/* Animated Amazigh emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: 0, transform: 'scale(0.6) rotate(-15deg)' }}
            className="mb-8"
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              {/* Outer diamond */}
              <polygon
                points="40,4 76,40 40,76 4,40"
                fill="none"
                stroke="#C4622D"
                strokeWidth="1.5"
              />
              {/* Inner diamond */}
              <polygon
                points="40,16 64,40 40,64 16,40"
                fill="none"
                stroke="#D4A017"
                strokeWidth="1.5"
              />
              {/* Center dot */}
              <circle cx="40" cy="40" r="5" fill="#C4622D" />
              {/* Decorative crosses */}
              <line x1="40" y1="28" x2="40" y2="32" stroke="#C4622D" strokeWidth="1.5" />
              <line x1="40" y1="48" x2="40" y2="52" stroke="#C4622D" strokeWidth="1.5" />
              <line x1="28" y1="40" x2="32" y2="40" stroke="#C4622D" strokeWidth="1.5" />
              <line x1="48" y1="40" x2="52" y2="40" stroke="#C4622D" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: 0, transform: 'translateY(20px)' }}
            className="text-center mb-2"
          >
            <h1 className="font-serif text-4xl text-walnut tracking-widest uppercase">
              YEMMA-Ouardia
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ opacity: 0 }}
            className="font-accent italic text-terracotta text-lg tracking-wider mb-10"
          >
            Salle des Fêtes
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{ opacity: 0 }}
            className="w-48 h-px bg-sand/60 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-terracotta"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </motion.div>
        </motion.div>
  );
};
