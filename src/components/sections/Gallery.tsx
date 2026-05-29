import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AmazighDivider } from '@/components/ui/AmazighDivider';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, viewport } from '@/lib/animations';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1798&auto=format&fit=crop',
    alt: 'Grande salle de réception',
    category: 'Espace',
    description: 'Une salle majestueuse sous des lumières chaleureuses, prête à accueillir vos plus beaux souvenirs.',
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1469&auto=format&fit=crop',
    alt: 'Décoration florale',
    category: 'Design',
    description: 'Des compositions florales délicates et raffinées, accordées à l’élégance de votre thème.',
  },
  {
    src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=1470&auto=format&fit=crop',
    alt: 'Table de banquet',
    category: 'Gastronomie',
    description: 'Une mise en place somptueuse célébrant la convivialité et le raffinement gastronomique.',
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1469&auto=format&fit=crop',
    alt: 'Cérémonie de mariage',
    category: 'Célébration',
    description: 'Le théâtre de vos vœux les plus précieux, conçu pour sublimer chaque instant.',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop',
    alt: 'Ambiance chaleureuse',
    category: 'Atmosphère',
    description: 'Un éclairage tamisé créant une atmosphère intime et magique pour tous vos invités.',
  },
  {
    src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1470&auto=format&fit=crop',
    alt: 'Fête traditionnelle',
    category: 'Héritage',
    description: 'La richesse de nos traditions célébrée avec élégance et modernité.',
  },
];

// Cloned list of images for infinite scroll (total 18 items for 6 source images)
const tripleImages = [...images, ...images, ...images];

