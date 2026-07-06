'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useSettings } from '@/lib/useSettings';

export default function FAQPage() {
  const { settings } = useSettings();
  const faqCategories = settings.faqCategories;
  const [activeCategory, setActiveCategory] = useState(faqCategories[0]?.category || '');
  const [openQ, setOpenQ] = useState<number | null>(null);

  const activeFaqs = faqCategories.find((c) => c.category === activeCategory)?.questions || [];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-bg to-accent/5 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4 font-heading">
              Frequently Asked Questions
            </h1>
            <p className="text-dark/60 max-w-xl mx-auto">
              Find answers to common questions about our services, treatments,
              and policies.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {faqCategories.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => { setActiveCategory(cat.category); setOpenQ(null); }}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors font-label ${
                    activeCategory === cat.category
                      ? 'bg-accent text-white'
                      : 'bg-surface text-dark/60 hover:bg-primary/10 hover:text-primary border border-card'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Accordion */}
          <div className="space-y-4">
            {activeFaqs.map((faq, i) => (
              <ScrollReveal key={`${activeCategory}-${i}`} delay={i * 0.08}>
                <motion.div
                  layout
                  className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-card"
                >
                  <button
                    onClick={() => setOpenQ(openQ === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-dark font-semibold text-sm pr-4 font-label">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openQ === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown size={18} className="text-dark/40" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openQ === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-dark/60 text-sm leading-relaxed border-t border-card pt-4">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
