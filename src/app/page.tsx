'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export default function Home() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [scriptsReady, setScriptsReady] = useState(false);

  // Wait for scripts to load
  useEffect(() => {
    if (
      scriptsReady &&
      typeof window !== 'undefined' &&
      window.VANTA?.HALO &&
      window.THREE &&
      vantaRef.current &&
      !vantaEffect
    ) {
      const effect = window.VANTA.HALO({
        el: vantaRef.current,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        baseColor: 0x34acff,
        backgroundColor: 0x001219,
        amplitudeFactor: 1.4,
        xOffset: 0.23,
        size: 1.3,
      });
      setVantaEffect(effect);
    }

    return () => {
      vantaEffect?.destroy?.();
    };
  }, [scriptsReady]);

  return (
    <>
      {/* Load Scripts */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="beforeInteractive"
        onLoad={() => console.log('Three.js loaded')}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Vanta loaded');
          setScriptsReady(true);
        }}
      />

      {/* Vanta Background */}
      <div
        ref={vantaRef}
        className="fixed top-0 left-0 w-full h-full z-0"
      />

      {/* Foreground Content */}
      <main className="relative z-10 h-[88svh] flex items-center justify-start text-white text-center px-8 pb-16">
        <div className='px-12'>
          <h1 className="text-3xl text-gray-100 font-bold mb-4">Your brain needs a Trash can too!</h1>
          <p className="text-xl mb-6">Let It Out. No Judgement.</p>
          <button className='bg-gray-200 text-black font-semibold text-2xl px-6 py-3 rounded-3xl shadow-lg'>
            Dump Now
          </button>
        </div>
      </main>
    </>
  );
}
