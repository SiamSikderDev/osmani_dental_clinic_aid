'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useSettings } from '@/lib/useSettings';

export default function WhatsAppButton() {
  const { settings } = useSettings();
  const phone = settings.contact.phone.replace(/[^+\d]/g, '');

  return (
    <motion.a
      href={`https://wa.me/${phone.replace('+', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={26} />
    </motion.a>
  );
}
