import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AmazighDivider } from '@/components/ui/AmazighDivider';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { GlassFilter, GlassDock } from '@/components/ui/liquid-glass';
import { staggerContainer, staggerItem, viewport } from '@/lib/animations';
import { Phone, MapPin, Clock, Send } from 'lucide-react';

// Social Icons as inline SVGs
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
  </svg>
);

const socialIcons = [
  {
    icon: <WhatsAppIcon />,
    alt: 'WhatsApp',
    label: 'WhatsApp',
    href: 'https://wa.me/213XXXXXXXXX',
  },
  {
    icon: <InstagramIcon />,
    alt: 'Instagram',
    label: 'Instagram',
    href: 'https://instagram.com/yemma.ouardia',
  },
  {
    icon: <FacebookIcon />,
    alt: 'Facebook',
    label: 'Facebook',
    href: 'https://facebook.com/yemmaouardia',
  },
  {
    icon: <TikTokIcon />,
    alt: 'TikTok',
    label: 'TikTok',
    href: 'https://tiktok.com/@yemmaouardia',
  },
  {
    icon: <Phone size={32} />,
    alt: 'Téléphone',
    label: 'Appeler',
    href: 'tel:+213XXXXXXXXX',
  },
];

export const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    event: '',
    date: '',
    guests: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative section-padding overflow-hidden"
      style={{
        background: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop') center/cover no-repeat`,
      }}
    >
      {/* GlassFilter SVG for liquid glass effect */}
      <GlassFilter />

      {/* Dark warm overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(42,21,8,0.93) 0%, rgba(61,33,16,0.90) 100%)',
        }}
      />
      <div className="absolute inset-0 amazigh-bg-subtle opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <SectionReveal className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-amber/40" />
            <span className="font-accent italic text-amber text-base tracking-[0.15em]">
              Prenez Contact
            </span>
            <div className="h-px w-8 bg-amber/40" />
          </div>
        </SectionReveal>
        <SectionReveal className="text-center mb-4" delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl text-warm-white">
            Réservez Votre{' '}
            <span className="font-accent italic text-amber">Événement</span>
          </h2>
        </SectionReveal>
        <SectionReveal className="text-center mb-12" delay={0.15}>
          <p className="text-sand/60 max-w-xl mx-auto text-base leading-relaxed">
            Notre équipe vous répond dans les 24 heures pour construire ensemble
            l'événement de vos rêves.
          </p>
        </SectionReveal>

        <AmazighDivider color="#D4A017" className="mb-14 opacity-30" />



        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-10"
          >
            <h3 className="font-serif text-3xl text-warm-white text-center mb-2">
              Informations de Contact
            </h3>

            {/* Info cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <Phone size={20} />,
                  title: 'Téléphone / WhatsApp',
                  value: '+213 XX XX XX XX',
                  sub: 'Disponible 7j/7 · 9h – 21h',
                },
                {
                  icon: <MapPin size={20} />,
                  title: 'Adresse',
                  value: 'Tizi Ouzou, Algérie',
                  sub: 'Wilaya de Tizi Ouzou',
                },
                {
                  icon: <Clock size={20} />,
                  title: 'Horaires de visite',
                  value: 'Lun – Ven : 9h – 18h',
                  sub: 'Sam – Dim : sur rendez-vous',
                },
              ].map((info) => (
                <motion.div
                  key={info.title}
                  variants={staggerItem}
                  className="flex items-start gap-4 p-6 rounded-2xl h-full"
                  style={{
                    background: 'rgba(250,243,232,0.06)',
                    border: '1px solid rgba(212,160,23,0.12)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(196,98,45,0.2)' }}
                  >
                    <span className="text-terracotta">{info.icon}</span>
                  </div>
                  <div>
                    <div className="text-sand/50 text-xs tracking-wider uppercase mb-1">
                      {info.title}
                    </div>
                    <div className="text-warm-white font-medium text-sm md:text-base leading-snug">{info.value}</div>
                    <div className="text-sand/50 text-xs mt-1">{info.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Proverb Quote (Little, above map) */}
            <div className="text-center mt-6 mb-2 max-w-2xl mx-auto px-4">
              <span className="inline-block text-amber/30 text-2xl font-serif leading-none select-none">“</span>
              <p className="font-serif text-warm-white italic text-lg md:text-xl inline px-2 font-medium">
                Afus deg ufus, taɛekkemt tẓayen ad tifsus.
              </p>
              <span className="inline-block text-amber/30 text-2xl font-serif leading-none select-none">”</span>
              <div className="text-amber/70 font-accent italic text-xs md:text-sm mt-1 select-none">
                « Main dans la main, la charge lourde devient légère »
              </div>
              <p className="text-sand/35 text-[9px] uppercase tracking-[0.22em] mt-1.5 select-none font-medium">Inzan · ⵉⵏⵣⴰⵏ · Sagesse Kabyle</p>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-[2rem] overflow-hidden shadow-xl border border-white/5 h-[320px] max-w-3xl mx-auto w-full relative group" style={{ height: '320px' }}>
              <iframe
                src="https://maps.google.com/maps?q=Ets%20amani%20salle%20des%20f%C3%AAtes%20yamma%20ouardia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'saturate(0.9) contrast(1.05)' }}
                title="Localisation YEMMA-Ouardia"
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href="https://maps.app.goo.gl/SScgXtaR2Ggn5DGv8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-105 transition-transform duration-300"
                >
                  <span>Ouvrir sur Google Maps</span>
                </a>
              </div>
            </div>

            {/* Social Dock — Liquid Glass (Under Map) */}
            <div className="flex justify-center mt-6">
              <GlassDock icons={socialIcons} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
