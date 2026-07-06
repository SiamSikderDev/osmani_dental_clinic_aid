'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { useSettings } from '@/lib/useSettings';

export default function Footer() {
  const { settings } = useSettings();
  const addr = settings.contact.address.split('\n');

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <Image
                src="/images/Family Dentistry Logo.jpeg"
                alt="Family Dentistry"
                width={180}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your trusted partner in dental health. We provide exceptional care with
              a gentle touch, ensuring every visit is comfortable and effective.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FaFacebookF, url: settings.socialLinks.facebook, label: 'Facebook' },
                { Icon: FaInstagram, url: settings.socialLinks.instagram, label: 'Instagram' },
                { Icon: FaTwitter, url: settings.socialLinks.twitter, label: 'Twitter' },
                { Icon: FaLinkedinIn, url: settings.socialLinks.linkedin, label: 'LinkedIn' },
              ].filter(s => s.url).map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label={s.label}
                >
                  <s.Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">Quick Links</h4>
            <div className="space-y-3">
              {[
                { href: '/services', label: 'Our Services' },
                { href: '/about', label: 'About Us' },
                { href: '/appointment', label: 'Book Appointment' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/faq', label: 'FAQ' },
                { href: '/feedback', label: 'Share Feedback' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-white/60 hover:text-accent transition-colors text-sm font-label"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                <p className="text-white/60 text-sm">
                  {addr.map((line, i) => <span key={i}>{line}{i < addr.length - 1 && <br />}</span>)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <p className="text-white/60 text-sm">{settings.contact.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <p className="text-white/60 text-sm">{settings.contact.email}</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-accent mt-0.5 shrink-0" />
                <div className="text-white/60 text-sm">
                  <p>Mon - Fri: {settings.contact.hours.weekday}</p>
                  <p>Saturday: {settings.contact.hours.saturday}</p>
                  <p>Sunday: {settings.contact.hours.sunday}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">Find Us</h4>
            <div className="rounded-xl overflow-hidden h-48 bg-card">
              <iframe
                src={settings.map.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-white/40 text-sm font-label">
            © {new Date().getFullYear()} Family Dentistry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
