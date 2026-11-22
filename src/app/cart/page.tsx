'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, totalCount } = useCart();
  const router = useRouter();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [carbonOffset, setCarbonOffset] = useState(true);

  const targetShipping = 150;
  const isFreeShipping = subtotal >= targetShipping;
  const shippingCost = isFreeShipping ? 0 : 12;
  const offsetFee = carbonOffset ? 2.5 : 0;
  const finalTotal = Math.max(0, subtotal - promoDiscount + shippingCost + offsetFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'KESTREL10') {
      const discount = subtotal * 0.1;
      setPromoDiscount(discount);
      setPromoMessage('10% seasonal discount applied.');
    } else {
      setPromoMessage('Invalid invitation code.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-28 max-w-3xl mx-auto px-4 text-center">
        <ShoppingBag className="w-16 h-16 text-brand-muted/40 mx-auto mb-4 stroke-1" />
        <h1 className="font-heading font-medium text-3xl text-brand-dark mb-2">Your Satchel is Empty</h1>
        <p className="font-body text-sm text-brand-muted max-w-md mx-auto mb-8 font-light">
          We invite you to browse our curated catalogue of audio monitors, wheel-thrown ceramics, and selvedge garments.
        </p>
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-dark text-white font-body text-xs uppercase tracking-[0.18em] rounded-xs hover:bg-brand-accent transition-colors"
        >
          <span>Explore Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-brand-border pb-6 mb-12">
        <h1 className="font-heading font-semibold text-3xl sm:text-4xl text-brand-dark tracking-tight">
          Your Satchel ({totalCount})
        </h1>
        <p className="font-mono text-xs text-brand-muted mt-1">
          REVIEW ITEMS BEFORE PROCEEDING TO SECURE DISPATCH
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Col: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="divide-y divide-brand-border border-t border-b border-brand-border">
            {cart.map((item) => (
              <div key={`${item.id}-${item.color}`} className="py-6 flex gap-6 items-center">
                <Link
                  href={`/products/${item.slug}`}
                  className="relative w-24 h-28 sm:w-28 sm:h-32 bg-brand-surface rounded-xs overflow-hidden shrink-0 border border-brand-border"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="112px"
                    className="object-cover object-center"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between sm:flex-row sm:items-center gap-4">
                  <div>
                    <div className="font-mono text-[11px] text-brand-muted uppercase tracking-wider mb-1">
                      {item.category} · {item.id}
                    </div>
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="font-heading font-medium text-lg text-brand-dark hover:text-brand-accent transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="font-mono text-xs text-brand-muted mt-1">
                      Finish: <span className="text-brand-dark font-medium">{item.color}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Stepper */}
                    <div className="flex items-center border border-brand-border rounded-xs bg-brand-surface">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.color, -1)}
                        className="w-8 h-8 flex items-center justify-center text-brand-dark hover:bg-brand-surfaceAlt font-mono text-xs transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-mono text-xs font-semibold text-brand-dark">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.color, 1)}
                        className="w-8 h-8 flex items-center justify-center text-brand-dark hover:bg-brand-surfaceAlt font-mono text-xs transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="font-mono text-base font-semibold text-brand-dark min-w-[70px] text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.color)}
                      className="text-brand-muted hover:text-brand-accent p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link
              href="/collection"
              className="font-mono text-xs text-brand-dark hover:text-brand-accent flex items-center gap-1.5"
            >
              <span>← Continue Discovering</span>
            </Link>
          </div>
        </div>

        {/* Right Col: Summary & Checkout (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-brand-border p-6 rounded-sm space-y-6">
            <h2 className="font-heading font-medium text-lg text-brand-dark border-b border-brand-border pb-3">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block font-mono text-xs text-brand-muted uppercase">
                Studio Invitation Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="KESTREL10"
                  className="flex-1 bg-brand-surface border border-brand-border px-3 py-2 text-xs font-mono uppercase rounded-xs placeholder:text-brand-muted focus:outline-none focus:border-brand-accent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs uppercase rounded-xs transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className="font-mono text-[11px] text-brand-accent">{promoMessage}</p>
              )}
            </form>

            {/* Carbon Offset Checkbox */}
            <label className="flex items-start gap-2.5 p-3 bg-brand-surface border border-brand-border rounded-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={carbonOffset}
                onChange={(e) => setCarbonOffset(e.target.checked)}
                className="accent-brand-accent w-4 h-4 mt-0.5"
              />
              <div className="text-xs font-mono">
                <span className="font-medium text-brand-dark">Climate Neutrality Pledge (+$2.50)</span>
                <span className="block text-[11px] text-brand-muted mt-0.5">
                  100% of proceeds fund native reforestation in Hokkaido.
                </span>
              </div>
            </label>

            {/* Calculations */}
            <div className="space-y-2.5 font-mono text-xs pt-3 border-t border-brand-border">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span className="text-brand-dark font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-brand-accent">
                  <span>Invitation Discount</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-brand-muted">
                <span>Carbon-Neutral Shipping</span>
                <span className="text-brand-dark font-medium">
                  {isFreeShipping ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              {carbonOffset && (
                <div className="flex justify-between text-brand-muted">
                  <span>Reforestation Offset</span>
                  <span className="text-brand-dark font-medium">$2.50</span>
                </div>
              )}
              <div className="flex justify-between text-base font-semibold text-brand-dark pt-3 border-t border-brand-border">
                <span className="font-body font-medium">Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push('/checkout')}
              className="w-full py-3.5 bg-brand-accent hover:bg-brand-accentHover text-white font-body text-xs uppercase tracking-[0.18em] font-medium rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-brand-muted text-center pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ENCRYPTED 256-BIT CHECKOUT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
