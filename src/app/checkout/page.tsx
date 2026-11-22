'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, ArrowLeft, CheckCircle, CreditCard, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '842',
    nameOnCard: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFreeShipping = subtotal >= 150;
  const shippingCost = formData.shippingMethod === 'express' ? 24 : isFreeShipping ? 0 : 12;
  const total = subtotal + shippingCost;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as 2 | 3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete Order
      setIsSubmitting(true);
      const orderId = `KST-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Store in sessionStorage for confirmation page
      const orderData = {
        orderId,
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        items: cart,
        subtotal,
        shippingCost,
        total,
        customer: formData,
      };

      try {
        sessionStorage.setItem('kestrel_last_order', JSON.stringify(orderData));
      } catch {
        // ignore
      }

      setTimeout(() => {
        clearCart();
        router.push(`/order-confirmation?orderId=${orderId}`);
      }, 1200);
    }
  };

  if (cart.length === 0 && !isSubmitting) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h1 className="font-heading text-2xl text-brand-dark mb-4">No active items in checkout</h1>
        <p className="font-body text-sm text-brand-muted mb-6">
          Your satchel has no items waiting for dispatch.
        </p>
        <Link
          href="/collection"
          className="inline-block px-6 py-3 bg-brand-dark text-white font-mono text-xs uppercase rounded-xs"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Checkout Header */}
      <div className="mb-10 flex items-center justify-between border-b border-brand-border pb-6">
        <div>
          <Link href="/cart" className="font-mono text-xs text-brand-muted hover:text-brand-accent flex items-center gap-1.5 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Satchel</span>
          </Link>
          <h1 className="font-heading font-semibold text-3xl text-brand-dark tracking-tight">
            Checkout &amp; Quiet Dispatch
          </h1>
        </div>

        {/* Step Indicators */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
          <span className={`px-2 py-0.5 rounded-xs ${step >= 1 ? 'bg-brand-dark text-white' : 'text-brand-muted'}`}>
            1. Address
          </span>
          <span className="text-brand-border">→</span>
          <span className={`px-2 py-0.5 rounded-xs ${step >= 2 ? 'bg-brand-dark text-white' : 'text-brand-muted'}`}>
            2. Delivery
          </span>
          <span className="text-brand-border">→</span>
          <span className={`px-2 py-0.5 rounded-xs ${step >= 3 ? 'bg-brand-dark text-white' : 'text-brand-muted'}`}>
            3. Payment
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Form Steps (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleNextStep} className="space-y-8">
            {/* STEP 1: Address */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-heading font-medium text-xl text-brand-dark">
                  1. Contact &amp; Shipping Destination
                </h2>

                <div className="space-y-4 font-body text-xs">
                  <div>
                    <label className="block font-mono text-[11px] text-brand-muted uppercase mb-1">
                      Email Address (for order tracking)
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="collector@domain.com"
                      className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-brand-muted uppercase mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Julian"
                        className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] text-brand-muted uppercase mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Vane"
                        className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-brand-muted uppercase mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="742 Evergreen Terrace"
                      className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-brand-muted uppercase mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Portland"
                        className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] text-brand-muted uppercase mb-1">
                        State / Province
                      </label>
                      <input
                        type="text"
                        required
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="OR"
                        className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] text-brand-muted uppercase mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="97201"
                        className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs uppercase tracking-wider rounded-xs transition-colors"
                >
                  Continue to Delivery Method
                </button>
              </div>
            )}

            {/* STEP 2: Shipping Method */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-heading font-medium text-xl text-brand-dark">
                  2. Choose Delivery Method
                </h2>

                <div className="space-y-3 font-mono text-xs">
                  <label
                    className={`block p-4 border rounded-xs cursor-pointer transition-all ${
                      formData.shippingMethod === 'standard'
                        ? 'border-brand-accent bg-brand-surface'
                        : 'border-brand-border bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={handleChange}
                          className="accent-brand-accent"
                        />
                        <div>
                          <div className="font-semibold text-brand-dark">
                            Carbon-Neutral Standard Delivery
                          </div>
                          <div className="text-[11px] text-brand-muted mt-0.5">
                            Estimated 3–5 business days via regional zero-emission couriers
                          </div>
                        </div>
                      </div>
                      <span className="font-semibold text-brand-dark">
                        {isFreeShipping ? 'FREE' : '$12.00'}
                      </span>
                    </div>
                  </label>

                  <label
                    className={`block p-4 border rounded-xs cursor-pointer transition-all ${
                      formData.shippingMethod === 'express'
                        ? 'border-brand-accent bg-brand-surface'
                        : 'border-brand-border bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === 'express'}
                          onChange={handleChange}
                          className="accent-brand-accent"
                        />
                        <div>
                          <div className="font-semibold text-brand-dark">
                            Priority Air Courier with White Glove Hand-Off
                          </div>
                          <div className="text-[11px] text-brand-muted mt-0.5">
                            Estimated 1–2 business days in reinforced reusable wooden crate
                          </div>
                        </div>
                      </div>
                      <span className="font-semibold text-brand-dark">$24.00</span>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3.5 px-6 border border-brand-border text-brand-dark font-mono text-xs uppercase rounded-xs hover:bg-brand-surface"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs uppercase tracking-wider rounded-xs transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-heading font-medium text-xl text-brand-dark">
                  3. Encrypted Payment
                </h2>

                <div className="p-4 bg-brand-surface border border-brand-border rounded-xs flex items-center justify-between text-xs font-mono text-brand-dark mb-4">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Sandbox Test Environment — No actual funds charged</span>
                  </div>
                </div>

                <div className="space-y-4 font-body text-xs">
                  <div>
                    <label className="block font-mono text-[11px] text-brand-muted uppercase mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      required
                      name="nameOnCard"
                      value={formData.nameOnCard || `${formData.firstName} ${formData.lastName}`}
                      onChange={handleChange}
                      placeholder="Julian Vane"
                      className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-brand-muted uppercase mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full bg-white border border-brand-border pl-10 pr-4 py-2.5 rounded-xs font-mono focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-brand-muted uppercase mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded-xs font-mono focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] text-brand-muted uppercase mb-1">
                        CVC Security Code
                      </label>
                      <input
                        type="text"
                        required
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        className="w-full bg-white border border-brand-border px-3.5 py-2.5 rounded-xs font-mono focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3.5 px-6 border border-brand-border text-brand-dark font-mono text-xs uppercase rounded-xs hover:bg-brand-surface"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 bg-brand-accent hover:bg-brand-accentHover text-white font-mono text-xs uppercase tracking-[0.18em] font-medium rounded-xs transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? 'Placing Order...' : `Authorize & Place Order — $${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right: Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-brand-border p-6 rounded-sm space-y-6 sticky top-28">
            <h3 className="font-heading font-medium text-lg text-brand-dark border-b border-brand-border pb-3">
              Satchel Review ({cart.length})
            </h3>

            <div className="divide-y divide-brand-border/60 max-h-72 overflow-y-auto space-y-3">
              {cart.map((item) => (
                <div key={`${item.id}-${item.color}`} className="pt-3 flex gap-4 items-center">
                  <div className="relative w-14 h-16 bg-brand-surface rounded-xs overflow-hidden shrink-0 border border-brand-border">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-xs font-mono">
                    <div className="font-medium text-brand-dark line-clamp-1">{item.name}</div>
                    <div className="text-brand-muted text-[11px]">{item.color} · Qty {item.quantity}</div>
                    <div className="text-brand-dark font-semibold mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-border space-y-2 font-mono text-xs">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Delivery ({formData.shippingMethod})</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-brand-dark pt-3 border-t border-brand-border">
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-brand-muted text-center leading-relaxed">
              Dispatch handled directly by Kestrel Studio. Reusable plastic-free corrugated parcel.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
