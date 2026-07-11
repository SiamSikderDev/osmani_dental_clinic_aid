'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Stethoscope, Sparkles, Smile, Cross, Heart, Baby,
  CheckCircle, ArrowRight, Star, ChevronLeft, ChevronRight, Quote,
  Phone, Award, Users,
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
      <section className="relative min-h-screen flex items-center overflow-hidden transition-colors">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg via-surface to-primary/5 transition-colors" />
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(92,184,138,0.04)_1px,_transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32 lg:pt-17 lg:pb-0 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-dark leading-[1.15] mb-6"
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
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </motion.h1>

              <p className="text-lg text-muted mb-6 max-w-lg leading-relaxed">
                {settings.hero.subtitle}
              </p>

              {/* Trust bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex flex-wrap items-center gap-4 mb-8"
              >
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm font-bold text-dark ml-1">4.9</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-1.5 text-sm text-muted">
                  <Users size={15} className="text-primary" />
                  <span><strong className="text-dark font-semibold">2000+</strong> Happy Patients</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-1.5 text-sm text-muted">
                  <Award size={15} className="text-primary" />
                  <span><strong className="text-dark font-semibold">15+</strong> Years</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/appointment"
                  className="bg-accent text-white px-8 py-3.5 rounded-full font-semibold hover:bg-accent-dark hover:shadow-[0_8px_30px_rgba(232,144,159,0.35)] transition-all inline-flex items-center gap-2 font-label text-[15px]"
                >
                  {settings.hero.ctaText}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/services"
                  className="border-2 border-primary text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-primary hover:text-white transition-all font-label text-[15px]"
                >
                  Our Services
                </Link>
                <a
                  href="tel:+355000000000"
                  className="inline-flex items-center gap-2.5 bg-primary/10 text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-all font-label text-[15px] border border-primary/20 hover:border-primary hover:shadow-[0_8px_30px_rgba(92,184,138,0.3)]"
                >
                  <Phone size={17} />
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* Image area */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Decorative accent ring */}
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-sm" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/40 dark:border-white/5">
                <Image
                  src={settings.images.hero}
                  alt="Happy patient with a beautiful smile"
                  width={600}
                  height={500}
                  className="object-cover w-full h-[500px]"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Doctor card */}
              {doctors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute -bottom-5 -left-5 sm:-left-8 bg-surface/95 backdrop-blur-md rounded-2xl shadow-xl p-4 flex items-center gap-3.5 border border-border/50"
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/30 shrink-0">
                    <Image
                      src={doctors[0].image}
                      alt={doctors[0].name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark font-label">{doctors[0].name}</p>
                    <p className="text-xs text-primary font-medium font-label">{doctors[0].specialization}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>


      </section>

      {/* Stats Bar */}
      <section className="bg-stats py-16 transition-colors">
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
      <section className="py-24 bg-bg transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-accent font-semibold text-sm font-label tracking-wide uppercase">
                Our Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3 mb-4">
                Comprehensive Dental Care
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
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
                    className="bg-surface rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-border h-full"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="text-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-3 font-heading">
                      {service.name}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-4">
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
      <section className="py-24 bg-surface transition-colors">
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
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-24 bg-bg transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-accent font-semibold text-sm font-label tracking-wide uppercase">
                Our Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3 mb-4">
                Meet Our Specialists
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
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
                  className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                    <p className="text-muted text-sm mt-3 leading-relaxed">
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
      <section className="py-24 bg-surface overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-accent font-semibold text-sm font-label tracking-wide uppercase">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3 mb-4">
                What Our Patients Say
              </h2>
              <p className="text-muted max-w-xl mx-auto text-sm font-label">
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
                    <div className="bg-card rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-between relative transition-colors">
                      <Quote className="absolute top-6 right-8 text-primary/10" size={48} />
                      <div>
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonials[currentSlide].rating }).map((_, j) => (
                            <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-muted leading-relaxed italic text-lg">
                          &ldquo;{testimonials[currentSlide].text}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-11 h-11 rounded-full overflow-hidden relative ring-2 ring-primary/20">
                          <Image
                            src={testimonials[currentSlide].image}
                            alt={testimonials[currentSlide].name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-dark text-sm font-label">{testimonials[currentSlide].name}</p>
                          <p className="text-muted text-xs font-label">Verified Patient</p>
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
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_: unknown, i: number) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentSlide ? 'bg-primary w-6' : 'bg-border hover:bg-dark/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted font-label">No testimonials yet.</p>
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
              className="bg-surface text-primary px-10 py-4 rounded-full font-bold hover:bg-surface/90 transition-colors inline-flex items-center gap-2 font-label"
            >
              Book Appointment <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
