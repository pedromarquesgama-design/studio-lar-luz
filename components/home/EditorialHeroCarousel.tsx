'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';

export interface PlaygroundSlide {
  id: number;
  category: string;
  title: string;
  subtitleLine1: string;
  subtitleLine2: string;
  credit: string;
  image: string;
  secondaryImage?: string;
  ctaLink: string;
}

const PLAYGROUND_SLIDES: PlaygroundSlide[] = [
  {
    id: 1,
    category: 'STUDIO EDITORIAL',
    title: 'PANELAS ESMALTADAS',
    subtitleLine1: 'FERRO FUNDIDO',
    subtitleLine2: 'EDIÇÃO 2026',
    credit: 'CURATED BY LAR & LUZ',
    image: 'https://images.unsplash.com/photo-1584990347449-399b24479904?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85',
    ctaLink: '/colecoes/cozinha',
  },
  {
    id: 2,
    category: 'MESA POSTA ARTESANAL',
    title: 'LOUÇAS & FAQUEIROS',
    subtitleLine1: 'DOURADO FOSCO',
    subtitleLine2: 'CERÂMICA ATEMPORAL',
    credit: 'DESIGN BRASILEIRO',
    image: 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=1600&q=85',
    ctaLink: '/colecoes/mesa-posta',
  },
  {
    id: 3,
    category: 'RITUAL & ACONCHEGO',
    title: 'CERÂMICAS ORGÂNICAS',
    subtitleLine1: 'QUEIMA 1240°C',
    subtitleLine2: 'FEITO À MÃO',
    credit: 'EXCELÊNCIA EM PRODUÇÃO',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=85',
    ctaLink: '/colecoes/cafes-e-copos',
  },
];

