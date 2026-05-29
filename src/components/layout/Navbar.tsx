import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/* ─── nav links ─────────────────────────────────────────────────── */
const navLinks = [
  { href: '#accueil',  label: 'Accueil'  },
  { href: '#apropos',  label: 'À Propos' },
  { href: '#galerie',  label: 'Galerie'  },
  { href: '#services', label: 'Services' },
  { href: '#tarifs',   label: 'Tarifs'   },
  { href: '#contact',  label: 'Contact'  },
];

/* ─── active section via IntersectionObserver ───────────────────── */
function useActiveSection() {
  const [active, setActive] = useState('#accueil');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(href); },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

/* ─── Component ──────────────────────────────────────────────────── */
export const Navbar: React.FC<{ startAnimation?: boolean }> = ({ startAnimation = true }) => {
  // ✅ Initialize directly from window so first render is already correct — no flash
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > 60 : false
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered,  setHovered]  = useState<string | null>(null);

  /* bubble geometry for desktop */
  const [bubble, setBubble] = useState({ left: 0, width: 0, ready: false });
  const pillRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const listRef  = useRef<HTMLUListElement>(null);

  const activeSection = useActiveSection();
  const displayKey    = hovered ?? activeSection;

  /* ✅ useLayoutEffect — measures bubble synchronously before paint, no pop-in */
  const measureBubble = useCallback((key: string) => {
    const listEl = listRef.current;
    const itemEl = pillRefs.current[key];
    if (!listEl || !itemEl) return;
    const lr = listEl.getBoundingClientRect();
    const ir = itemEl.getBoundingClientRect();
    setBubble({ left: ir.left - lr.left, width: ir.width, ready: true });
  }, []);

  useLayoutEffect(() => { measureBubble(displayKey); }, [displayKey, measureBubble]);

  /* scroll detection — passive listener only, state already correct on mount */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, menuOpen ? 350 : 0);
  };

  /* ── shared pill style ───────────────────────────────────────── */
  const pillBg = scrolled
    ? 'rgba(30, 14, 5, 0.82)'
    : 'rgba(42, 21, 8, 0.52)';
  const pillBorder = scrolled
    ? '1px solid rgba(212,160,23,0.28)'
    : '1px solid rgba(212,160,23,0.14)';
  const pillShadow = scrolled
    ? '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(212,160,23,0.12)'
    : '0 4px 20px rgba(0,0,0,0.22), inset 0 1px 0 rgba(212,160,23,0.07)';

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          TOP BAR  (always visible, mobile + desktop)
      ════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={startAnimation ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          right:         0,
          zIndex:        9000,
          display:       'flex',
          justifyContent:'center',
          /* ✅ No CSS transition here — framer-motion owns this element */
          padding:       scrolled ? '8px 12px' : '14px 12px',
          pointerEvents: 'none',
          willChange:    'transform, opacity',
          opacity:       0,
          transform:     'translateY(-80px)',
        }}
      >
        <nav
          style={{
            pointerEvents: 'auto',
            display:       'flex',
            alignItems:    'center',
            width:         '100%',
            maxWidth:      '900px',
            padding:       '7px 7px 7px 16px',
            borderRadius:  '999px',
            gap:           '8px',
            willChange:    'background, box-shadow',
            /* ✅ CSS transitions only on the inner <nav> — safe, no framer conflict */
            transition:    'background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
            background:    scrolled ? 'rgba(22, 10, 3, 0.88)' : 'rgba(42, 21, 8, 0.52)',
            backdropFilter:       'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border:        scrolled
              ? '1px solid rgba(212,160,23,0.30)'
              : '1px solid rgba(212,160,23,0.14)',
            boxShadow:     scrolled
              ? '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,160,23,0.14)'
              : '0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(212,160,23,0.07)',
          }}
        >
          {/* ── Logo ── */}
          <a
            href="#accueil"
            onClick={(e) => handleNavClick(e, '#accueil')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}
          >
            <motion.div whileHover={{ rotate: 45 }} transition={{ type: 'spring', stiffness: 280, damping: 18 }}>
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                <polygon points="16,2 30,16 16,30 2,16" fill="none" stroke="#D4A017" strokeWidth="1.5" />
                <polygon points="16,8 24,16 16,24 8,16"  fill="none" stroke="#C4622D" strokeWidth="1"   />
                <circle  cx="16" cy="16" r="2.5"          fill="#D4A017" />
              </svg>
            </motion.div>
            <div style={{ lineHeight: 1 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", color: '#FDF8F0', fontSize: '15px', letterSpacing: '0.1em' }}>
                YEMMA
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#D4A017', fontSize: '15px', fontStyle: 'italic', marginLeft: '5px' }}>
                Ouardia
              </span>
            </div>
          </a>

          {/* ── Desktop nav links (hidden on mobile) ── */}
          <ul
            ref={listRef}
            onMouseLeave={() => setHovered(null)}
            style={{
              alignItems:     'center',
              listStyle:      'none',
              margin:         '0 auto',
              padding:        0,
              gap:            '2px',
              position:       'relative',
              flex:           1,
              justifyContent: 'center',
            }}
            className="hidden md:flex"
          >
            {/* sliding bubble */}
            {bubble.ready && (
              <motion.div
                aria-hidden
                animate={{ left: bubble.left, width: bubble.width }}
                initial={{ left: bubble.left, width: bubble.width }}
                transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.75 }}
                style={{
                  position:      'absolute',
                  top:           '2px',
                  height:        'calc(100% - 4px)',
                  borderRadius:  '999px',
                  background:    'linear-gradient(135deg, rgba(196,98,45,0.6) 0%, rgba(212,160,23,0.5) 100%)',
                  boxShadow:     '0 2px 14px rgba(196,98,45,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
                  border:        '1px solid rgba(212,160,23,0.35)',
                  pointerEvents: 'none',
                }}
              />
            )}

            {navLinks.map((link) => (
              <li
                key={link.href}
                ref={(el) => { pillRefs.current[link.href] = el; }}
                onMouseEnter={() => setHovered(link.href)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    display:       'block',
                    padding:       '7px 13px',
                    borderRadius:  '999px',
                    fontSize:      '11.5px',
                    fontWeight:    500,
                    fontFamily:    "'Inter', sans-serif",
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color:         displayKey === link.href ? '#FAF3E8' : 'rgba(253,248,240,0.58)',
                    transition:    'color 0.28s ease',
                    position:      'relative',
                    zIndex:        1,
                    whiteSpace:    'nowrap',
                    userSelect:    'none',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── CTA button (desktop only) ── */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-primary hidden md:flex"
            style={{
              alignItems:    'center',
              padding:       '8px 18px',
              borderRadius:  '999px',
              fontSize:      '11.5px',
              letterSpacing: '0.07em',
              textDecoration: 'none',
              flexShrink:    0,
              marginLeft:    '4px',
            }}
          >
            <span>Réserver</span>
          </a>

          {/* ── Hamburger (mobile only) ── */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="flex md:hidden"
            style={{
              marginLeft:    'auto',
              flexShrink:    0,
              alignItems:    'center',
              justifyContent: 'center',
              width:         '40px',
              height:        '40px',
              borderRadius:  '50%',
              border:        '1px solid rgba(212,160,23,0.25)',
              background:    'rgba(212,160,23,0.12)',
              color:         '#FDF8F0',
              cursor:        'pointer',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'x' : 'burger'}
                initial={{ rotate: -70, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1  }}
                exit={{    rotate:  70,  opacity: 0  }}
                transition={{ duration: 0.18 }}
                style={{ display: 'flex' }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════
          MOBILE DRAWER  (slides down from top, safe & solid)
      ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0   }}
            exit={{    opacity: 0, y: -20  }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:       'fixed',
              inset:          0,
              zIndex:         8999,
              display:        'flex',
              flexDirection:  'column',
              background:     'rgba(28, 12, 4, 0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              overflowY:      'auto',
            }}
          >
            {/* top spacer so content starts below the pill bar */}
            <div style={{ height: '80px', flexShrink: 0 }} />

            {/* close button row */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 20px 8px' }}>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  width:          '40px',
                  height:         '40px',
                  borderRadius:   '50%',
                  border:         '1px solid rgba(212,160,23,0.22)',
                  background:     'rgba(212,160,23,0.1)',
                  color:          '#FDF8F0',
                  cursor:         'pointer',
                }}
                aria-label="Fermer"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* decorative amber line */}
            <div style={{
              height:     '1px',
              margin:     '0 24px 32px',
              background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.4), transparent)',
            }} />

            {/* nav links */}
            <ul style={{ listStyle: 'none', padding: '0 24px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0    }}
                  exit={{    opacity: 0, x: -16   }}
                  transition={{ delay: i * 0.055 + 0.05, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      gap:            '14px',
                      padding:        '14px 18px',
                      borderRadius:   '14px',
                      textDecoration: 'none',
                      background:     activeSection === link.href
                        ? 'linear-gradient(135deg, rgba(196,98,45,0.22) 0%, rgba(212,160,23,0.15) 100%)'
                        : 'transparent',
                      border:         activeSection === link.href
                        ? '1px solid rgba(212,160,23,0.22)'
                        : '1px solid transparent',
                      transition:     'background 0.3s, border 0.3s',
                    }}
                  >
                    {/* dot indicator */}
                    <span style={{
                      width:        '6px',
                      height:       '6px',
                      borderRadius: '50%',
                      flexShrink:   0,
                      background:   activeSection === link.href ? '#D4A017' : 'rgba(212,160,23,0.25)',
                      transition:   'background 0.3s',
                    }} />
                    <span style={{
                      fontFamily:    "'Playfair Display', serif",
                      fontSize:      '26px',
                      color:         activeSection === link.href ? '#D4A017' : 'rgba(253,248,240,0.8)',
                      transition:    'color 0.3s',
                    }}>
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0   }}
              exit={{    opacity: 0          }}
              transition={{ delay: 0.42, duration: 0.4 }}
              style={{ padding: '28px 24px 40px' }}
            >
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-primary"
                style={{
                  display:        'flex',
                  justifyContent: 'center',
                  padding:        '14px 24px',
                  borderRadius:   '999px',
                  fontSize:       '13px',
                  letterSpacing:  '0.06em',
                  textDecoration: 'none',
                }}
              >
                <span>Réserver votre événement</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
};
