'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Stethoscope, Sparkles, Smile, Cross, Heart, Baby,
  CheckCircle, ArrowRight, Star, ChevronLeft, ChevronRight, Quote,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import { useSettings } from '@/lib/useSettings';

const iconMap: Record<string, React.ElementType> = {
  Stethoscope, Sparkles, Smile, Cross, Heart, Baby,
};

const stats = [
  { label: 'Patients', value: 2000, suffix: '+' },
  { label: 'Years Experience', value: 15, suffix: '+' },
  { label: 'Doctors', value: 10, suffix: '+' },
];

const features = [
  'State-of-the-art dental technology',
  'Experienced and certified specialists',
  'Comfortable, spa-like environment',
  'Flexible scheduling and financing',
];

export default function HomePage() {
  const { settings } = useSettings();
  const { services, doctors } = settings;
  const testimonials = settings.testimonials;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % Math.max(testimonials.length, 1));
  }, [testimonials.length]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % Math.max(testimonials.length, 1));
  };

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, testimonials.length]);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-bg via-white to-primary/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {settings.hero.title.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="inline-block mr-[0.3em]"
                  >
                    {i === 4 ? (
                      <span className="relative inline-block">
                        {word}
                        <motion.span
                          className="absolute -bottom-1 left-0 h-[3px] bg-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.6, delay: 1.2 }}
                        />
                      </span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </motion.h1>

              <p className="text-lg text-dark/60 mb-8 max-w-lg leading-relaxed">
                {settings.hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/appointment"
                  className="bg-accent text-white px-8 py-3.5 rounded-full font-semibold hover:bg-accent-dark transition-colors inline-flex items-center gap-2 font-label"
                >
                  {settings.hero.ctaText}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/services"
                  className="border-2 border-primary text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors font-label"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={settings.images.hero}
                  alt="Happy patient with a beautiful smile"
                  width={600}
                  height={500}
                  className="object-cover w-full h-[500px]"
                  preload
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Smile className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-dark font-label">100% Satisfaction</p>
                  <p className="text-xs text-dark/50 font-label">Trusted by 2000+ patients</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-bold text-white mb-2 font-heading">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/60 font-label">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-accent font-semibold text-sm font-label tracking-wide uppercase">
                Our Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3 mb-4">
                Comprehensive Dental Care
              </h2>
              <p className="text-dark/60 max-w-2xl mx-auto">
                From routine check-ups to advanced procedures, we offer a full
                range of dental services to keep your smile healthy and beautiful.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Stethoscope;
              return (
                <ScrollReveal key={service.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-card h-full"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="text-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-3 font-heading">
                      {service.name}
                    </h3>
                    <p className="text-dark/60 text-sm leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>
                    <Link
                      href="/services"
                      className="text-primary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all font-label"
                    >
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="text-accent font-semibold text-sm font-label tracking-wide uppercase">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3 mb-8">
                We Put Your Comfort First
              </h2>
              <div className="space-y-5">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle className="text-accent shrink-0 mt-0.5" size={22} />
                    <div>
                      <p className="text-dark font-medium">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary font-semibold mt-8 hover:gap-3 transition-all font-label"
              >
                Learn More About Us <ArrowRight size={16} />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src={settings.images.clinicInterior}
                  alt="Modern dental clinic interior"
                  width={600}
                  height={450}
                  className="object-cover w-full h-[450px]"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-accent font-semibold text-sm font-label tracking-wide uppercase">
                Our Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3 mb-4">
                Meet Our Specialists
              </h2>
              <p className="text-dark/60 max-w-2xl mx-auto">
                Our team of experienced dental professionals is committed to
                providing you with the highest quality care.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold font-label">
                      {doctor.credentials}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-dark font-heading">
                      {doctor.name}
                    </h3>
                    <p className="text-primary text-sm font-medium font-label">
                      {doctor.specialization}
                    </p>
                    <p className="text-dark/60 text-sm mt-3 leading-relaxed">
                      {doctor.bio}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-accent font-semibold text-sm font-label tracking-wide uppercase">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3 mb-4">
                What Our Patients Say
              </h2>
              <p className="text-dark/50 max-w-xl mx-auto text-sm font-label">
                Real stories from real patients.{' '}
                <Link href="/feedback" className="text-primary font-semibold hover:underline">
                  Share your experience
                </Link>
              </p>
            </div>
          </ScrollReveal>

          {testimonials.length > 0 ? (
            <div className="relative max-w-3xl mx-auto">
              <div className="relative h-[320px] sm:h-[280px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -80 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <div className="bg-card rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-between relative">
                      <Quote className="absolute top-6 right-8 text-primary/10" size={48} />
                      <div>
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonials[currentSlide].rating }).map((_, j) => (
                            <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-dark/70 leading-relaxed italic text-lg">
                          &ldquo;{testimonials[currentSlide].text}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-11 h-11 rounded-full overflow-hidden relative ring-2 ring-primary/20">
                          <Image
                            src={testimonials[currentSlide].image}
                            alt={testimonials[currentSlide].name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-dark text-sm font-label">{testimonials[currentSlide].name}</p>
                          <p className="text-dark/40 text-xs font-label">Verified Patient</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-dark/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_: unknown, i: number) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentSlide ? 'bg-primary w-6' : 'bg-dark/20 hover:bg-dark/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-dark/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-dark/40 font-label">No testimonials yet.</p>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-heading">
              Ready for a Perfect Smile?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Book your appointment today and take the first step towards a
              healthier, more confident you.
            </p>
            <Link
              href="/appointment"
              className="bg-white text-primary px-10 py-4 rounded-full font-bold hover:bg-white/90 transition-colors inline-flex items-center gap-2 font-label"
            >
              Book Appointment <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
