'use client';

import React, { useEffect } from 'react';
import Link from 'next/router';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  const targetShipping = 150;
  const isFreeShipping = subtotal >= targetShipping;
  const shippingPercent = Math.min(100, Math.round((subtotal / targetShipping) * 100));
  const diffShipping = targetShipping - subtotal;

  const handleProceedToCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Slide-over Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#FAF9F9] border-l border-brand-border shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-brand-border flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-semibold text-xl text-brand-dark tracking-tight">Your Satchel</h3>
              <span className="font-mono text-xs text-brand-muted">({totalCount})</span>
            </div>
            <span className="font-mono text-[11px] text-brand-accent tracking-wider block mt-0.5 uppercase">
              {isFreeShipping ? 'Complimentary shipping unlocked' : 'Free shipping over $150'}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="p-2 text-brand-dark/70 hover:text-brand-dark hover:bg-brand-surface rounded-xs transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3 bg-brand-surface border-b border-brand-border">
          <div className="flex justify-between items-center text-xs font-mono mb-1.5">
            <span className="text-brand-muted">
              {isFreeShipping
                ? 'Carbon-neutral shipping applied'
                : `Add $${diffShipping.toFixed(2)} for free shipping`}
            </span>
            <span className="font-semibold text-brand-dark">{shippingPercent}%</span>
          </div>
          <div className="w-full bg-[#E5E3DC] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-accent h-full transition-all duration-300"
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        {/* Items Scrollable List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4" data-lenis-prevent>
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-brand-muted">
              <ShoppingBag className="w-12 h-12 text-brand-muted/40 mb-3 stroke-1" />
              <p className="font-heading font-medium text-brand-dark text-base mb-1">Your satchel is empty</p>
              <p className="font-body text-xs text-brand-muted max-w-xs mb-6">
                Explore our curated editions of audio gear, tactile ceramics, and natural garments.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  router.push('/collection');
                }}
                className="px-5 py-2.5 bg-brand-dark text-white text-xs font-body uppercase tracking-wider rounded-xs hover:bg-brand-accent transition-colors"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.color}`}
                className="bg-white border border-brand-border p-3.5 rounded-xs flex gap-3.5 relative group"
              >
                <div className="relative w-20 h-24 bg-brand-surface rounded-xs overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-heading font-medium text-sm text-brand-dark leading-tight">
                        {item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.color)}
                        className="text-brand-muted hover:text-brand-accent p-0.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="font-mono text-[11px] text-brand-muted mt-0.5">
                      <span>{item.color}</span> · <span>{item.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-brand-border rounded-xs bg-brand-surface">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.color, -1)}
                        className="w-6 h-6 flex items-center justify-center text-brand-dark hover:bg-brand-surfaceAlt font-mono text-xs transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-mono text-xs font-semibold text-brand-dark">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.color, 1)}
                        className="w-6 h-6 flex items-center justify-center text-brand-dark hover:bg-brand-surfaceAlt font-mono text-xs transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono text-xs font-semibold text-brand-dark">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-brand-border bg-white space-y-4">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-brand-muted">
                <span>Estimated Shipping</span>
                <span>{isFreeShipping ? 'Complimentary' : '$12.00'}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-brand-dark pt-1 border-t border-brand-border/60">
                <span className="font-body font-medium">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-brand-accent hover:bg-brand-accentHover text-white font-body text-xs uppercase tracking-[0.18em] font-medium rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                closeCart();
                router.push('/cart');
              }}
              className="w-full py-2 text-center font-body text-xs text-brand-muted hover:text-brand-dark underline underline-offset-2 transition-colors"
            >
              View Full Bag Details
            </button>

            <p className="font-mono text-[10px] text-center text-brand-muted">
              30-DAY QUIET RETURNS · 100% PLASTIC-FREE SHIPMENT
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
