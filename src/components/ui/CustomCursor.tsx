import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { stiffness: 200, damping: 28, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const dotSpring = { stiffness: 600, damping: 30 };
  const dotX = useSpring(0, dotSpring);
  const dotY = useSpring(0, dotSpring);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let hasMoved = false;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
      
      if (!hasMoved) {
        hasMoved = true;
        setTimeout(() => {
          setIsVisible(true);
        }, 50);
      } else {
        if (!isVisible) setIsVisible(true);
      }
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!(
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[data-cursor-hover]')
        )
      );
    };

    const hide = () => setIsVisible(false);
    const show = () => setIsVisible(true);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  // Hide on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering ? 'rgba(212,160,23,0.8)' : 'rgba(196,98,45,0.6)',
          backgroundColor: isHovering ? 'rgba(212,160,23,0.1)' : 'transparent',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s',
        }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] w-2 h-2 rounded-full bg-terracotta"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};
