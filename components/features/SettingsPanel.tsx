'use client';

import { useState, useEffect } from 'react';
import { Sliders } from 'lucide-react';
import { getSettings, saveSettings } from '@/lib/storage';
import { UserSettings } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange?: (settings: UserSettings) => void;
}

export function SettingsPanel({
  isOpen,
  onClose,
  onSettingsChange,
}: SettingsPanelProps) {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load settings from localStorage
    const loaded = getSettings();
    setSettings(loaded);
    setIsLoading(false);
  }, []);

  const handleFontChange = (font: 'amiri' | 'ibm-plex') => {
    if (!settings) return;
    const updated = { ...settings, arabicFont: font };
    setSettings(updated);
    saveSettings(updated);
    onSettingsChange?.(updated);
  };

  const handleArabicSizeChange = (size: number[]) => {
    if (!settings) return;
    const updated = { ...settings, arabicFontSize: size[0] };
    setSettings(updated);
    saveSettings(updated);
    onSettingsChange?.(updated);
  };

  const handleTranslationSizeChange = (size: number[]) => {
    if (!settings) return;
    const updated = { ...settings, translationFontSize: size[0] };
    setSettings(updated);
    saveSettings(updated);
    onSettingsChange?.(updated);
  };

  if (!isOpen || isLoading || !settings) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Arabic Font Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Arabic Font
            </label>
            <Select value={settings.arabicFont} onValueChange={handleFontChange as any}>
              <SelectTrigger className="bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amiri">Amiri (Traditional)</SelectItem>
                <SelectItem value="ibm-plex">IBM Plex Arabic (Modern)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Arabic Font Size */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Arabic Text Size: {settings.arabicFontSize}px
            </label>
            <Slider
              min={16}
              max={32}
              step={2}
              value={[settings.arabicFontSize]}
              onValueChange={handleArabicSizeChange}
              className="w-full"
            />
          </div>

          {/* Translation Font Size */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Translation Text Size: {settings.translationFontSize}px
            </label>
            <Slider
              min={12}
              max={20}
              step={1}
              value={[settings.translationFontSize]}
              onValueChange={handleTranslationSizeChange}
              className="w-full"
            />
          </div>

          {/* Preview */}
          <div className="mt-8 p-4 bg-secondary rounded-md space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Arabic Preview:</p>
              <p
                className="font-amiri text-right leading-relaxed"
                style={{ fontSize: `${settings.arabicFontSize}px` }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Translation Preview:</p>
              <p style={{ fontSize: `${settings.translationFontSize}px` }}>
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
