'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { useSettings } from '@/lib/useSettings';

export default function EmergencyBanner() {
  const { settings } = useSettings();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('emergency-banner-dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('emergency-banner-dismissed', '1');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-[60] overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#B91C1C]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between py-2">
                {/* Left: pulsing dot */}
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surface/60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-surface" />
                  </span>
                  <span className="text-white/70 text-xs font-medium tracking-wide uppercase font-label hidden sm:inline">
                    Emergency
                  </span>
                </div>

                {/* Center: message */}
                <div className="flex items-center gap-2 flex-1 justify-center">
                  <p className="text-white text-xs sm:text-sm font-medium text-center font-label">
                    Dental Emergency? We&apos;re here to help
                  </p>
                  <a
                    href={`tel:${settings.contact.phone.replace(/[^+\d]/g, '')}`}
                    className="inline-flex items-center gap-1.5 bg-surface/15 hover:bg-surface/25 backdrop-blur-sm text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full transition-all hover:scale-[1.03] active:scale-[0.98] font-label"
                  >
                    <Phone size={12} className="fill-white" />
                    {settings.contact.phone}
                  </a>
                </div>

                {/* Right: close */}
                <button
                  onClick={dismiss}
                  className="text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-surface/10"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
