'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, MapPin, Calendar, Clock } from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'KST-2026-9481';
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('kestrel_last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Success Badge Banner */}
      <div className="bg-white border border-brand-border p-8 sm:p-12 rounded-sm shadow-sm text-center mb-10">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-200">
          <CheckCircle2 className="w-7 h-7 stroke-[1.5]" />
        </div>

        <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-accent mb-2">
          [ ORDER CONFIRMED ]
        </div>
        <h1 className="font-heading font-medium text-3xl sm:text-4xl text-brand-dark tracking-tight mb-3">
          Quiet gratitude for your patronage.
        </h1>
        <p className="font-body text-sm sm:text-base text-brand-muted max-w-md mx-auto leading-relaxed mb-6 font-light">
          Your order has been recorded into our workshop registry and is being readied for hand-packing.
        </p>

        <div className="inline-flex items-center gap-2 bg-brand-surface border border-brand-border px-4 py-2 rounded-xs font-mono text-xs text-brand-dark">
          <span>REFERENCE NO:</span>
          <span className="font-bold text-brand-accent">{order?.orderId || orderId}</span>
        </div>
      </div>

      {/* Order Details Receipt Card */}
      <div className="bg-white border border-brand-border p-8 rounded-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
          <div>
            <h2 className="font-heading font-medium text-xl text-brand-dark">Workshop Dispatch Schedule</h2>
            <p className="font-mono text-xs text-brand-muted mt-1">
              Estimated delivery: 3–5 business days via carbon-neutral transit
            </p>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 border border-brand-border px-4 py-2 rounded-xs font-mono text-xs text-brand-dark hover:bg-brand-surface transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Status Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="flex items-start gap-3 p-4 bg-brand-surface rounded-xs border border-brand-border">
            <PackageCheck className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-brand-dark">1. Order Logged</div>
              <div className="text-brand-muted text-[11px] mt-0.5">Assigned to lead artisan</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-brand-surface rounded-xs border border-brand-border">
            <Clock className="w-5 h-5 text-brand-muted shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-brand-dark">2. Inspection &amp; Wrap</div>
              <div className="text-brand-muted text-[11px] mt-0.5">Unbleached kraft protection</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-brand-surface rounded-xs border border-brand-border">
            <MapPin className="w-5 h-5 text-brand-muted shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-brand-dark">3. Courier Departure</div>
              <div className="text-brand-muted text-[11px] mt-0.5">Regional emission tracking</div>
            </div>
          </div>
        </div>

        {/* Purchased Items List */}
        {order?.items && order.items.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-brand-border">
            <h3 className="font-heading font-medium text-base text-brand-dark">Commissioned Pieces</h3>
            <div className="divide-y divide-brand-border/60">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="py-3 flex justify-between items-center text-xs font-mono">
                  <div>
                    <span className="font-medium text-brand-dark">{item.name}</span>
                    <span className="text-brand-muted ml-2">({item.color} · Qty {item.quantity})</span>
                  </div>
                  <span className="font-semibold text-brand-dark">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-border space-y-1.5 font-mono text-xs text-right">
              <div className="text-brand-muted">
                Subtotal: <span className="text-brand-dark">${order.subtotal?.toFixed(2)}</span>
              </div>
              <div className="text-brand-muted">
                Delivery: <span className="text-brand-dark">{order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost?.toFixed(2)}`}</span>
              </div>
              <div className="text-base font-semibold text-brand-dark pt-2 border-t border-brand-border/60">
                Total Paid: ${order.total?.toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {/* Customer Shipping Address Preview */}
        {order?.customer && (
          <div className="pt-4 border-t border-brand-border font-mono text-xs text-brand-muted">
            <span className="block text-brand-dark font-medium mb-1 uppercase">Dispatch Destination</span>
            <p>
              {order.customer.firstName} {order.customer.lastName}<br />
              {order.customer.address} {order.customer.apartment && `Apt ${order.customer.apartment}`}<br />
              {order.customer.city}, {order.customer.state} {order.customer.zip}<br />
              {order.customer.email}
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-dark text-white font-mono text-xs uppercase tracking-wider rounded-xs hover:bg-brand-accent transition-colors"
        >
          <span>Return to Permanent Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center font-mono text-xs text-brand-muted">Loading dispatch schedule...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
