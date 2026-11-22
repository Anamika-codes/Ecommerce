'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getProductBySlug, PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, Check, Shield, Truck, RotateCcw, Star, Plus, Minus, Heart } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2400);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs & Back Link */}
      <nav className="flex items-center gap-2 text-xs font-mono text-brand-muted mb-8" aria-label="Breadcrumb">
        <Link href="/collection" className="hover:text-brand-accent flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Catalogue</span>
        </Link>
        <span>/</span>
        <span className="text-brand-dark/60">{product.category}</span>
        <span>/</span>
        <span className="text-brand-dark font-medium">{product.id}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-brand-border">
        {/* Left Column: Image Gallery (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-20 h-24 md:w-24 md:h-28 rounded-xs overflow-hidden border transition-all ${
                    selectedImageIdx === idx
                      ? 'border-brand-accent ring-1 ring-brand-accent'
                      : 'border-brand-border opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Image */}
          <div className="relative flex-1 aspect-[4/5] bg-brand-surface rounded-sm overflow-hidden border border-brand-border">
            <Image
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-all duration-500"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-brand-border px-3 py-1 rounded-xs">
              <span className="font-mono text-xs font-semibold text-brand-dark">{product.id}</span>
            </div>
            <div className="absolute top-4 right-4 bg-brand-dark/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-xs font-mono text-[10px] uppercase tracking-wider">
              {product.stock > 0 ? `${product.stock} units in workshop` : 'Sold Out'}
            </div>
          </div>
        </div>

        {/* Right Column: Details & Purchase (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-brand-muted mb-2">
              <span className="uppercase tracking-widest text-brand-accent font-semibold">
                {product.category}
              </span>
              <span>{product.origin}</span>
            </div>

            <h1 className="font-heading font-semibold text-3xl sm:text-4xl text-brand-dark tracking-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-2xl font-semibold text-brand-dark">
                ${product.price}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="font-mono text-brand-muted ml-1.5 text-[11px]">
                  ({product.reviews.length} reviews)
                </span>
              </div>
            </div>

            <div className="border-t border-b border-brand-border py-4 mb-6">
              <p className="font-body text-sm text-brand-dark/85 leading-relaxed font-light">
                {product.fullDescription}
              </p>
            </div>

            {/* Color Swatch Picker */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-mono mb-2.5">
                <span className="text-brand-dark font-medium">FINISH / MATERIAL</span>
                <span className="text-brand-accent">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5" role="radiogroup">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`px-3 py-1.5 rounded-xs border text-xs font-mono flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'border-brand-accent bg-brand-accent/5 text-brand-dark font-medium ring-1 ring-brand-accent'
                          : 'border-brand-border bg-white text-brand-muted hover:border-brand-dark'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add Button */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-brand-border rounded-xs bg-brand-surface">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-11 flex items-center justify-center text-brand-dark hover:bg-brand-surfaceAlt font-mono transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center font-mono text-sm font-semibold text-brand-dark">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-11 flex items-center justify-center text-brand-dark hover:bg-brand-surfaceAlt font-mono transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 bg-brand-accent hover:bg-brand-accentHover text-white font-body text-xs uppercase tracking-[0.18em] font-medium rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Satchel</span>
                    </>
                  ) : (
                    <span>Add to Satchel — ${(product.price * quantity).toFixed(2)}</span>
                  )}
                </button>
              </div>

              <Link
                href="/checkout"
                onClick={() => addToCart(product, selectedColor, quantity)}
                className="w-full block text-center py-3 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white font-body text-xs uppercase tracking-[0.18em] rounded-xs transition-colors"
              >
                Instant Checkout
              </Link>
            </div>
          </div>

          {/* Value Badges */}
          <div className="pt-6 border-t border-brand-border grid grid-cols-3 gap-3 text-[11px] font-mono text-brand-muted">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Carbon-Neutral Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-brand-accent shrink-0" />
              <span>30-Day Quiet Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Lifetime Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Craft Details */}
      <div className="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-brand-border">
        <div>
          <h3 className="font-heading font-medium text-2xl text-brand-dark mb-6">
            Workshop Specifications
          </h3>
          <div className="space-y-3 font-mono text-xs">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between py-2 border-b border-brand-border/60">
                <span className="text-brand-muted uppercase tracking-wider">{key}</span>
                <span className="text-brand-dark font-medium">{val}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 border-b border-brand-border/60">
              <span className="text-brand-muted uppercase tracking-wider">DIMENSIONS</span>
              <span className="text-brand-dark font-medium">{product.dimensions}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-brand-border/60">
              <span className="text-brand-muted uppercase tracking-wider">PROVENANCE</span>
              <span className="text-brand-dark font-medium">{product.origin}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-medium text-2xl text-brand-dark mb-6">
            Care &amp; Longevity
          </h3>
          <div className="bg-brand-surface p-6 rounded-sm border border-brand-border">
            <p className="font-body text-sm text-brand-muted leading-relaxed mb-4">
              {product.careInstructions}
            </p>
            <p className="font-mono text-xs text-brand-accent">
              Each piece is designed to develop a distinct patina. Never clean with abrasive solvents.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="py-16 border-b border-brand-border">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-heading font-medium text-2xl text-brand-dark">Quiet Reflections</h3>
            <p className="font-mono text-xs text-brand-muted mt-1">Verified collectors &amp; owners</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.reviews.map((rev) => (
            <div key={rev.id} className="bg-white border border-brand-border p-6 rounded-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-brand-dark">{rev.author}</span>
                <span className="text-brand-muted">{rev.date}</span>
              </div>
              <div className="text-[11px] font-mono text-brand-muted">{rev.location}</div>
              <p className="font-body text-sm text-brand-dark/85 leading-relaxed font-light italic">
                “{rev.comment}”
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Carousel */}
      <div className="py-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-heading font-medium text-2xl text-brand-dark">Harmonious Companions</h3>
          <Link href="/collection" className="font-mono text-xs text-brand-accent hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