export const EditorialHeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const slide = PLAYGROUND_SLIDES[currentIndex];

  // Initial setup on mount
  useEffect(() => {
    if (mainImageRef.current) {
      gsap.set(mainImageRef.current, { opacity: 1, x: 0, scale: 1 });
    }
    if (secondaryImageRef.current) {
      gsap.set(secondaryImageRef.current, { opacity: 1, x: 0, scale: 1 });
    }
    if (textContainerRef.current) {
      const lines = textContainerRef.current.querySelectorAll('.reveal-line-inner');
      gsap.set(lines, { y: '0%' });
    }
  }, []);

  const animateSlideChange = useCallback(
    (nextIndex: number, direction: 'next' | 'prev' = 'next') => {
      if (isAnimatingRef.current || !textContainerRef.current || !mainImageRef.current) return;
      isAnimatingRef.current = true;

      const lines = textContainerRef.current.querySelectorAll('.reveal-line-inner');
      const slideXOut = direction === 'next' ? -80 : 80;
      const slideXIn = direction === 'next' ? 80 : -80;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      // 1. Outgoing animations: text drops, images slide out horizontally
      tl.to(lines, {
        y: '100%',
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.03,
        onComplete: () => {
          setCurrentIndex(nextIndex);
        },
      });

      tl.to(
        mainImageRef.current,
        {
          x: slideXOut,
          opacity: 0.2,
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        '<'
      );

      if (secondaryImageRef.current) {
        tl.to(
          secondaryImageRef.current,
          {
            x: slideXOut * 0.5,
            opacity: 0,
            duration: 0.3,
          },
          '<'
        );
      }

      // 2. Reset position for incoming slide
      tl.set(mainImageRef.current, { x: slideXIn, opacity: 0 });
      if (secondaryImageRef.current) {
        tl.set(secondaryImageRef.current, { x: slideXIn * 0.5, opacity: 0 });
      }

      // 3. Incoming image slide & scale in
      tl.to(mainImageRef.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
      });

      if (secondaryImageRef.current) {
        tl.to(
          secondaryImageRef.current,
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
          },
          '<'
        );
      }

      // 4. Text reveal upwards
      tl.to(
        lines,
        {
          y: '0%',
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.05,
        },
        '-=0.5'
      );

      // Reset progress bar animation
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: '0%' },
          { width: '100%', duration: 6.5, ease: 'none' }
        );
      }
    },
    []
  );

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % PLAYGROUND_SLIDES.length;
    animateSlideChange(nextIndex, 'next');
  }, [currentIndex, animateSlideChange]);

  const goToPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + PLAYGROUND_SLIDES.length) % PLAYGROUND_SLIDES.length;
    animateSlideChange(prevIndex, 'prev');
  }, [currentIndex, animateSlideChange]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      const dir = index > currentIndex ? 'next' : 'prev';
      animateSlideChange(index, dir);
    },
    [currentIndex, animateSlideChange]
  );

  // Auto-advance timer
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { width: '0%' },
        { width: '100%', duration: 6.5, ease: 'none' }
      );
    }

    const timer = setInterval(() => {
      goToNext();
    }, 6500);

    return () => clearInterval(timer);
  }, [currentIndex, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) goToNext();
    if (diff < -50) goToPrev();
    setTouchStart(null);
  };

  // Mouse move handler for crosshair trailing cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (cursorRef.current) {
      gsap.to(cursorRef.current, { x, y, duration: 0.15, ease: 'power2.out' });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[480px] lg:min-h-[540px] max-h-[620px] bg-[#f4f4f2] text-[#1a1a1a] overflow-hidden flex flex-col justify-between font-times select-none"
      style={
        {
          '--bg-color': '#f4f4f2',
          '--accent-card': '#B56339',
          '--accent-text': '#B56339',
          '--text-main': '#1a1a1a',
          '--text-muted': '#888888',
          '--font-heading': "'Times New Roman', Times, serif",
        } as React.CSSProperties
      }
    >
      {/* ── Background Animated Grid Pattern — Underneath Everything ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatedGridPattern
          numSquares={45}
          maxOpacity={0.25}
          duration={3}
          repeatDelay={0.5}
          className="stroke-[#1a1a1a]/10 fill-[#B56339]/20 [mask-image:radial-gradient(850px_circle_at_center,white,transparent)]"
        />
      </div>

      {/* ── Top Perimeter Header ─────────────────────────────── */}
      <header className="relative z-40 w-full px-6 lg:px-12 py-4 flex items-center justify-between text-[11px] font-times tracking-widest uppercase text-[#1a1a1a]">
        <div className="flex items-center gap-3 font-semibold tracking-widest text-[#B56339]">
          <span className="w-8 h-[1.5px] bg-[#B56339] inline-block" />
          <span>TEMPORADA DE ACOLHIMENTO</span>
        </div>

        <Link
          href="/colecoes"
          className="text-[#B56339] font-bold hover:underline transition-all cursor-pointer"
        >
          MENU
        </Link>
      </header>

      {/* ── Center Hero Canvas Stage (3-Column Compact Layout) ─── */}
      <div
        onClick={goToNext}
        className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between cursor-pointer group py-2"
      >
        {/* Left Column: Terracotta Square Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-30 w-[150px] sm:w-[200px] lg:w-[230px] h-[150px] sm:h-[200px] lg:h-[230px] aspect-square bg-[#B56339] text-white p-4 sm:p-5 flex flex-col justify-between shadow-2xl rounded-xs shrink-0 pointer-events-auto -mr-6 sm:-mr-10 lg:-mr-12"
        >
          <div>
            <span className="text-[9px] font-times tracking-widest uppercase text-[#FFD6B8] font-semibold block mb-0.5">
              ESTUDIO DE DESIGN
            </span>
            <span className="text-[10px] font-times tracking-widest uppercase text-[#FFD6B8] font-bold">
              CURADORIA EXCLUSIVA
            </span>
          </div>

          <div className="space-y-0.5 font-times font-bold tracking-wider text-xs sm:text-lg lg:text-xl uppercase leading-tight text-white">
            <div className="block">ART</div>
            <div className="block text-[#FFD6B8]">WORKS</div>
            <div className="block">ONLINE</div>
            <div className="block">COLLECTION</div>
          </div>

          <div className="text-[9px] font-times tracking-widest uppercase text-white/80 border-t border-white/20 pt-1.5">
            CURATED IN BRAZIL
          </div>
        </div>

        {/* Center Column: Image Stage */}
        <div className="relative flex-1 flex items-center justify-center min-h-[260px] sm:min-h-[320px] lg:min-h-[360px]">
          {/* Secondary Layered Background Image */}
          {slide.secondaryImage && (
            <div
              ref={secondaryImageRef}
              className="absolute left-[5%] lg:left-[10%] top-[-5%] w-[190px] sm:w-[250px] lg:w-[300px] h-[250px] sm:h-[330px] lg:h-[390px] aspect-[3/4] rounded-sm overflow-hidden shadow-md opacity-90 transition-transform duration-700 pointer-events-none z-10"
            >
              <Image
                src={slide.secondaryImage}
                alt="Background Layer"
                fill
                unoptimized
                priority
                sizes="300px"
                className="object-cover"
              />
            </div>
          )}

          {/* Primary Main Image Frame */}
          <div
            ref={mainImageRef}
            className="relative w-[250px] sm:w-[360px] lg:w-[440px] h-[185px] sm:h-[270px] lg:h-[330px] aspect-[4/3] rounded-sm overflow-hidden shadow-2xl bg-charcoal/10 z-20"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              unoptimized
              priority
              sizes="(max-width: 1024px) 100vw, 440px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Column: Pure Right-Aligned Words */}
        <div
          ref={textContainerRef}
          onClick={(e) => e.stopPropagation()}
          className="w-[170px] sm:w-[230px] lg:w-[270px] shrink-0 text-right space-y-2 z-30 pointer-events-auto -ml-6 sm:-ml-10 lg:-ml-12"
        >
          {/* Category / Interview Tag */}
          <div className="overflow-hidden py-0.5 flex justify-end">
            <span className="reveal-line-inner block text-[9px] font-times tracking-widest uppercase text-[#55534F] font-semibold text-right">
              {slide.category}
            </span>
          </div>

          {/* Main Title */}
          <div className="overflow-hidden py-0.5">
            <h2 className="reveal-line-inner text-lg sm:text-xl lg:text-2xl font-times font-bold uppercase tracking-tight text-[#1a1a1a] leading-none text-right">
              {slide.title}
            </h2>
          </div>

          {/* Accent Terracotta Subtitle Lines */}
          <div className="overflow-hidden py-0.5">
            <div className="reveal-line-inner text-sm sm:text-base lg:text-lg font-times font-bold uppercase tracking-wide text-[#B56339] leading-tight text-right">
              <div>{slide.subtitleLine1}</div>
              <div>{slide.subtitleLine2}</div>
            </div>
          </div>

          {/* Credit Tag */}
          <div className="overflow-hidden py-0.5 pt-1">
            <span className="reveal-line-inner block text-[9px] font-times tracking-widest uppercase text-[#888888] text-right border-t border-charcoal/10 pt-1.5">
              {slide.credit}
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom Perimeter Footer with Image Slider Controls ── */}
      <footer className="relative z-40 w-full px-6 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-times tracking-widest uppercase text-[#888888]">
        {/* Left: Discover + Slide Counter */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-[#1a1a1a]">DISCOVER</span>
          <span className="text-[#1a1a1a]/30">|</span>
          <span className="text-[#B56339] font-bold">
            0{currentIndex + 1} / 0{PLAYGROUND_SLIDES.length}
          </span>
        </div>

        {/* Center: Slide Progress Bar & Number Tabs */}
        <div className="flex items-center gap-4">
          <div className="w-28 sm:w-40 h-1 bg-[#1a1a1a]/10 rounded-full overflow-hidden">
            <div ref={progressBarRef} className="h-full bg-[#B56339] w-0" />
          </div>

          <div className="flex items-center gap-1.5">
            {PLAYGROUND_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-[#B56339] text-white'
                    : 'text-[#888888] hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5'
                }`}
              >
                0{s.id}
              </button>
            ))}
          </div>
        </div>


      </footer>

      {/* ── Custom Trailing Cursor Crosshair ─────────────────── */}
      {isHovering && (
        <div
          ref={cursorRef}
          className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 text-[#1a1a1a] font-times text-base font-bold hidden lg:block"
        >
          +
        </div>
      )}
    </section>
  );
};
