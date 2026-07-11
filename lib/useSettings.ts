'use client';

import { useSettingsContext } from '@/components/SettingsProvider';

export function useSettings() {
  const settings = useSettingsContext();
  return { settings, loading: false };
}
