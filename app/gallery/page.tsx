'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import ScrollReveal from '@/components/ScrollReveal';
import { galleryImages } from '@/lib/data';
import { useSettings } from '@/lib/useSettings';

const categories = ['All', 'Clinic Interior', 'Before & After', 'Team'];

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { settings } = useSettings();

  const filtered = active === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === active);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const nextImg = () => setLightbox((l) => l !== null ? (l + 1) % filtered.length : null);
  const prevImg = () => setLightbox((l) => l !== null ? (l - 1 + filtered.length) % filtered.length : null);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-bg to-accent/5 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4 font-heading">Gallery</h1>
            <p className="text-dark/60 max-w-xl mx-auto">
              Take a virtual tour of our clinic, view before &amp; after results,
              and meet our amazing team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-surface sticky top-20 z-30 border-b border-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors font-label ${
                  active === cat
                    ? 'bg-accent text-white'
                    : 'bg-card text-dark/60 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-16 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <ScrollReveal key={`${img.src}-${i}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="break-inside-avoid cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative h-64">
                    <Image
                      src={img.src}
                      alt={img.category}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Slider */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-dark text-center mb-10 font-heading">
              Before &amp; After
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-lg">
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
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              onClick={closeLightbox}
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-4 text-white/70 hover:text-white"
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="absolute right-4 text-white/70 hover:text-white"
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
            >
              <ChevronRight size={32} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl h-[80vh] mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].category}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
