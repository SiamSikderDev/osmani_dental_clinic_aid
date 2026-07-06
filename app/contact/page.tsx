'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useSettings } from '@/lib/useSettings';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { settings } = useSettings();
  const addr = settings.contact.address.split('\n');

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-bg to-accent/5 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4 font-heading">
              Contact Us
            </h1>
            <p className="text-dark/60 max-w-xl mx-auto">
              Have a question or need to get in touch? We&apos;d love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Split Layout */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-dark mb-8 font-heading">
                Send Us a Message
              </h2>
              {submitted ? (
                <div className="bg-accent/10 rounded-2xl p-8 text-center">
                  <p className="text-accent font-semibold text-lg font-heading">
                    Message Sent!
                  </p>
                  <p className="text-dark/60 mt-2">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5 font-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5 font-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5 font-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5 font-label">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors font-label"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.2}>
              <h2 className="text-2xl font-bold text-dark mb-8 font-heading">
                Get in Touch
              </h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm font-label">Address</p>
                    <p className="text-dark/60 text-sm">
                      {addr.map((line: string, i: number) => <span key={i}>{line}{i < addr.length - 1 && <br />}</span>)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm font-label">Phone</p>
                    <p className="text-dark/60 text-sm">{settings.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm font-label">Email</p>
                    <p className="text-dark/60 text-sm">{settings.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm font-label">Working Hours</p>
                    <div className="text-dark/60 text-sm">
                      <p>Mon - Fri: {settings.contact.hours.weekday}</p>
                      <p>Saturday: {settings.contact.hours.saturday}</p>
                      <p>Sunday: {settings.contact.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#20b858] transition-colors font-label"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 w-full">
        <iframe
          src={settings.map.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
