'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, opts: { duration: number }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#FAF9F9] text-brand-dark pt-20 pb-12 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper 5-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-brand-border">
          {/* Brand Col */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 bg-brand-accent rounded-full" />
              <span className="font-heading font-bold text-2xl tracking-[0.2em] uppercase text-brand-dark">
                KESTREL
              </span>
            </div>
            <p className="font-body text-sm text-brand-muted leading-relaxed mb-6 max-w-sm">
              Curated objects for living, listening, and quiet ritual. Designed across studios in Kyoto, Copenhagen, and Portland.
            </p>
            <div className="font-mono text-xs text-brand-muted space-y-1">
              <p>STUDIO CORRESPONDENCE: studio@kestrel-store.com</p>
              <p>HOURS: Mon – Fri, 09:00 – 18:00 CET</p>
            </div>
          </div>

          {/* Links Col 1: Collections */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-dark mb-4">
              Catalogue
            </h4>
            <ul className="space-y-2.5 text-sm font-body text-brand-muted">
              <li>
                <Link href="/collection" className="hover:text-brand-accent transition-colors">
                  All Editions
                </Link>
              </li>
              <li>
                <Link href="/collection?category=Home+Goods" className="hover:text-brand-accent transition-colors">
                  Home Goods
                </Link>
              </li>
              <li>
                <Link href="/collection?category=Audio+Gear" className="hover:text-brand-accent transition-colors">
                  Audio Monitors
                </Link>
              </li>
              <li>
                <Link href="/collection?category=Apparel" className="hover:text-brand-accent transition-colors">
                  Natural Garments
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Col 2: Journal & Craft */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-dark mb-4">
              Discipline
            </h4>
            <ul className="space-y-2.5 text-sm font-body text-brand-muted">
              <li>
                <Link href="/craft" className="hover:text-brand-accent transition-colors">
                  Craft &amp; Workshop
                </Link>
              </li>
              <li>
                <Link href="/editorial" className="hover:text-brand-accent transition-colors">
                  Field Notes &amp; Essays
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-brand-accent transition-colors">
                  Your Satchel
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-accent transition-colors">
                  Studio Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-dark mb-4">
              Correspondence
            </h4>
            <p className="font-body text-xs text-brand-muted mb-4 leading-relaxed">
              Unfrequent releases and acoustic field notes. No promotional noise.
            </p>
            {subscribed ? (
              <div className="p-3 bg-brand-surface border border-brand-border rounded-xs font-mono text-xs text-brand-dark">
                Thank you. You are added to our quiet correspondence.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="reader@domain.com"
                  className="w-full bg-brand-surface border border-brand-border px-3 py-2 text-xs font-body rounded-xs placeholder:text-brand-muted focus:outline-none focus:border-brand-accent"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-brand-dark hover:bg-brand-accent text-white font-body text-xs uppercase tracking-wider rounded-xs transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-muted">
          <div>
            © 2026 KESTREL STUDIO LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-brand-accent cursor-pointer">PRIVACY</span>
            <span className="hover:text-brand-accent cursor-pointer">TERMS</span>
            <span className="hover:text-brand-accent cursor-pointer">ACCESSIBILITY</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-brand-accent flex items-center gap-1 font-medium text-brand-dark ml-2"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
