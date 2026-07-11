'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteSettings, defaultSettings } from '@/lib/settings';

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export function useSettingsContext() {
  return useContext(SettingsContext);
}

export default function SettingsProvider({ initial, children }: { initial: SiteSettings; children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(initial);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/settings')
        .then((r) => r.json())
        .then((data) => { if (data && !data.error) setSettings(data); })
        .catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}
