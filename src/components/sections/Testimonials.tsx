import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AmazighDivider } from '@/components/ui/AmazighDivider';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Amina & Karim',
    event: 'Mariage · Juin 2024',
    text: "Un lieu magique qui a dépassé toutes nos attentes. L'équipe de YEMMA-Ouardia a transformé notre mariage en un conte de fées. Chaque détail était parfait, chaque moment inoubliable.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
  },
  {
    name: 'Famille Ait Mhand',
    event: 'Fête familiale · Mars 2024',
    text: "Nous avons célébré le baptême de notre fils dans cette magnifique salle. L'atmosphère était exactement ce que nous voulions — chaleureuse, authentique, familiale. Merci mille fois !",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
  },
  {
    name: 'Yasmine & Sofiane',
    event: 'Fiançailles · Octobre 2023',
    text: "La décoration de la salle nous a complètement conquis. Nos invités n'ont pas arrêté de complimenter l'endroit. Le personnel est d'une gentillesse et d'une professionnalité remarquables.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
  },
  {
    name: 'Hamid Ourabah',
    event: 'Séminaire d\'entreprise · Janvier 2024',
    text: "Excellent cadre pour notre séminaire annuel. Spacieux, bien équipé, et le service était impeccable. Une adresse que je recommande sans hésitation pour les événements professionnels.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
  },
  {
    name: 'Nadia Meziane',
    event: 'Cérémonie de Henné · Mai 2024',
    text: "La soirée de henné de ma fille était absolument splendide dans cette salle. Les couleurs, les lumières, la décoration — tout respirait une vraie authenticité. Un souvenir pour toujours.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=100&auto=format&fit=crop',
  },
  {
    name: 'Mourad & Samira',
    event: 'Mariage · Août 2023',
    text: "Notre mariage était un rêve rendu réalité. L'équipe est à l'écoute, créative et passionnée. YEMMA-Ouardia, c'est bien plus qu'une salle — c'est une famille qui vous accueille.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
  },
];

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };
  const goPrev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section
      id="temoignages"
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #2A1508 0%, #3D2110 100%)' }}
    >
      <div className="absolute inset-0 amazigh-bg-subtle opacity-20 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,160,23,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative">
        <SectionReveal className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-amber/40" />
            <span className="font-accent italic text-amber text-base tracking-[0.15em]">
              Ils nous ont fait confiance
            </span>
            <div className="h-px w-8 bg-amber/40" />
          </div>
        </SectionReveal>
        <SectionReveal className="text-center mb-4" delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl text-warm-white">
            Ce que disent{' '}
            <span className="font-accent italic text-amber">nos familles</span>
          </h2>
        </SectionReveal>

        <AmazighDivider color="#D4A017" className="mb-14 opacity-30" />

        {/* Main testimonial card */}
        <div className="relative min-h-[340px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div
                className="relative rounded-3xl p-8 md:p-12 text-center"
                style={{
                  background: 'rgba(250,243,232,0.05)',
                  border: '1px solid rgba(212,160,23,0.12)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Quote icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(212,160,23,0.15)' }}
                  >
                    <Quote size={20} className="text-amber" />
                  </div>
                </div>

                {/* Text */}
                <p className="font-accent italic text-sand/85 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                  "{t.text}"
                </p>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#D4A017">
                      <path d="M8 1l1.8 4.8H15l-4.2 3 1.5 5-4.3-3-4.3 3 1.5-5L1 5.8h5.2z" />
                    </svg>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber/30"
                  />
                  <div className="text-left">
                    <div className="font-serif text-warm-white text-base">{t.name}</div>
                    <div className="text-amber/60 text-xs tracking-wider">{t.event}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={goPrev}
            className="w-11 h-11 rounded-full border border-sand/20 flex items-center justify-center text-sand/60 hover:text-amber hover:border-amber transition-all duration-300"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? '24px' : '6px',
                  height: '6px',
                  background: i === current ? '#D4A017' : 'rgba(212,160,23,0.3)',
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="w-11 h-11 rounded-full border border-sand/20 flex items-center justify-center text-sand/60 hover:text-amber hover:border-amber transition-all duration-300"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
