'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import { Package, DollarSign, ShoppingCart, AlertCircle, Plus, Check, Clock, Truck, ArrowUpRight } from 'lucide-react';

interface MockOrder {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: string;
  total: number;
  status: 'In Workshop' | 'Dispatched' | 'Delivered';
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<MockOrder[]>([
    {
      id: 'KST-9182',
      customer: 'Julian Vane',
      email: 'julian@vane.se',
      date: 'Nov 21, 2026',
      items: 'Osa Carafe & Tumbler (Terracotta Clay)',
      total: 78.00,
      status: 'In Workshop',
    },
    {
      id: 'KST-8941',
      customer: 'Claire Dupont',
      email: 'claire@dupont.fr',
      date: 'Nov 20, 2026',
      items: 'Atelier Raw Wool Overshirt (Ecru)',
      total: 195.00,
      status: 'Dispatched',
    },
    {
      id: 'KST-7623',
      customer: 'Marcus Koenig',
      email: 'marcus@berlin.de',
      date: 'Nov 19, 2026',
      items: 'Verre Walnut Hi-Fi Monitor (Walnut)',
      total: 340.00,
      status: 'Delivered',
    },
    {
      id: 'KST-7201',
      customer: 'Sora Tanaka',
      email: 'sora@kyoto-craft.jp',
      date: 'Nov 18, 2026',
      items: 'Kyoto Cast Bronze Incense Well (Bronze)',
      total: 92.00,
      status: 'Delivered',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    id: 'KST-099',
    name: '',
    category: 'Home Goods' as 'Home Goods' | 'Audio Gear' | 'Apparel',
    price: 120,
    stock: 20,
    summary: '',
  });

  const handleStockDelta = (productId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStock = Math.max(0, p.stock + delta);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  const handleStatusChange = (orderId: string, newStatus: MockOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name) return;

    const created: Product = {
      id: newProduct.id,
      slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      summary: newProduct.summary || 'Handcrafted edition from Kestrel Studio.',
      fullDescription: 'Constructed according to Kestrel studio standards for quiet living.',
      featured: false,
      images: [
        'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1200&q=80',
      ],
      colors: [{ name: 'Natural Mineral', hex: '#B85D43', inStock: true }],
      specs: { 'Material': 'Solid Natural Medium', 'Origin': 'Studio Workshop' },
      origin: 'Kyoto Studio',
      dimensions: 'Standard Edition',
      careInstructions: 'Wipe with dry clean cloth.',
      reviews: [],
    };

    setProducts([created, ...products]);
    setShowAddModal(false);
    setNewProduct({
      id: `KST-0${Math.floor(10 + Math.random() * 89)}`,
      name: '',
      category: 'Home Goods',
      price: 120,
      stock: 20,
      summary: '',
    });
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalStockUnits = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6 mb-8">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-1">
            [ INTERNAL REGISTRY ]
          </div>
          <h1 className="font-heading font-semibold text-3xl text-brand-dark tracking-tight">
            Studio Management Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-brand-accent hover:bg-brand-accentHover text-white font-mono text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Edition</span>
          </button>
        </div>
      </div>

      {/* Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-brand-border p-5 rounded-sm">
          <div className="flex items-center justify-between text-xs font-mono text-brand-muted mb-2">
            <span>RECORDED REVENUE</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-mono text-2xl font-bold text-brand-dark">
            ${totalRevenue.toFixed(2)}
          </div>
          <span className="text-[11px] font-mono text-emerald-600 mt-1 block">
            ↑ 14.8% vs previous lunar cycle
          </span>
        </div>

        <div className="bg-white border border-brand-border p-5 rounded-sm">
          <div className="flex items-center justify-between text-xs font-mono text-brand-muted mb-2">
            <span>ACTIVE ORDERS</span>
            <ShoppingCart className="w-4 h-4 text-brand-accent" />
          </div>
          <div className="font-mono text-2xl font-bold text-brand-dark">{orders.length}</div>
          <span className="text-[11px] font-mono text-brand-muted mt-1 block">
            All assigned to artisan packing
          </span>
        </div>

        <div className="bg-white border border-brand-border p-5 rounded-sm">
          <div className="flex items-center justify-between text-xs font-mono text-brand-muted mb-2">
            <span>INVENTORY UNITS</span>
            <Package className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="font-mono text-2xl font-bold text-brand-dark">{totalStockUnits}</div>
          <span className="text-[11px] font-mono text-brand-muted mt-1 block">
            Across {products.length} live permanent editions
          </span>
        </div>

        <div className="bg-white border border-brand-border p-5 rounded-sm">
          <div className="flex items-center justify-between text-xs font-mono text-brand-muted mb-2">
            <span>AVERAGE DISPATCH TIME</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-mono text-2xl font-bold text-brand-dark">18.4 hrs</div>
          <span className="text-[11px] font-mono text-brand-muted mt-1 block">
            Plastic-free kraft packaging
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-brand-border mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`pb-3 font-mono text-xs uppercase tracking-wider transition-colors relative ${
            activeTab === 'orders'
              ? 'text-brand-dark font-bold'
              : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          Customer Dispatches ({orders.length})
          {activeTab === 'orders' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 font-mono text-xs uppercase tracking-wider transition-colors relative ${
            activeTab === 'inventory'
              ? 'text-brand-dark font-bold'
              : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          Workshop Inventory ({products.length})
          {activeTab === 'inventory' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent" />
          )}
        </button>
      </div>

      {/* TAB 1: Orders Table */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-brand-border rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-brand-surface border-b border-brand-border text-brand-muted uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Commissioned Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-brand-surface/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-brand-dark">{o.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-brand-dark">{o.customer}</div>
                      <div className="text-[11px] text-brand-muted">{o.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-brand-muted max-w-xs truncate">{o.items}</td>
                    <td className="py-3.5 px-4 font-semibold text-brand-dark">
                      ${o.total.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={o.status}
                        onChange={(e) =>
                          handleStatusChange(o.id, e.target.value as MockOrder['status'])
                        }
                        className={`text-xs px-2.5 py-1 rounded-xs border font-mono ${
                          o.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : o.status === 'Dispatched'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="In Workshop">In Workshop</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Packing slip for ${o.id} generated.`)}
                        className="text-brand-accent hover:underline text-[11px]"
                      >
                        Print Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="bg-white border border-brand-border rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-brand-surface border-b border-brand-border text-brand-muted uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Edition Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock In Workshop</th>
                  <th className="py-3 px-4 text-right">Adjust Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-brand-surface/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-brand-dark">{p.id}</td>
                    <td className="py-3.5 px-4 font-medium text-brand-dark">
                      <Link href={`/products/${p.slug}`} className="hover:text-brand-accent flex items-center gap-1">
                        <span>{p.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-brand-muted">{p.category}</td>
                    <td className="py-3.5 px-4 font-semibold text-brand-dark">${p.price}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-xs font-semibold ${
                          p.stock < 10
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-brand-surface text-brand-dark'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1 border border-brand-border rounded-xs bg-white">
                        <button
                          type="button"
                          onClick={() => handleStockDelta(p.id, -1)}
                          className="px-2 py-1 hover:bg-brand-surface transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 text-brand-dark font-bold">{p.stock}</span>
                        <button
                          type="button"
                          onClick={() => handleStockDelta(p.id, 1)}
                          className="px-2 py-1 hover:bg-brand-surface transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/50 backdrop-blur-sm">
          <div className="bg-white border border-brand-border rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-heading font-medium text-xl text-brand-dark">Register New Edition</h3>
            <form onSubmit={handleAddProduct} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-brand-muted uppercase text-[10px] mb-1">Code</label>
                <input
                  type="text"
                  required
                  value={newProduct.id}
                  onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                  className="w-full bg-brand-surface border border-brand-border p-2 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-brand-muted uppercase text-[10px] mb-1">Edition Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kyoto Cedar Pen Rest"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-brand-surface border border-brand-border p-2 rounded-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-brand-muted uppercase text-[10px] mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                    className="w-full bg-brand-surface border border-brand-border p-2 rounded-xs"
                  >
                    <option value="Home Goods">Home Goods</option>
                    <option value="Audio Gear">Audio Gear</option>
                    <option value="Apparel">Apparel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-brand-muted uppercase text-[10px] mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full bg-brand-surface border border-brand-border p-2 rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-brand-muted uppercase text-[10px] mb-1">Stock Units</label>
                <input
                  type="number"
                  required
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  className="w-full bg-brand-surface border border-brand-border p-2 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-brand-muted uppercase text-[10px] mb-1">One-Line Summary</label>
                <textarea
                  rows={2}
                  value={newProduct.summary}
                  onChange={(e) => setNewProduct({ ...newProduct, summary: e.target.value })}
                  placeholder="Brief craftsmanship description..."
                  className="w-full bg-brand-surface border border-brand-border p-2 rounded-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 border border-brand-border text-brand-dark uppercase rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-brand-accent text-white uppercase rounded-xs hover:bg-brand-accentHover transition-colors"
                >
                  Create Edition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
