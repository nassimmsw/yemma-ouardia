import React from 'react';
import { motion } from 'framer-motion';
import { AmazighDivider, TifinaghRow } from '@/components/ui/AmazighDivider';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, viewport } from '@/lib/animations';

const proverbs = [
  {
    latin: "Afus deg ufus, taɛekkemt tẓayen ad tifsus",
    tifinagh: "ⴰⴼⵓⵙ ⴷⴳ ⵓⴼⵓⵙ, ⵜⴰⵄⴻⴽⴽⴻⵎⵜ ⵜⵥⴰⵢⴻⵏ ⴰⴷ ⵜⵉⴼⵙⵓⵙ",
    translation: "« Main dans la main, la charge lourde devient légère. »",
    meaning: "L'entraide et la solidarité familiale transforment les défis de la vie en moments de partage et de douceur. C'est l'essence même de l'union et des mariages que nous accueillons.",
    tag: "Union & Partage",
    symbol: (
      <svg className="w-12 h-12 text-amber transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100" fill="none">
        <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M50 25 L75 50 L50 75 L25 50 Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" strokeLinejoin="round"/>
        <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.2"/>
        <path d="M10 50 H90 M50 10 V90" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.3"/>
      </svg>
    )
  },
  {
    latin: "Axxam bu yergazen, yif axxam bu yedrimen",
    tifinagh: "ⴰⵅⵅⴰⵎ ⴱⵓ ⵢⵔⴳⴰⵣⵏ, ⵢⵉⴼ ⴰⵅⵅⴰⵎ ⴱⵓ ⵢⴷⵔⵉⵎⵏ",
    translation: "« Une maison riche en valeurs humaines vaut mieux qu'une maison riche en argent. »",
    meaning: "La véritable grandeur d'un foyer réside dans la chaleur de son accueil, la bienveillance, la générosité et la noblesse d'âme des personnes qui s'y rassemblent.",
    tag: "Foyer & Valeurs",
    symbol: (
      <svg className="w-12 h-12 text-terracotta transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100" fill="none">
        <path d="M15 80 L50 15 L85 80 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M50 15 V80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
        <path d="M32 50 H68" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="50" cy="15" r="4" fill="currentColor"/>
        <circle cx="50" cy="80" r="3" fill="currentColor"/>
      </svg>
    )
  },
  {
    latin: "Inebgi n Rebbi",
    tifinagh: "ⵉⵏⴱⴳⵉ ⵏ ⵕⵕⴱⴱⵉ",
    translation: "« L'invité est l'invité de Dieu. »",
    meaning: "L'hospitalité est un honneur sacré en Kabylie. Chez YEMMA-Ouardia, chaque hôte est accueilli avec le plus profond respect et la plus grande dévotion, perpétuant notre précieux héritage.",
    tag: "Hospitalité",
    symbol: (
      <svg className="w-12 h-12 text-amber transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100" fill="none">
        <path d="M30 22 C30 22, 50 42, 50 50 C50 58, 30 78, 30 78" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M70 22 C70 22, 50 42, 50 50 C50 58, 70 78, 70 78" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M50 12 V88" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="50" cy="12" r="5" fill="currentColor"/>
        <circle cx="50" cy="88" r="5" fill="currentColor"/>
      </svg>
    )
  },
  {
    latin: "Temlal tasa d way turew",
    tifinagh: "ⵜⵎⵍⴰⵍ ⵜⴰⵙⴰ ⴷ ⵡⴰⵢ ⵜⵓⵔⵓⵡ",
    translation: "« Les entrailles et leurs fruits se sont retrouvés. »",
    meaning: "Célèbre l'amour inconditionnel et la joie infinie des retrouvailles familiales. C'est l'instant précieux où les proches s'unissent pour honorer l'héritage et les nouveaux départs.",
    tag: "Famille & Amour",
    symbol: (
      <svg className="w-12 h-12 text-clay transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100" fill="none">
        <path d="M10 50 Q50 15 90 50 Q50 85 10 50 Z" stroke="currentColor" strokeWidth="2"/>
        <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
        <circle cx="50" cy="50" r="5" fill="currentColor"/>
        <path d="M22 50 H78" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      </svg>
    )
  }
];

