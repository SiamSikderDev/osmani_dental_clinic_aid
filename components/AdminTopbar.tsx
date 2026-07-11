'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Home, LayoutDashboard, Settings, LogOut, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminTopbarProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export default function AdminTopbar({ title, subtitle, icon, rightContent }: AdminTopbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const menuItems = [
    { label: 'Home', icon: <Home size={18} />, href: '/' },
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/admin' },
    { label: 'Settings', icon: <Settings size={18} />, href: '/admin/settings' },
  ];

  return (
    <>
      <div className="bg-surface border-b border-border sticky top-0 z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <h1 className="text-lg font-bold text-dark font-heading">{title}</h1>
              <p className="text-dark/50 text-xs font-label">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {rightContent}
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-card transition-colors"
              aria-label="Menu"
            >
              <MoreVertical size={18} className="text-dark/60" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[280px] bg-surface shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-14 border-b border-border">
                <span className="text-sm font-bold text-dark font-heading">Menu</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-card flex items-center justify-center transition-colors"
                >
                  <X size={18} className="text-dark/60" />
                </button>
              </div>
              <div className="flex-1 py-3">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-dark/70 hover:bg-card hover:text-primary transition-colors font-label"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="border-t border-border py-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-dark/70 hover:bg-red-50 hover:text-red-600 transition-colors w-full font-label"
                >
                  <LogOut size={18} />
                  Lock
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
