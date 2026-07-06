'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Target, Eye, Shield } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useSettings } from '@/lib/useSettings';
import { defaultSettings } from '@/lib/settings';

export default function AboutPage() {
  const { settings } = useSettings();
  const { doctors } = settings;
  
  const aboutSettings = settings.about || defaultSettings.about;
  const timeline = aboutSettings.timeline;
  const certifications = aboutSettings.certifications;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-bg to-accent/5 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-accent font-semibold text-sm font-label tracking-wide uppercase">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-dark mt-3 mb-6">
              Our Story
            </h1>
            <p className="text-dark/60 max-w-2xl mx-auto text-lg">
              {aboutSettings.heroSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src={settings.images.clinicInterior}
                  alt="Family Dentistry clinic"
                  width={600}
                  height={450}
                  className="object-cover w-full h-[450px]"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h2 className="text-3xl font-bold text-dark mb-6 font-heading">
                {aboutSettings.storyTitle}
              </h2>
              <p className="text-dark/60 leading-relaxed mb-4">
                {aboutSettings.storyParagraph1}
              </p>
              <p className="text-dark/60 leading-relaxed mb-8">
                {aboutSettings.storyParagraph2}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Our Mission', text: aboutSettings.mission },
              { icon: Eye, title: 'Our Vision', text: aboutSettings.vision },
              { icon: Shield, title: 'Our Values', text: aboutSettings.values },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="bg-surface rounded-2xl p-8 shadow-sm text-center h-full">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                    <item.icon className="text-accent" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-dark/60 text-sm leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-dark font-heading">
                Meet Our Team
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl overflow-hidden"
                >
                  <div className="relative h-64">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-dark font-heading">{doctor.name}</h3>
                    <p className="text-primary text-sm font-medium font-label">{doctor.specialization}</p>
                    <div className="mt-3 inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold font-label">
                      <Award size={12} /> {doctor.credentials}
                    </div>
                    <p className="text-dark/60 text-sm mt-3 leading-relaxed">{doctor.bio}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-dark text-center mb-16 font-heading">
              Our Journey
            </h2>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <span className="text-accent font-bold text-sm font-label">{item.year}</span>
                    <h4 className="text-lg font-bold text-dark mt-1 font-heading">{item.title}</h4>
                    <p className="text-dark/60 text-sm mt-1">{item.desc}</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-bg z-10" />
                  <div className="w-1/2" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-dark text-center mb-10 font-heading">
              Certifications & Affiliations
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-6 text-center">
                  <Award className="text-primary mx-auto mb-3" size={32} />
                  <p className="text-dark text-sm font-semibold font-label">{cert}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
