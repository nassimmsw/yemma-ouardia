import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewport } from '@/lib/animations';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewport}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
);
