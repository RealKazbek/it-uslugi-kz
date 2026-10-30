'use client';

import { useEffect, useRef, useState } from 'react';
import { readVideoPrefs, shouldPlayVideo } from './shouldPlayVideo';

interface BackgroundVideoProps {
  /** Base path without extension, e.g. /media/video/hero (needs .webm, .mp4 and -poster.webp). */
  src: string;
  width?: number;
  height?: number;
  /** Mount the <video> only once the box scrolls into view. */
  lazy?: boolean;
  className?: string;
}

function whenIdle(run: () => void): () => void {
  if (typeof requestIdleCallback === 'function') {
    const id = requestIdleCallback(run, { timeout: 2000 });
    return () => cancelIdleCallback(id);
  }
  const id = window.setTimeout(run, 400);
  return () => window.clearTimeout(id);
}

/** Decorative looping clip over a poster. The poster <img> is in the server HTML (LCP candidate); the box is fixed, so nothing shifts. */
export function BackgroundVideo({ src, width = 1280, height = 720, lazy = false, className = '' }: BackgroundVideoProps) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!shouldPlayVideo(readVideoPrefs())) return;
    const el = box.current;
    if (!el) return;
    if (!lazy) return whenIdle(() => setMounted(true));
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setMounted(true);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [lazy]);

  useEffect(() => {
    const el = video.current;
    const host = box.current;
    if (!mounted || !el || !host) return;
    let visible = true;
    const sync = () => {
      if (visible && !document.hidden) void el.play().catch(() => undefined);
      else el.pause();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      sync();
    });
    io.observe(host);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [mounted]);

  return (
    <div ref={box} className={`relative size-full overflow-hidden ${className}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized poster, not routed through the loader */}
      <img src={`${src}-poster.webp`} alt="" width={width} height={height} fetchPriority={lazy ? 'auto' : 'high'} decoding="async" className="absolute inset-0 size-full object-cover" />
      {mounted && (
        <video
          ref={video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          width={width}
          height={height}
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={`${src}.webm`} type="video/webm" />
          <source src={`${src}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
