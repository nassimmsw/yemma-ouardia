import React from 'react';
import { motion } from 'framer-motion';
import { AmazighDivider } from '@/components/ui/AmazighDivider';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, viewport } from '@/lib/animations';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Essentiel',
    price: '80 000',
    period: 'DA / événement',
    description: 'Idéal pour les célébrations intimes et familiales',
    color: '#6B7A3E',
    features: [
      'Salle pour 200 personnes',
      'Mobilier de base inclus',
      'Éclairage standard',
      'Parking disponible',
      'Vestiaires',
      'Assistance le jour J',
    ],
    highlighted: false,
  },
  {
    name: 'Prestige',
    price: '150 000',
    period: 'DA / événement',
    description: 'Notre formule la plus populaire — élégance et chaleur',
    color: '#C4622D',
    features: [
      'Salle pour 500 personnes',
      'Mobilier premium inclus',
      'Éclairage ambiance chaleureuse',
      'Décoration de base incluse',
      'Parking privatif',
      'Coordinateur dédié',
      'Salle de préparation',
      'Espace VIP pour la famille',
    ],
    highlighted: true,
  },
  {
    name: 'Royal',
    price: '250 000',
    period: 'DA / événement',
    description: 'L\'excellence absolue pour vos moments les plus précieux',
    color: '#D4A017',
    features: [
      'Salle complète — 800 personnes',
      'Mobilier et décoration luxe',
      'Éclairage cinématographique',
      'Décoration complète',
      'Parking + voiturier',
      'Équipe d\'organisation complète',
      'Salle des mariés privative',
      'Terrasse extérieure',
      'Traiteur recommandé',
    ],
    highlighted: false,
  },
];

export const Pricing: React.FC = () => {
  return (
    <section
      id="tarifs"
      className="relative section-padding overflow-hidden amazigh-bg-pattern"
      style={{ background: '#FAF3E8' }}
    >
      {/* Warm glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(196,98,45,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <SectionReveal className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-terracotta/40" />
            <span className="font-accent italic text-terracotta text-base tracking-[0.15em]">
              Formules & Tarifs
            </span>
            <div className="h-px w-8 bg-terracotta/40" />
          </div>
        </SectionReveal>
        <SectionReveal className="text-center mb-4" delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl text-walnut">
            Choisissez Votre{' '}
            <span className="font-accent italic text-warm-gradient">Formule</span>
          </h2>
        </SectionReveal>
        <SectionReveal className="text-center mb-12" delay={0.15}>
          <p className="text-walnut/60 max-w-xl mx-auto text-base leading-relaxed">
            Des tarifs transparents, des prestations soignées. Chaque formule peut être
            personnalisée selon vos besoins.
          </p>
        </SectionReveal>

        <AmazighDivider className="mb-14" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              className={`relative rounded-3xl overflow-hidden card-warm flex flex-col ${
                plan.highlighted ? 'md:-mt-6 md:mb-0' : ''
              }`}
              style={{
                background: plan.highlighted
                  ? `linear-gradient(145deg, rgba(196,98,45,0.12) 0%, rgba(250,243,232,0.95) 100%)`
                  : 'rgba(250,243,232,0.8)',
                border: plan.highlighted
                  ? `1.5px solid rgba(196,98,45,0.4)`
                  : '1px solid rgba(196,98,45,0.12)',
                backdropFilter: 'blur(12px)',
              }}
              data-cursor-hover
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{ background: plan.color }}
              />

              {/* Popular badge */}
              {plan.highlighted && (
                <div
                  className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-warm-white font-medium tracking-wider"
                  style={{ background: plan.color }}
                >
                  <Star size={10} fill="currentColor" />
                  Populaire
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-5">
                  <h3 className="font-serif text-2xl text-walnut mb-0.5">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl md:text-5xl" style={{ color: plan.color }}>
                      {plan.price}
                    </span>
                    <span className="text-walnut/50 text-sm">{plan.period}</span>
                  </div>
                </div>

                <p className="text-walnut/60 text-sm mb-6 leading-relaxed">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${plan.color}22` }}
                      >
                        <Check size={10} style={{ color: plan.color }} />
                      </div>
                      <span className="text-walnut/70 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full text-center py-3.5 rounded-2xl text-sm font-medium tracking-wider transition-all duration-400 ${
                    plan.highlighted
                      ? 'btn-primary'
                      : 'border text-walnut/80 hover:border-opacity-100'
                  }`}
                  style={
                    !plan.highlighted
                      ? {
                          borderColor: `${plan.color}50`,
                          background: `${plan.color}0D`,
                        }
                      : {}
                  }
                >
                  <span>Choisir cette formule</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <SectionReveal className="text-center mt-10" delay={0.2}>
          <p className="text-walnut/45 text-sm">
            * Tous les tarifs sont indicatifs et peuvent être adaptés selon la saison et vos besoins spécifiques.
            Contactez-nous pour un devis personnalisé.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
};
