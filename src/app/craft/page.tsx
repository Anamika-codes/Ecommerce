import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, Shield, Wind, Flame } from 'lucide-react';

export default function CraftPage() {
  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-3xl mb-16 md:mb-24 border-b border-brand-border pb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-3">
          <span>[ PERSPECTIVE 02 ]</span>
          <span>—</span>
          <span>PHILOSOPHY &amp; DISCIPLINES</span>
        </div>
        <h1 className="font-heading font-medium text-4xl sm:text-6xl text-brand-dark tracking-tight leading-tight">
          Objects born from restraint, not excess.
        </h1>
        <p className="font-body text-base sm:text-lg text-brand-muted mt-5 font-light leading-relaxed">
          At Kestrel, we do not believe in seasonal obsolescence. We engineer objects designed to absorb human touch, age with honest beauty, and endure indefinitely across quiet domestic spaces.
        </p>
      </div>

      {/* 3 Pillars Deep Dive */}
      <div className="space-y-24 mb-28">
        {/* Pillar 1: Acoustic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-brand-surface border border-brand-border">
            <Image
              src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80"
              alt="Artisan assembling precision hi-fi acoustic components"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-brand-accent">
              <Compass className="w-4 h-4" />
              <span>DISCIPLINE 01 // ACOUSTIC HONESTY</span>
            </div>
            <h2 className="font-heading font-medium text-3xl text-brand-dark tracking-tight">
              Acoustic monitors with zero synthetic coloration.
            </h2>
            <p className="font-body text-sm sm:text-base text-brand-muted leading-relaxed font-light">
              We reject mass-produced plastic composite cabinets. Our acoustic enclosures are CNC-milled from sustainably harvested American walnut, air-dried over five years to stabilize internal fiber tension. Coupled with treated paper-cone dynamic drivers, the sound is unhurried, tangible, and true to live performance.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-4 font-mono text-xs text-brand-muted border-t border-brand-border/60">
              <div>
                <span className="block font-medium text-brand-dark">MATERIAL</span>
                <span>Air-seasoned walnut heartwood</span>
              </div>
              <div>
                <span className="block font-medium text-brand-dark">LAB LOCATION</span>
                <span>Copenhagen &amp; Taichung</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 2: Ceramics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:flex-row-reverse">
          <div className="lg:col-span-6 space-y-4 lg:order-2">
            <div className="flex items-center gap-2 font-mono text-xs text-brand-accent">
              <Flame className="w-4 h-4" />
              <span>DISCIPLINE 02 // EARTH &amp; FIRE</span>
            </div>
            <h2 className="font-heading font-medium text-3xl text-brand-dark tracking-tight">
              High-fire stoneware shaped on ancestral wheels.
            </h2>
            <p className="font-body text-sm sm:text-base text-brand-muted leading-relaxed font-light">
              Wheel-thrown in Tokoname by master potters using iron-rich coarse reduction terracotta. Exteriors are left porous and intentionally unvarnished, allowing your daily hands to cultivate an intimate patina over morning pour-overs and seasonal tea rituals.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-4 font-mono text-xs text-brand-muted border-t border-brand-border/60">
              <div>
                <span className="block font-medium text-brand-dark">KILN CYCLE</span>
                <span>48-hour continuous wood firing</span>
              </div>
              <div>
                <span className="block font-medium text-brand-dark">GLAZE FORMULA</span>
                <span>Natural feldspar and wood ash</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-brand-surface border border-brand-border lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80"
              alt="Potter shaping reduction clay on kick wheel"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Pillar 3: Textiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-brand-surface border border-brand-border">
            <Image
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80"
              alt="Natural raw selvedge wool woven on wooden shuttle loom"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-brand-accent">
              <Wind className="w-4 h-4" />
              <span>DISCIPLINE 03 // ARCHITECTURAL TEXTILES</span>
            </div>
            <h2 className="font-heading font-medium text-3xl text-brand-dark tracking-tight">
              Unbleached natural wool woven on heritage shuttle looms.
            </h2>
            <p className="font-body text-sm sm:text-base text-brand-muted leading-relaxed font-light">
              Our garments are designed as architectural shells for movement and pause. Free of synthetic elastane or plastic thread, we rely on the natural structural crimp of Shetland sheep fleece and heavy 14oz organic cotton canvas constructed with French seams.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-4 font-mono text-xs text-brand-muted border-t border-brand-border/60">
              <div>
                <span className="block font-medium text-brand-dark">FIBER PURITY</span>
                <span>100% GOTS organic &amp; virgin wool</span>
              </div>
              <div>
                <span className="block font-medium text-brand-dark">WEAVING MILL</span>
                <span>Porto, Portugal &amp; Galashiels</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA to Collection */}
      <div className="bg-brand-dark text-white p-12 md:p-16 rounded-sm text-center">
        <h3 className="font-heading font-medium text-3xl mb-4">Experience the editions</h3>
        <p className="font-body text-sm text-white/70 max-w-md mx-auto mb-8 font-light leading-relaxed">
          Each batch is produced in limited allocations of 120 units to preserve quality and artisan integrity.
        </p>
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-accent text-white font-mono text-xs uppercase tracking-wider rounded-xs hover:bg-brand-accentHover transition-colors"
        >
          <span>Discover Available Pieces</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
