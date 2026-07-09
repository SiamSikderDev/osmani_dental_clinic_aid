'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQ' },
  { href: '/feedback', label: 'Feedback' },
  { href: '/contact', label: 'Contact' },
];

function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-full hover:bg-black/10 hover:bg-surface/10 transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-surface/70 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.06)] transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.jpeg"
                alt="Osmani Dental Clinic Aid"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
                sizes="140px"
                priority
              />
            </Link>

            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-medium text-muted hover:text-primary transition-colors font-label"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/appointment"
                className="bg-accent text-white px-5 py-2 rounded-full text-[13px] font-semibold hover:bg-accent-dark transition-colors font-label"
              >
                Book Appointment
              </Link>
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle />
              <button
                className="p-2 text-dark"
                onClick={() => setIsMobileOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[280px] bg-surface shadow-2xl md:hidden flex flex-col transition-colors"
            >
              <div className="flex items-center justify-between px-5 h-14 border-b border-border">
                <Image
                  src="/images/logo.jpeg"
                  alt="Osmani Dental Clinic Aid"
                  width={120}
                  height={36}
                  className="h-8 w-auto object-contain"
                  sizes="120px"
                />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 -mr-2 text-muted hover:text-dark rounded-lg hover:bg-black/5 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors font-label ${
                          pathname === link.href
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted hover:bg-black/5 hover:text-dark'
                        }`}
                      >
                        {link.label}
                        <ChevronRight size={14} className="opacity-30" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <Link
                  href="/appointment"
                  className="block bg-accent text-white px-6 py-3 rounded-xl text-sm font-semibold text-center hover:bg-accent-dark transition-colors font-label"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
