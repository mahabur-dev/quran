import { UserSettings } from './types';

const SETTINGS_KEY = 'quran-app-settings';

const DEFAULT_SETTINGS: UserSettings = {
  arabicFont: 'amiri',
  arabicFontSize: 24,
  translationFontSize: 16,
};

/**
 * Get user settings from localStorage
 */
export function getSettings(): UserSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }

  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error reading settings:', error);
  }

  return DEFAULT_SETTINGS;
}

/**
 * Save user settings to localStorage
 */
export function saveSettings(settings: Partial<UserSettings>): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

/**
 * Get CSS class name for selected font
 */
export function getFontClassName(font: 'amiri' | 'droid'): string {
  return font === 'amiri' ? 'font-amiri' : 'font-droid-arabic';
}
