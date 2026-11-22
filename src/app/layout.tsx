import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import WaterRipple from '@/components/WaterRipple';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kestrel — Calm Editorial Store | Home Goods, Audio & Apparel',
  description:
    'Curated objects for living, listening, and quiet ritual. Crafted in small runs from natural materials and precision acoustic engineering.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col selection:bg-[#B85D43] selection:text-white">
        <CartProvider>
          <SmoothScroll>
            <ScrollProgress />
            <WaterRipple />
            <Navbar />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