export const Gallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [closestScrollIndex, setClosestScrollIndex] = useState(images.length);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  
  // Drag to scroll on desktop states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const currentScrollLeft = container.scrollLeft;
    const children = container.children;

    if (children.length < images.length * 3) return;

    // Find the child closest to center of container
    const containerCenter = currentScrollLeft + container.clientWidth / 2;
    let closestIndex = images.length;
    let minDistance = Infinity;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      if (!child.classList.contains('gallery-card')) continue;

      const cardCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    setClosestScrollIndex(closestIndex);
    setActiveIndex(closestIndex % images.length);

    // Dynamic set width calculation
    const setWidth = (children[images.length] as HTMLElement).offsetLeft - (children[0] as HTMLElement).offsetLeft;

    // Boundary snap markers
    const firstSetEndIndex = images.length - 1;
    const thirdSetStartIndex = images.length * 2;

    if (closestIndex <= firstSetEndIndex) {
      // Loop seamlessly forward to the middle set
      container.scrollLeft += setWidth;
    } else if (closestIndex >= thirdSetStartIndex) {
      // Loop seamlessly backward to the middle set
      container.scrollLeft -= setWidth;
    }

    // Scroll progress bar logic relative to middle set
    const cardWidth = (children[0] as HTMLElement).clientWidth;
    const middleSetStartScroll = (children[images.length] as HTMLElement).offsetLeft - (container.clientWidth - cardWidth) / 2;
    const middleSetEndScroll = (children[images.length * 2 - 1] as HTMLElement).offsetLeft - (container.clientWidth - cardWidth) / 2;
    const progressRange = middleSetEndScroll - middleSetStartScroll;

    if (progressRange > 0) {
      const currentProgressScroll = container.scrollLeft - middleSetStartScroll;
      const progress = Math.max(0, Math.min(100, (currentProgressScroll / progressRange) * 100));
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initScroll = () => {
      if (container.children.length >= images.length * 3) {
        const targetCard = container.children[images.length] as HTMLElement;
        if (targetCard) {
          const scrollPosition = targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;
          container.scrollLeft = scrollPosition;
          setClosestScrollIndex(images.length);
        }
      }
    };

    // Run initial centering with a layout paint delay
    const timer = setTimeout(initScroll, 50);

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToDotIndex = (dotIdx: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const children = container.children;
    const targetIndex = images.length + dotIdx;
    const targetCard = children[targetIndex] as HTMLElement;
    if (targetCard) {
      const scrollPosition = targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollNext = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const children = container.children;
    
    // Smooth scroll forward to relative next item
    const targetIndex = closestScrollIndex + 1;
    const targetCard = children[targetIndex] as HTMLElement;
    if (targetCard) {
      const scrollPosition = targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollPrev = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const children = container.children;
    
    // Smooth scroll backward to relative prev item
    const targetIndex = closestScrollIndex - 1;
    const targetCard = children[targetIndex] as HTMLElement;
    if (targetCard) {
      const scrollPosition = targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  // Mouse drag control triggers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    dragStartPos.current = { x: e.pageX, y: e.pageY };
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag scroll velocity modifier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (e: React.MouseEvent, index: number) => {
    setIsDragging(false);
    
    const deltaX = Math.abs(e.pageX - dragStartPos.current.x);
    const deltaY = Math.abs(e.pageY - dragStartPos.current.y);

    // High fidelity distance checks to separate swipe actions from click actions
    if (deltaX < 6 && deltaY < 6) {
      handleCardClick(index);
    }
  };

  const handleCardClick = (index: number) => {
    if (index === closestScrollIndex) {
      setLightbox(index % images.length);
    } else {
      // Direct scroll to centered clicked card
      if (!containerRef.current) return;
      const container = containerRef.current;
      const card = container.children[index] as HTMLElement;
      if (card) {
        const scrollPosition = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const closeLightbox = () => setLightbox(null);
  const prevLightbox = () =>
    setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const nextLightbox = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <section
      id="galerie"
      className="relative section-padding overflow-hidden select-none"
      style={{ background: 'linear-gradient(180deg, #FAF3E8 0%, #F0E6D2 100%)' }}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionReveal className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-terracotta/40" />
            <span className="font-accent italic text-terracotta text-base tracking-[0.15em]">
              Notre Espace
            </span>
            <div className="h-px w-8 bg-terracotta/40" />
          </div>
        </SectionReveal>
        <SectionReveal className="text-center mb-4" delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl text-walnut">
            La Beauté de{' '}
            <span className="font-accent italic text-warm-gradient">YEMMA-Ouardia</span>
          </h2>
        </SectionReveal>
        <SectionReveal className="text-center mb-10" delay={0.15}>
          <p className="text-walnut/60 max-w-xl mx-auto text-base leading-relaxed">
            Chaque recoin de notre salle a été pensé pour créer une atmosphère chaleureuse,
            élégante et raffinée.
          </p>
        </SectionReveal>

        <AmazighDivider className="mb-10" />
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-none px-0 overflow-hidden">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar py-6 scroll-smooth px-[12.5vw] sm:px-[25vw] lg:px-[32.5vw]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {tripleImages.map((img, i) => {
            const isActive = i === closestScrollIndex;
            const originalIndex = i % images.length;
            return (
              <div
                key={i}
                data-index={i}
                onMouseUp={(e) => handleMouseUp(e, i)}
                className={`gallery-card relative shrink-0 snap-center rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing w-[75vw] sm:w-[50vw] lg:w-[35vw] aspect-[4/5] md:aspect-[3/4] transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1) ${
                  isActive
                    ? 'scale-100 opacity-100 shadow-warm-lg shadow-terracotta/15 border border-amber/30'
                    : 'scale-90 opacity-40 blur-[1px]'
                }`}
                data-cursor-hover
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable="false"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 select-none pointer-events-none"
                />

                {/* Soft glow edge on active */}
                {isActive && (
                  <div className="absolute inset-0 border-[3px] border-amber/15 rounded-3xl pointer-events-none z-10" />
                )}

                {/* Glassmorphic Caption Card */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-walnut/90 via-walnut/50 to-transparent transition-all duration-500 z-20 ${
                    isActive
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6 pointer-events-none'
                  }`}
                >
                  <span className="inline-block px-3 py-1 mb-3 text-[10px] uppercase font-accent tracking-widest text-amber border border-amber/30 rounded-full bg-deep-brown/40 backdrop-blur-md">
                    {img.category}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-cream mb-2 leading-tight">
                    {img.alt}
                  </h3>
                  <p className="text-cream/80 text-xs md:text-sm font-light leading-relaxed max-w-md">
                    {img.description}
                  </p>
                </div>

                {/* Corner accent for premium details */}
                <div className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full transition-all duration-500 z-10 ${
                  isActive ? 'bg-amber shadow-amber/60 scale-100' : 'bg-transparent scale-50'
                }`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Tracker & Controls */}
      <div className="max-w-xl mx-auto px-6 mt-6 md:mt-8">
        <div className="flex flex-col items-center gap-6">
          {/* Progress bar track */}
          <div className="relative w-full h-[3px] bg-terracotta/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-terracotta to-amber transition-all duration-300 ease-out rounded-full"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Navigation Controls & Pagination */}
          <div className="flex items-center justify-between w-full">
            {/* Custom Numeric Indicator */}
            <div className="font-accent text-lg italic text-walnut/70 tracking-widest">
              <span className="text-terracotta font-medium font-serif">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="mx-2 text-walnut/20">/</span>
              <span className="font-serif">
                {String(images.length).padStart(2, '0')}
              </span>
            </div>

            {/* Micro Dot Indicators */}
            <div className="flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToDotIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === activeIndex
                      ? 'w-5 bg-terracotta'
                      : 'w-1.5 bg-terracotta/20 hover:bg-terracotta/50'
                  }`}
                  aria-label={`Aller à l'image ${i + 1}`}
                />
              ))}
            </div>

            {/* Circular Arrow Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border border-terracotta/20 text-walnut flex items-center justify-center hover:bg-terracotta hover:text-cream transition-all duration-300 backdrop-blur-sm shadow-sm"
                aria-label="Image précédente"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full border border-terracotta/20 text-walnut flex items-center justify-center hover:bg-terracotta hover:text-cream transition-all duration-300 backdrop-blur-sm shadow-sm"
                aria-label="Image suivante"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightbox].src}
                alt={images[lightbox].alt}
                className="w-full h-full object-contain rounded-2xl select-none"
                style={{ maxHeight: '85vh' }}
              />
              
              {/* Top Details & Close button */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50">
                <div className="px-4 py-2 rounded-full bg-walnut/60 backdrop-blur-md text-warm-white text-xs font-accent tracking-widest border border-amber/15">
                  {images[lightbox].category.toUpperCase()} | {images[lightbox].alt}
                </div>
                <button
                  onClick={closeLightbox}
                  className="w-10 h-10 rounded-full bg-walnut/60 text-warm-white flex items-center justify-center hover:bg-terracotta transition-colors backdrop-blur-md border border-amber/15"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Controls */}
              <button
                onClick={prevLightbox}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-walnut/60 text-warm-white flex items-center justify-center hover:bg-terracotta transition-colors backdrop-blur-md border border-amber/15"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextLightbox}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-walnut/60 text-warm-white flex items-center justify-center hover:bg-terracotta transition-colors backdrop-blur-md border border-amber/15"
              >
                <ChevronRight size={18} />
              </button>
              
              {/* Bottom Pagination */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-walnut/60 backdrop-blur-md text-warm-white/70 text-xs font-serif border border-amber/15">
                {lightbox + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
