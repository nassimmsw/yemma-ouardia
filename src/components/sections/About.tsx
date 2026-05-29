import React from 'react';
import { motion } from 'framer-motion';
import { AmazighDivider } from '@/components/ui/AmazighDivider';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { slideLeft, slideRight, viewport } from '@/lib/animations';


export const About: React.FC = () => {
  return (
    <section
      id="apropos"
      className="relative section-padding overflow-hidden amazigh-bg-pattern"
      style={{ background: '#FAF3E8' }}
    >
      {/* Decorative blob */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <SectionReveal className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-terracotta/40" />
            <span className="font-accent italic text-terracotta text-base tracking-[0.15em]">
              Notre Histoire
            </span>
            <div className="h-px w-8 bg-terracotta/40" />
          </div>
        </SectionReveal>

        <SectionReveal className="text-center mb-16" delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl text-walnut">
            L'Âme d'une{' '}
            <span className="font-accent italic text-warm-gradient">Maison Familiale</span>
          </h2>
        </SectionReveal>

        <AmazighDivider className="mb-16" />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-float img-zoom">
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1469&auto=format&fit=crop"
                alt="Intérieur de la salle YEMMA-Ouardia"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(196,98,45,0.15) 0%, transparent 50%)',
                }}
              />
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-4 md:-right-8 glass-warm rounded-2xl p-5 shadow-warm-lg"
            >
              <p className="font-accent italic text-terracotta text-3xl font-light leading-none mb-1">
                "Une maison de fête"
              </p>
              <p className="text-walnut/60 text-xs tracking-wider">Un lieu chaleureux</p>
            </motion.div>

            {/* Amazigh pattern decoration */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24 pointer-events-none opacity-20"
            >
              <svg viewBox="0 0 100 100" fill="none">
                <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#C4622D" strokeWidth="2" />
                <polygon points="50,20 80,50 50,80 20,50" fill="none" stroke="#D4A017" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="8" fill="none" stroke="#C4622D" strokeWidth="1.5" />
              </svg>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="font-accent italic text-terracotta text-xl mb-6 leading-relaxed">
              «&nbsp;Chez nous, chaque fête est tissée avec le soin d’un bel ouvrage —
              avec amour, patience et âme.&nbsp;»
            </p>

            <p className="text-walnut/75 leading-relaxed mb-5 text-base">
              Propriété de la Famille Amani, YEMMA-Ouardia est bien plus qu'une salle des fêtes. C'est un espace conçu pour
              honorer vos moments les plus précieux, inspiré par la chaleur de l'hospitalité
              familiale et la beauté des célébrations partagées.
            </p>

            <p className="text-walnut/65 leading-relaxed mb-5 text-base">
              Notre salle vous accueille avec des textures naturelles, des lumières douces et
              une décoration qui rend hommage à l'art de recevoir — pour que chaque
              célébration ressemble à une histoire racontée avec cœur.
            </p>

            {/* Elegant Amazigh Proverb Callout */}
            <div className="border-l-[3px] border-terracotta/40 pl-5 my-6 py-1 bg-terracotta/[0.02] rounded-r-xl">
              <span className="text-[10px] text-amber tracking-widest font-accent uppercase mb-1 block select-none font-medium">
                Inzan · ⵉⵏⵣⴰⵏ · Sagesse
              </span>
              <p className="font-serif text-walnut/90 font-semibold text-base md:text-[17px] mb-1">
                Axxam bu yergazen, yif axxam bu yedrimen.
              </p>
              <p className="font-accent italic text-terracotta text-sm">
                « Une maison riche en valeurs humaines vaut mieux qu'une maison riche en argent »
              </p>
            </div>

            {/* Values */}
            <div className="space-y-3 mb-8">
              {[
                'Accueil chaleureux et personnalisé',
                'Décoration chaleureuse et personnalisée',
                'Localisation à Draa El Mizan, Tizi Ouzou',
                'Équipe dédiée à chaque détail',
                'Espace modulable selon vos besoins',
              ].map((val, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
                  <span className="text-walnut/70 text-sm">{val}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex btn-primary items-center gap-2 px-7 py-3.5 rounded-full text-sm tracking-wider"
            >
              <span>Nous rendre visite</span>
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
