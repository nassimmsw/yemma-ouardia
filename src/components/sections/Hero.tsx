import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FloatingParticles } from '@/components/ui/FloatingParticles';
import { ChevronDown } from 'lucide-react';

// Word by word reveal
const SplitReveal: React.FC<{ text: string; delay?: number; className?: string; start?: boolean }> = ({
  text,
  delay = 0,
  className = '',
  start = true,
}) => {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, rotateX: 20 }}
          animate={start ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 24, rotateX: 20 }}
          transition={{
            delay: delay + i * 0.08,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'inline-block',
            marginRight: '0.3em',
            opacity: 0,
            transform: 'translateY(24px) rotateX(20deg)',
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export const Hero: React.FC<{ startAnimation?: boolean }> = ({ startAnimation = true }) => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 150]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.55, 0.85]);
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);

  const scrollToNext = () => {
    document.querySelector('#apropos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
          alt="YEMMA-Ouardia Hall"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
      </motion.div>

      {/* Warm gradient overlay */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          opacity: overlayOpacity,
          background:
            'linear-gradient(180deg, rgba(42,21,8,0.4) 0%, rgba(42,21,8,0.7) 60%, rgba(42,21,8,0.92) 100%)',
        }}
      />

      {/* Warm tint overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 60% 40%, rgba(212,160,23,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[3]">
        <FloatingParticles />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-[4] text-center px-6 max-w-5xl mx-auto"
        style={{ y: contentY }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-amber/60" />
          <span className="font-accent italic text-amber text-base tracking-[0.2em]">
            Salle des Fêtes
          </span>
          <div className="h-px w-12 bg-amber/60" />
        </motion.div>

        {/* Main headline */}
        <h1 className="font-serif text-warm-white mb-4 leading-tight">
          <span className="block text-5xl md:text-7xl lg:text-8xl mb-2">
            <SplitReveal text="Célébrez vos" delay={0.5} start={startAnimation} />
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-8xl"
            style={{
              background: 'linear-gradient(135deg, #FAF3E8 30%, #D4A017 70%, #C4622D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <SplitReveal text="Plus Beaux Moments" delay={0.8} start={startAnimation} />
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
          className="font-accent italic text-warm-white/70 text-lg md:text-2xl mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          Dans un cadre inspiré de la chaleur et de l'hospitalité — 
          un lieu où chaque fête devient un souvenir éternel.
        </motion.p>

        {/* Proverb badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ delay: 1.55, duration: 0.8 }}
          style={{ opacity: 0, transform: 'translateY(15px)' }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-amber/25 bg-walnut/40 backdrop-blur-md mb-8 max-w-lg mx-auto shadow-warm-sm"
        >
          <span className="text-[10.5px] uppercase font-accent tracking-[0.18em] text-amber border-r border-amber/20 pr-3 font-semibold select-none">
            Inebgi n Rebbi · ⵉⵏⴱⴳⵉ ⵏ ⵕⵕⴱⴱⵉ
          </span>
          <span className="font-accent italic text-warm-white/80 text-xs md:text-sm tracking-wide">
            « L'invité est l'invité de Dieu »
          </span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          style={{ opacity: 0, transform: 'translateY(24px)' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary px-8 py-4 rounded-full text-sm tracking-widest uppercase"
          >
            <span>Réserver votre événement</span>
          </a>
          <a
            href="#galerie"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#galerie')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-outline px-8 py-4 rounded-full text-sm tracking-widest uppercase"
          >
            Découvrir la salle
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.5 }}
        style={{ opacity: 0 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 text-warm-white/50 hover:text-amber transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
};