export const Proverbs: React.FC = () => {
  return (
    <section
      id="sagesse"
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1C0C04 0%, #2D160A 100%)' }}
    >
      {/* Background patterns and glowing overlays */}
      <div className="absolute inset-0 amazigh-bg-subtle opacity-[0.15] pointer-events-none" />
      
      {/* Floating particles background layout */}
      <div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(196,98,45,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212,160,23,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Slowly floating Amazigh SVG designs in background */}
      <div className="absolute top-16 right-[12%] w-24 h-24 opacity-[0.03] pointer-events-none animate-[floatSlow_12s_infinite_ease-in-out]">
        <svg viewBox="0 0 100 100" fill="none" className="text-amber">
          <polygon points="50,5 95,50 50,95 5,50" stroke="currentColor" strokeWidth="2" />
          <polygon points="50,20 80,50 50,80 20,50" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-[8%] w-32 h-32 opacity-[0.03] pointer-events-none animate-[floatSlow_15s_infinite_ease-in-out_2s]">
        <svg viewBox="0 0 100 100" fill="none" className="text-terracotta">
          <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="currentColor" strokeWidth="2" />
          <path d="M10 50 H90 M50 10 V90" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section title */}
        <SectionReveal className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-amber/40" />
            <span className="font-accent italic text-amber text-base tracking-[0.15em] uppercase">
              Inzan · ⵉⵏⵣⴰⵏ
            </span>
            <div className="h-px w-8 bg-amber/40" />
          </div>
        </SectionReveal>

        <SectionReveal className="text-center mb-4" delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl text-warm-white">
            Sagesse{' '}
            <span className="font-accent italic text-warm-gradient">Kabyle</span>
          </h2>
        </SectionReveal>

        <SectionReveal className="text-center mb-12" delay={0.15}>
          <p className="text-sand/70 max-w-xl mx-auto text-base leading-relaxed">
            Inspirés par la transmission et le respect de nos racines, ces proverbes guident 
            l'âme et la convivialité de notre maison familiale.
          </p>
        </SectionReveal>

        <AmazighDivider color="#D4A017" className="mb-16 opacity-30" />

        {/* Proverbs Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {proverbs.map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group relative rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 transition-all duration-500 hover:translate-y-[-4px]"
              style={{
                background: 'rgba(250, 243, 232, 0.03)',
                border: '1px solid rgba(212, 160, 23, 0.08)',
                backdropFilter: 'blur(16px)',
              }}
              data-cursor-hover
            >
              {/* Card glowing borders on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  border: '1.5px solid rgba(212, 160, 23, 0.25)',
                  boxShadow: '0 10px 40px rgba(196, 98, 45, 0.08), inset 0 0 20px rgba(212, 160, 23, 0.03)',
                }}
              />

              {/* Left Column: Traditional Symbol */}
              <div className="flex-shrink-0 flex md:flex-col items-center justify-between md:justify-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-walnut/40 border border-amber/15 flex items-center justify-center shadow-inner group-hover:border-amber/30 transition-colors duration-500">
                  {item.symbol}
                </div>
                
                {/* Visual line decoration for desktop, hidden on mobile */}
                <div className="hidden md:block w-px h-full bg-gradient-to-b from-amber/20 to-transparent my-2" />

                {/* Badge Tag */}
                <span className="md:mt-auto text-[10px] uppercase tracking-widest font-accent text-amber/80 border border-amber/20 px-2.5 py-1 rounded-full bg-walnut/30">
                  {item.tag}
                </span>
              </div>

              {/* Right Column: Texts */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Tifinagh Character Background Accent */}
                <div className="font-serif text-[10px] text-amber/30 tracking-[0.2em] mb-2 select-none uppercase font-light">
                  {item.tifinagh}
                </div>

                {/* Kabyle Latin script */}
                <h3 className="font-serif text-xl md:text-2xl text-warm-white mb-2 leading-relaxed tracking-wide italic font-medium">
                  {item.latin}
                </h3>

                {/* French translation */}
                <p className="font-accent italic text-terracotta text-base mb-4 leading-relaxed font-light">
                  {item.translation}
                </p>

                {/* Deeper meaning / Wisdom */}
                <p className="text-sand/70 text-sm md:text-[13.5px] leading-relaxed font-light transition-colors duration-300 group-hover:text-sand/90">
                  {item.meaning}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tifinagh row at the bottom for final traditional touch */}
        <SectionReveal delay={0.4} className="mt-20">
          <TifinaghRow />
        </SectionReveal>
      </div>
    </section>
  );
};
