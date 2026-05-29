import React from 'react';
import { motion } from 'framer-motion';
import { AmazighDivider } from '@/components/ui/AmazighDivider';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, viewport } from '@/lib/animations';
import { Heart, Gem, Users, Star, Briefcase } from 'lucide-react';

const services = [
  {
    icon: <Heart size={26} />,
    title: 'Mariages',
    description:
      "Votre jour le plus précieux mérite un cadre à la hauteur de vos rêves. Nous créons une atmosphère chaleureuse et mémorable pour votre union.",
    capacity: 'Jusqu\'à 800 personnes',
    color: '#C4622D',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: <Gem size={26} />,
    title: 'Fiançailles',
    description:
      "Commencez votre histoire d'amour avec élégance dans un espace intime et romantique, sublimé par des touches de tradition familiale.",
    capacity: 'Jusqu\'à 400 personnes',
    color: '#D4A017',
    img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: <Users size={26} />,
    title: 'Fêtes Familiales',
    description:
      "Anniversaires, baptêmes, retrouvailles — célébrez les liens qui comptent dans un espace accueillant et chaleureux, comme à la maison.",
    capacity: 'Jusqu\'à 500 personnes',
    color: '#6B7A3E',
    img: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: <Star size={26} />,
    title: 'Cérémonies Traditionnelles',
    description:
      "Henné, Afruj, cérémonies familiales — honorez vos traditions avec un décor élégant et chaleureux.",
    capacity: 'Jusqu\'à 600 personnes',
    color: '#D4785A',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: <Briefcase size={26} />,
    title: 'Événements Corporate',
    description:
      "Séminaires, conférences, soirées d'entreprise — un cadre professionnel et élégant pour vos événements d'affaires.",
    capacity: 'Jusqu\'à 300 personnes',
    color: '#5C3A1E',
    img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800&auto=format&fit=crop',
  },
];

export const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="relative section-padding overflow-hidden"
      style={{ background: '#2A1508' }}
    >
      {/* Amazigh pattern bg */}
      <div className="absolute inset-0 amazigh-bg-subtle opacity-20 pointer-events-none" />

      {/* Warm radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(212,160,23,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <SectionReveal className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-amber/40" />
            <span className="font-accent italic text-amber text-base tracking-[0.15em]">
              Ce que nous offrons
            </span>
            <div className="h-px w-8 bg-amber/40" />
          </div>
        </SectionReveal>
        <SectionReveal className="text-center mb-4" delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl text-warm-white">
            Nos{' '}
            <span className="font-accent italic text-amber">Événements</span>
          </h2>
        </SectionReveal>
        <SectionReveal className="text-center mb-12" delay={0.15}>
          <p className="text-sand/60 max-w-xl mx-auto text-base leading-relaxed">
            De l'intime au grandiose — chaque célébration est accueillie avec le même soin
            et la même passion.
          </p>
        </SectionReveal>

        <AmazighDivider color="#D4A017" className="mb-14 opacity-30" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              className="relative group rounded-3xl overflow-hidden card-warm"
              style={{
                gridColumn: i === 4 ? 'span 1 / span 1' : undefined,
              }}
              data-cursor-hover
            >
              {/* Background image */}
              <div className="absolute inset-0 img-zoom">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(180deg, rgba(42,21,8,0.2) 0%, rgba(42,21,8,0.85) 100%)`,
                }}
              />

              {/* Colored accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
                style={{ background: service.color }}
              />

              {/* Content */}
              <div className="relative z-10 p-7 min-h-[280px] flex flex-col justify-end">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-warm-white/90 group-hover:scale-110 transition-transform duration-400"
                  style={{ background: `${service.color}33`, border: `1px solid ${service.color}44` }}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl text-warm-white mb-1">
                  {service.title}
                </h3>

                {/* Description — visible on hover */}
                <p className="text-warm-white/70 text-sm leading-relaxed mb-4 transition-all duration-500 max-h-0 group-hover:max-h-32 overflow-hidden">
                  {service.description}
                </p>

                {/* Capacity badge */}
                <div
                  className="inline-flex items-center gap-2 text-xs tracking-wider px-3 py-1.5 rounded-full self-start"
                  style={{
                    background: `${service.color}22`,
                    border: `1px solid ${service.color}44`,
                    color: service.color === '#C4622D' ? '#D4785A' : service.color,
                  }}
                >
                  <Users size={11} />
                  {service.capacity}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
