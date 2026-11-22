'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { openCart, totalCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collection?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Collection', href: '/collection' },
    { label: 'Craft & Story', href: '/craft' },
    { label: 'Editorial', href: '/editorial' },
    { label: 'Studio Admin', href: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F9]/85 backdrop-blur-md border-b border-brand-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded p-1"
          aria-label="Kestrel Homepage"
        >
          <span className="w-2.5 h-2.5 bg-brand-accent rounded-full group-hover:scale-125 transition-transform duration-300" />
          <span className="font-heading font-bold text-2xl tracking-[0.2em] uppercase text-brand-dark">
            Kestrel
          </span>
          <span className="font-mono text-[10px] text-brand-muted tracking-wider hidden sm:inline ml-1 border-l border-brand-border pl-2">
            EST. 2026
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-10" aria-label="Primary Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm tracking-wide transition-colors duration-200 relative py-1 ${
                  isActive ? 'text-brand-accent font-medium' : 'text-brand-dark/80 hover:text-brand-accent'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-brand-accent transition-all duration-200 ${
                    isActive ? 'w-full' : 'w-0 hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-brand-dark/80 hover:text-brand-accent hover:bg-brand-surface rounded-xs transition-colors"
            aria-label="Search collection"
            title="Search collection"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Bag Button */}
          <button
            type="button"
            onClick={openCart}
            className="relative p-2.5 bg-brand-surface hover:bg-brand-surfaceAlt text-brand-dark border border-brand-border rounded-xs transition-all flex items-center gap-2"
            aria-label={`Open shopping bag with ${totalCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-body text-xs font-medium uppercase tracking-wider hidden sm:inline">Bag</span>
            <span className="min-w-[18px] h-[18px] px-1 bg-brand-accent text-white text-[11px] font-mono font-semibold rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-dark hover:text-brand-accent rounded-xs"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-brand-border bg-brand-surface/95 px-4 sm:px-6 lg:px-8 py-3 transition-all duration-200">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-brand-muted shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audio gear, stoneware, Shetland wool..."
              className="w-full bg-transparent text-brand-dark font-body text-sm placeholder:text-brand-muted/70 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="text-xs font-mono uppercase bg-brand-dark text-white px-3 py-1.5 rounded-xs hover:bg-brand-accent transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-xs font-mono uppercase text-brand-muted hover:text-brand-dark px-2 py-1"
            >
              ESC
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-bg px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-heading text-lg font-medium text-brand-dark hover:text-brand-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-brand-border flex items-center justify-between text-xs font-mono text-brand-muted">
            <span>KYOTO · COPENHAGEN · PORTLAND</span>
            <span className="text-brand-accent">EDITION NO. 04</span>
          </div>
        </div>
      )}
    </header>
  );
}
