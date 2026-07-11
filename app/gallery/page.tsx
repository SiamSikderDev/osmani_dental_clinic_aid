'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useSettings } from '@/lib/useSettings';

const ReactCompareSlider = dynamic(
  () => import('react-compare-slider').then((mod) => mod.ReactCompareSlider),
  { ssr: false }
);
const ReactCompareSliderImage = dynamic(
  () => import('react-compare-slider').then((mod) => mod.ReactCompareSliderImage),
  { ssr: false }
);

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { settings } = useSettings();

  const galleryImages = settings.gallery || [];
  const categories = ['All', ...Array.from(new Set(galleryImages.map((img) => img.category)))];

  const filtered = active === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === active);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const nextImg = useCallback(() => setLightbox((l) => l !== null ? (l + 1) % filtered.length : null), [filtered.length]);
  const prevImg = useCallback(() => setLightbox((l) => l !== null ? (l - 1 + filtered.length) % filtered.length : null), [filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImg();
      if (e.key === 'ArrowLeft') prevImg();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, closeLightbox, nextImg, prevImg]);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-bg to-accent/5 pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-accent font-semibold text-xs font-label tracking-wide uppercase">
              Our Work
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-dark mt-2 mb-3 font-heading">Gallery</h1>
            <p className="text-dark/50 max-w-md mx-auto text-sm">
              Tour our clinic, view results, and meet our team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 bg-surface/80 backdrop-blur-md sticky top-14 z-30 border-b border-card/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all font-label ${
                  active === cat
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-card/60 text-dark/50 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 sm:py-12 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Camera className="mx-auto text-dark/20 mb-3" size={40} />
              <p className="text-dark/40 text-sm font-label">No images in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {filtered.map((img, i) => (
                <ScrollReveal key={`${img.src}-${i}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="group relative aspect-[4/3] cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    onClick={() => openLightbox(i)}
                  >
                    <Image
                      src={img.src}
                      alt={img.category}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-medium font-label bg-black/40 backdrop-blur-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate">
                      {img.category}
                    </span>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Before & After */}
      <section className="py-10 sm:py-14 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark text-center mb-8 font-heading">
              Before &amp; After
            </h2>
            <div className="rounded-xl overflow-hidden shadow-md">
              <ReactCompareSlider
                itemOne={<ReactCompareSliderImage src={settings.images.hero} alt="Before" />}
                itemTwo={<ReactCompareSliderImage src={settings.images.beforeAfter} alt="After" />}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>

            <button
              className="absolute left-2 sm:left-4 z-10 p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
            >
              <ChevronLeft size={28} />
            </button>

            <button
              className="absolute right-2 sm:right-4 z-10 p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm text-white/80 text-xs font-label px-3 py-1 rounded-full">
              {lightbox + 1} / {filtered.length}
            </div>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] mx-10 sm:mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].category}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
