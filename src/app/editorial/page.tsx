'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Volume2, Sparkles } from 'lucide-react';

export default function EditorialPage() {
  const articles = [
    {
      id: '01',
      title: 'Acoustic Ecology: The Sound of Unlacquered Wood',
      category: 'Sound & Space',
      readTime: '6 min read',
      date: 'November 2026',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      summary: 'Why synthetic composite speaker enclosures cause listener fatigue, and how five-year air-seasoned walnut heartwood restores natural mid-range balance.',
    },
    {
      id: '02',
      title: 'Patina as Memory: A Field Guide to Reduction Stoneware',
      category: 'Living Rituals',
      readTime: '4 min read',
      date: 'October 2026',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
      summary: 'Observations on living with unglazed Tokoname terracotta. How mineral contact with mountain spring water deepens exterior sheen across five years.',
    },
    {
      id: '03',
      title: 'French Seams & Selvedge: Textiles Engineered to Breathe',
      category: 'Material Studies',
      readTime: '8 min read',
      date: 'September 2026',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80',
      summary: 'Inside our Porto atelier: rediscovering the structural resilience of 420 GSM undyed Shetland virgin fleece woven on 1960s narrow shuttle looms.',
    },
  ];

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-16 border-b border-brand-border pb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-3">
          <span>[ FIELD JOURNAL // ISSUE 04 ]</span>
          <span>—</span>
          <span>ESSAYS &amp; SOUNDSCAPES</span>
        </div>
        <h1 className="font-heading font-medium text-4xl sm:text-6xl text-brand-dark tracking-tight">
          Quiet Correspondence
        </h1>
        <p className="font-body text-base text-brand-muted mt-4 font-light leading-relaxed">
          Dispatches from our workshops in Kyoto, Copenhagen, and Porto. Thoughts on tactile memory, acoustic architecture, and enduring objects.
        </p>
      </div>

      {/* Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-20">
        {articles.map((art) => (
          <article
            key={art.id}
            className="group bg-white border border-brand-border rounded-sm overflow-hidden flex flex-col justify-between hover:border-brand-accent transition-colors"
          >
            <div>
              <div className="relative aspect-[16/10] bg-brand-surface overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xs font-mono text-[10px] uppercase text-brand-dark">
                  {art.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-brand-muted mb-2">
                  <span>{art.date}</span>
                  <span>{art.readTime}</span>
                </div>
                <h2 className="font-heading font-medium text-xl text-brand-dark group-hover:text-brand-accent transition-colors mb-3 leading-snug">
                  {art.title}
                </h2>
                <p className="font-body text-xs text-brand-muted leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-brand-border/60 flex items-center justify-between font-mono text-xs text-brand-accent">
              <span>Read Essay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>

      {/* Acoustic Field Notes Banner */}
      <div className="bg-brand-surface p-8 sm:p-12 border border-brand-border rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 font-mono text-xs text-brand-accent">
            <Volume2 className="w-4 h-4" />
            <span>KESTREL BINAURAL RADIO</span>
          </div>
          <h3 className="font-heading font-medium text-2xl text-brand-dark">
            Field Recordings from the Tokoname Kiln (Rain &amp; Embers)
          </h3>
          <p className="font-body text-xs text-brand-muted leading-relaxed">
            High-fidelity 24-bit binaural acoustic capture of cedar wood crackling in the 1,280°C reduction kiln during dawn rain. Tuned specifically for listening on Søren Canvas Headphones.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Binaural soundscape streaming initialized (48kHz/24bit).')}
          className="px-6 py-3.5 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs uppercase tracking-wider rounded-xs transition-colors shrink-0 flex items-center gap-2"
        >
          <Volume2 className="w-4 h-4" />
          <span>Stream Soundscape</span>
        </button>
      </div>
    </div>
  );
}
