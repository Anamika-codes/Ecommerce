'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || 'Default'
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedColor, 1);
  };

  return (
    <article className="product-card-wrap relative z-10 group flex flex-col h-full">
      <div className="product-card-inner bg-white border border-brand-border rounded-sm overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-dark/5">
        {/* Top Visual Box (Compact aspect-[16/11] for balanced proportion) */}
        <Link href={`/products/${product.slug}`} className="relative aspect-[16/11] bg-brand-surface overflow-hidden block">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="product-img object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Code Badge */}
          <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm border border-brand-border px-2 py-0.5 rounded-xs z-10">
            <span className="font-mono text-[10px] font-medium text-brand-dark tracking-wider">
              {product.id}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-2.5 right-2.5 bg-brand-dark/85 backdrop-blur-sm text-white px-2 py-0.5 rounded-xs z-10">
            <span className="font-mono text-[10px] uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        </Link>

        {/* Card Body (Compact & Balanced) */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <span className="font-mono text-[11px] text-brand-muted uppercase tracking-wider">
                {product.origin.split(',')[0]}
              </span>
              <span className="font-mono text-sm font-semibold text-brand-dark">
                ${product.price}
              </span>
            </div>

            <Link href={`/products/${product.slug}`}>
              <h3 className="font-heading font-medium text-base text-brand-dark tracking-tight line-clamp-1 group-hover:text-brand-accent transition-colors mb-1">
                {product.name}
              </h3>
            </Link>

            <p className="font-body text-[11px] text-brand-muted line-clamp-1 leading-normal mb-3.5">
              {product.summary}
            </p>
          </div>

          {/* Integrated Horizontal Bottom Bar */}
          <div className="pt-2.5 border-t border-brand-border/60 flex items-center justify-between gap-2">
            {/* Color Swatches */}
            <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Color options">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-3.5 h-3.5 rounded-full transition-all focus:outline-none ${
                      isSelected
                        ? 'ring-2 ring-brand-accent ring-offset-1 scale-110'
                        : 'ring-1 ring-black/10 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    title={color.name}
                  />
                );
              })}
            </div>

            {/* Compact Add Button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className="py-1.5 px-3 bg-brand-surface hover:bg-brand-dark text-brand-dark hover:text-white border border-brand-border rounded-xs font-mono text-[11px] uppercase tracking-wider font-medium transition-colors flex items-center gap-1 group/btn"
            >
              <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform duration-200" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
