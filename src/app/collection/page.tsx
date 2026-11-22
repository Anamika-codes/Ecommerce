'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

function CollectionContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }

    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [category, search, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setCategory('all');
    setSearch('');
    setSortBy('default');
    setInStockOnly(false);
  };

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 border-b border-brand-border pb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-2">
          <span>[ CATALOGUE ARCHIVE ]</span>
          <span>—</span>
          <span>PERMANENT COLLECTION</span>
        </div>
        <h1 className="font-heading font-medium text-4xl sm:text-5xl text-brand-dark tracking-tight">
          All Editions &amp; Objects
        </h1>
        <p className="font-body text-base text-brand-muted mt-3 max-w-2xl font-light leading-relaxed">
          Unvarnished materials, hand-finished acoustics, and selvedge natural fibers. Engineered for timeless daily ritual.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-brand-surface p-4 sm:p-5 rounded-sm border border-brand-border mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by keyword, metal, wood..."
            className="w-full bg-white border border-brand-border pl-10 pr-4 py-2 text-xs font-body rounded-xs placeholder:text-brand-muted focus:outline-none focus:border-brand-accent"
          />
        </div>

        {/* Category & Sorting Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Select */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white border border-brand-border px-3 py-2 text-xs font-mono rounded-xs focus:outline-none focus:border-brand-accent text-brand-dark"
          >
            <option value="all">All Categories</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Audio Gear">Audio Gear</option>
            <option value="Apparel">Apparel</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc')}
            className="bg-white border border-brand-border px-3 py-2 text-xs font-mono rounded-xs focus:outline-none focus:border-brand-accent text-brand-dark"
          >
            <option value="default">Default Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {/* In stock toggle */}
          <label className="flex items-center gap-2 text-xs font-mono text-brand-dark cursor-pointer select-none bg-white border border-brand-border px-3 py-2 rounded-xs">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="accent-brand-accent w-3.5 h-3.5 rounded"
            />
            <span>In Stock Only</span>
          </label>

          {(category !== 'all' || search || sortBy !== 'default' || inStockOnly) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="p-2 text-brand-muted hover:text-brand-accent hover:bg-white rounded-xs border border-transparent hover:border-brand-border transition-colors flex items-center gap-1 text-xs font-mono"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-mono text-brand-muted mb-8">
        <span>SHOWING {filteredProducts.length} OBJECTS</span>
        <span>CARBON-NEUTRAL FULFILLMENT</span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-brand-border rounded-sm p-8">
          <p className="font-heading text-xl text-brand-dark mb-2">No matching editions found</p>
          <p className="font-body text-sm text-brand-muted mb-6">
            Try adjusting your search criteria or resetting filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-brand-dark text-white font-mono text-xs uppercase tracking-wider rounded-xs hover:bg-brand-accent transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center font-mono text-xs text-brand-muted">Loading archive catalogue...</div>}>
      <CollectionContent />
    </Suspense>
  );
}
