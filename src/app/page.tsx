'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero Entry Stagger
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .fromTo(
        '.hero-line',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.1, stagger: 0.15, delay: 0.1 }
      )
      .to('.hero-fade-in', { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 }, '-=0.6');

    // Hero Background Parallax
    gsap.to('#hero-bg-img', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Stacked Craft Cards Animation
    // Card 1 transforms as Card 2 slides over it
    gsap.to('#story-card-1 .card-surface', {
      scale: 0.92,
      rotateX: 3,
      transformOrigin: 'center top',
      ease: 'none',
      scrollTrigger: {
        trigger: '#story-card-2',
        start: 'top 75%',
        end: 'top 35%',
        scrub: true,
      },
    });
    gsap.to('#story-card-1 .card-overlay', {
      opacity: 0.38,
      ease: 'none',
      scrollTrigger: {
        trigger: '#story-card-2',
        start: 'top 75%',
        end: 'top 35%',
        scrub: true,
      },
    });

    // Card 2 transforms as Card 3 slides over it
    gsap.to('#story-card-2 .card-surface', {
      scale: 0.92,
      rotateX: 3,
      transformOrigin: 'center top',
      ease: 'none',
      scrollTrigger: {
        trigger: '#story-card-3',
        start: 'top 75%',
        end: 'top 45%',
        scrub: true,
      },
    });
    gsap.to('#story-card-2 .card-overlay', {
      opacity: 0.38,
      ease: 'none',
      scrollTrigger: {
        trigger: '#story-card-3',
        start: 'top 75%',
        end: 'top 45%',
        scrub: true,
      },
    });

    // Parallax on images inside each story card
    ['#story-card-1', '#story-card-2', '#story-card-3'].forEach((cardId) => {
      const card = document.querySelector(cardId);
      if (!card) return;
      const img = card.querySelector('.story-img');
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -10, scale: 1.08 },
          {
            yPercent: 10,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, opts: { offset: number; duration: number }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div>
      {/* 01. HERO SECTION */}
      <section
        id="hero"
        className="relative w-full h-[90vh] min-h-[620px] max-h-[880px] overflow-hidden flex items-end pb-12 sm:pb-20"
      >
        {/* Background Image with Parallax (Full vibrant natural sunlight & warm timber color restored) */}
        <div className="absolute inset-0 w-full h-[125%] -top-[12%] overflow-hidden pointer-events-none z-0">
          <Image
            id="hero-bg-img"
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=85"
            alt="Calm minimal interior bathed in natural warm sunlight with sculptural objects"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 will-change-transform opacity-100"
          />
        </div>

        {/* Editorial Scrim: Gentle bottom gradient so white headline text remains razor sharp, while top & middle of photo retain full sunlit warmth */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/35 to-transparent pointer-events-none z-0" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Meta Label */}
            <div className="overflow-hidden mb-4">
              <div className="hero-line flex items-center gap-3">
                <span className="inline-block w-6 h-[1.5px] bg-brand-accent" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FAF9F9]/85">
                  Issue No. 04 / Acoustic &amp; Tactile Living
                </span>
              </div>
            </div>

            {/* Headline split into lines that rise in on load */}
            <div className="space-y-1 mb-6">
              <div className="overflow-hidden">
                <h1 className="hero-line font-heading font-medium text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#FAF9F9] leading-[1.08]">
                  Thoughtful forms.
                </h1>
              </div>
              <div className="overflow-hidden">
                <h2 className="hero-line font-heading font-light text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#FAF9F9]/90 leading-[1.08] italic">
                  Enduring tactile calm.
                </h2>
              </div>
            </div>

            {/* Paragraph */}
            <div className="hero-fade-in opacity-0 translate-y-4 mb-8 max-w-xl">
              <p className="font-body text-base sm:text-lg text-[#FAF9F9]/80 font-light leading-relaxed">
                Curated objects for living, listening, and quiet ritual. Crafted in small artisan runs from unvarnished natural timber, hand-thrown clay, and precision acoustic engineering.
              </p>
            </div>

            {/* Buttons */}
            <div className="hero-fade-in opacity-0 translate-y-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('featured-products')}
                className="group bg-brand-accent hover:bg-brand-accentHover text-white px-7 py-3.5 rounded-xs font-body text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 shadow-sm flex items-center gap-3"
              >
                <span>Explore Collection</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
              </button>

              <Link
                href="/craft"
                className="group border border-[#FAF9F9]/30 hover:border-[#FAF9F9] hover:bg-[#FAF9F9]/10 text-[#FAF9F9] px-7 py-3.5 rounded-xs font-body text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
              >
                <span>Read Craft Notes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Bottom Hero Meta */}
          <div className="hero-fade-in opacity-0 mt-14 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#FAF9F9]/60">
            <div className="flex items-center gap-6">
              <span>01 / HOME GOODS</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">02 / HI-FI ACOUSTICS</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">03 / NATURAL GARMENTS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AUTUMN BATCH READY TO DISPATCH</span>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL RUNNING BANNER */}
      <div className="bg-brand-dark text-[#FAF9F9] py-3.5 border-b border-brand-borderDark overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-mono tracking-wider text-[#FAF9F9]/75">
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            Plastic-free, 100% compostable packaging
          </span>
          <span className="hidden md:flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
            Handcrafted in limited runs of 120 units
          </span>
          <span className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-brand-accent" />
            Complimentary worldwide carbon-neutral shipping over $150
          </span>
        </div>
      </div>

      {/* 02. FEATURED PRODUCTS SECTION */}
      <section id="featured-products" className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-6 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-2">
              <span>[ CATALOGUE 01 ]</span>
              <span>—</span>
              <span>CURATED SERIES</span>
            </div>
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-brand-dark">
              Objects of Quiet Presence
            </h2>
            <p className="font-body text-base text-brand-muted mt-2 max-w-xl">
              Engineered for acoustic precision and everyday tactile pleasure. Each piece is designed to age gracefully over decades.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" role="tablist">
            {[
              { id: 'all', label: `All (${PRODUCTS.length})` },
              { id: 'Home Goods', label: 'Home Goods' },
              { id: 'Audio Gear', label: 'Audio Gear' },
              { id: 'Apparel', label: 'Apparel' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-1.5 rounded-xs font-mono text-xs tracking-wider border transition-all ${
                  activeCategory === tab.id
                    ? 'border-brand-dark bg-brand-dark text-white'
                    : 'border-brand-border bg-white text-brand-dark hover:border-brand-accent hover:text-brand-accent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid (Compact & Balanced) */}
        <div className="perspective-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.2em] px-8 py-4 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-colors rounded-xs"
          >
            <span>View Complete Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 03. CRAFT & STORY SECTION (3 LARGE STICKY STACKED CARDS) - data-lenis-prevent removes Lenis smooth scroll */}
      <section id="craft-story" className="py-24 bg-brand-surface relative border-t border-brand-border" data-lenis-prevent>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 md:mb-20">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-2">
              <span>[ PERSPECTIVE 02 ]</span>
              <span>—</span>
              <span>PROCESS &amp; DISCIPLINE</span>
            </div>
            <h2 className="font-heading font-medium text-3xl sm:text-5xl tracking-tight text-brand-dark leading-tight">
              Made slowly, to live indefinitely.
            </h2>
            <p className="font-body text-base sm:text-lg text-brand-muted mt-4 font-light leading-relaxed">
              In an era of disposable manufacturing, we build objects designed to absorb history. Three deliberate chapters from our collaborative workshops.
            </p>
          </div>

          {/* STACKED CARDS WRAPPER */}
          <div className="relative pb-40 md:pb-64" style={{ perspective: '1400px' }} data-lenis-prevent>
            {/* Card 1 */}
            <div
              id="story-card-1"
              className="story-card sticky top-20 md:top-24 z-10 mb-28 md:mb-40 will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="card-surface relative bg-[#FAF9F9] border border-brand-border rounded-md shadow-sm overflow-hidden min-h-[480px] md:h-[520px] flex flex-col md:flex-row transition-all duration-300">
                <div className="card-overlay absolute inset-0 bg-brand-dark opacity-0 pointer-events-none transition-opacity duration-150 z-20" />
                <div className="p-8 sm:p-12 md:p-14 md:w-1/2 flex flex-col justify-between z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-brand-dark text-white rounded-xs">
                        CHAPTER 01
                      </span>
                      <span className="font-mono text-xs text-brand-muted tracking-wider">
                        ACOUSTIC ARCHITECTURE
                      </span>
                    </div>
                    <h3 className="font-heading font-medium text-2xl sm:text-4xl text-brand-dark tracking-tight leading-snug mb-4">
                      Resonant geometry in solid American Walnut.
                    </h3>
                    <p className="font-body text-sm sm:text-base text-brand-muted leading-relaxed font-light">
                      We reject synthetic damping and plastic composites. Our acoustic monitors are milled from air-dried walnut heartwood, carefully sculpted to nullify standing waves while preserving the organic warmth of human voice and strings.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-brand-border/70 mt-6 grid grid-cols-2 gap-4 font-mono text-xs text-brand-muted">
                    <div>
                      <span className="block text-brand-dark font-medium">TOLERANCE</span>
                      <span>±0.02mm CNC milling</span>
                    </div>
                    <div>
                      <span className="block text-brand-dark font-medium">PROVENANCE</span>
                      <span>Oregon &amp; Kyoto Studio</span>
                    </div>
                  </div>
                </div>

                <div className="relative h-64 md:h-full md:w-1/2 overflow-hidden bg-brand-surfaceAlt">
                  <Image
                    src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80"
                    alt="Artisan calibrating precision audio components"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="story-img object-cover object-center will-change-transform"
                  />
                  <div className="absolute inset-0 bg-brand-dark/10 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              id="story-card-2"
              className="story-card sticky top-28 md:top-36 z-20 mb-28 md:mb-40 will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="card-surface relative bg-[#FAF9F9] border border-brand-border rounded-md shadow-md overflow-hidden min-h-[480px] md:h-[520px] flex flex-col md:flex-row transition-all duration-300">
                <div className="card-overlay absolute inset-0 bg-brand-dark opacity-0 pointer-events-none transition-opacity duration-150 z-20" />
                <div className="p-8 sm:p-12 md:p-14 md:w-1/2 flex flex-col justify-between z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-brand-dark text-white rounded-xs">
                        CHAPTER 02
                      </span>
                      <span className="font-mono text-xs text-brand-muted tracking-wider">
                        EARTH &amp; KILN REDUCTION
                      </span>
                    </div>
                    <h3 className="font-heading font-medium text-2xl sm:text-4xl text-brand-dark tracking-tight leading-snug mb-4">
                      High-fire stoneware with memory of the flame.
                    </h3>
                    <p className="font-body text-sm sm:text-base text-brand-muted leading-relaxed font-light">
                      Unvarnished terracotta vessels shaped on traditional kick wheels. Exteriors are intentionally left porous and unglazed, allowing your hands to deepen their natural patina with every morning tea ritual.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-brand-border/70 mt-6 grid grid-cols-2 gap-4 font-mono text-xs text-brand-muted">
                    <div>
                      <span className="block text-brand-dark font-medium">FIRING TEMP</span>
                      <span>1,280°C wood kiln</span>
                    </div>
                    <div>
                      <span className="block text-brand-dark font-medium">GLAZE</span>
                      <span>Natural feldspar wash</span>
                    </div>
                  </div>
                </div>

                <div className="relative h-64 md:h-full md:w-1/2 overflow-hidden bg-brand-surfaceAlt">
                  <Image
                    src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80"
                    alt="Ceramic potter shaping terracotta clay on turning wheel"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="story-img object-cover object-center will-change-transform"
                  />
                  <div className="absolute inset-0 bg-brand-dark/10 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              id="story-card-3"
              className="story-card sticky top-36 md:top-48 z-30 will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="card-surface relative bg-[#FAF9F9] border border-brand-border rounded-md shadow-lg overflow-hidden min-h-[480px] md:h-[520px] flex flex-col md:flex-row transition-all duration-300">
                <div className="card-overlay absolute inset-0 bg-brand-dark opacity-0 pointer-events-none transition-opacity duration-150 z-20" />
                <div className="p-8 sm:p-12 md:p-14 md:w-1/2 flex flex-col justify-between z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-brand-dark text-white rounded-xs">
                        CHAPTER 03
                      </span>
                      <span className="font-mono text-xs text-brand-muted tracking-wider">
                        LIVING NATURAL FIBERS
                      </span>
                    </div>
                    <h3 className="font-heading font-medium text-2xl sm:text-4xl text-brand-dark tracking-tight leading-snug mb-4">
                      Architectural drape from heritage shuttle looms.
                    </h3>
                    <p className="font-body text-sm sm:text-base text-brand-muted leading-relaxed font-light">
                      Garments engineered for ease of movement without synthetic elastane. Raw unbleached sheep wool and long-staple organic cotton tailored with clean felled seams to endure years of honest wear.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-brand-border/70 mt-6 grid grid-cols-2 gap-4 font-mono text-xs text-brand-muted">
                    <div>
                      <span className="block text-brand-dark font-medium">WEAVE</span>
                      <span>Selvedge shuttle twill</span>
                    </div>
                    <div>
                      <span className="block text-brand-dark font-medium">FINISH</span>
                      <span>Non-chemical water wash</span>
                    </div>
                  </div>
                </div>

                <div className="relative h-64 md:h-full md:w-1/2 overflow-hidden bg-brand-surfaceAlt">
                  <Image
                    src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80"
                    alt="Natural raw wool and linen woven on vintage shuttle loom"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="story-img object-cover object-center will-change-transform"
                  />
                  <div className="absolute inset-0 bg-brand-dark/10 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. EDITORIAL MANIFESTO CALLOUT */}
      <section className="py-24 bg-brand-bg border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-accent block mb-6">
            [ FIELD NOTE // 084 ]
          </span>
          <blockquote className="font-heading text-2xl sm:text-4xl md:text-5xl font-light text-brand-dark leading-tight tracking-tight mb-8">
            “A home should not be an inventory of transient noise, but a sanctuary of quiet, resonant companions.”
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-brand-dark/30" />
            <cite className="font-body not-italic text-sm text-brand-muted uppercase tracking-widest font-medium">
              Kestrel Editorial Journal, Issue IV
            </cite>
            <span className="w-8 h-[1px] bg-brand-dark/30" />
          </div>
        </div>
      </section>
    </div>
  );
}
