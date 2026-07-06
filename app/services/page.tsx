'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Stethoscope, Sparkles, Smile, Cross, Heart, Baby,
  ArrowRight, ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { useSettings } from '@/lib/useSettings';

const iconMap: Record<string, React.ElementType> = {
  Stethoscope, Sparkles, Smile, Cross, Heart, Baby,
};

export default function ServicesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { settings } = useSettings();
  const { services } = settings;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-bg to-accent/5 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-accent font-semibold text-sm font-label tracking-wide uppercase">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-dark mt-3 mb-6">
              Dental Services We Offer
            </h1>
            <p className="text-dark/60 max-w-2xl mx-auto text-lg">
              We provide a comprehensive range of dental services, from routine
              check-ups to advanced cosmetic and restorative procedures.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Stethoscope;
              const isOpen = expanded === service.id;
              return (
                <ScrollReveal key={service.id} delay={i * 0.08}>
                  <motion.div
                    layout
                    className="bg-card rounded-2xl overflow-hidden border border-primary/5"
                  >
                    <button
                      onClick={() => setExpanded(isOpen ? null : service.id)}
                      className="w-full flex items-center gap-6 p-6 text-left"
                    >
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="text-primary" size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-dark font-heading">
                          {service.name}
                        </h3>
                        <p className="text-dark/50 text-sm mt-1 font-label">
                          {service.priceRange}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={20} className="text-dark/40" />
                      </motion.div>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="border-t border-primary/10 pt-6">
                          <p className="text-dark/70 leading-relaxed mb-6">
                            {service.description}
                          </p>
                          <p className="text-sm text-dark/50 mb-6 font-label">
                            <span className="font-semibold text-dark/70">Price Range:</span>{' '}
                            {service.priceRange}
                          </p>
                          <Link
                            href="/appointment"
                            className="inline-flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-accent-dark transition-colors font-label"
                          >
                            Book This Service <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-dark mb-4 font-heading">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-dark/60 mb-8">
            Our team is happy to help you choose the right treatment. Schedule a
            consultation and we&apos;ll create a personalized plan for you.
          </p>
          <Link
            href="/appointment"
            className="bg-primary text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary-dark transition-colors inline-flex items-center gap-2 font-label"
          >
            Schedule Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
