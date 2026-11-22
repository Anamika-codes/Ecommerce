'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const pct = max > 0 ? Math.min(1, Math.max(0, current / max)) : 0;
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2.5px] bg-brand-accent z-50 origin-left w-full pointer-events-none transition-transform duration-75"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
