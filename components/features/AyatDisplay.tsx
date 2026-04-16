'use client';

import { AyahTranslation, UserSettings } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface AyatDisplayProps {
  ayahs: AyahTranslation[];
  settings: UserSettings;
  isLoading?: boolean;
}

export function AyatDisplay({ ayahs, settings, isLoading }: AyatDisplayProps) {
  const [copiedAyahNumber, setCopiedAyahNumber] = useState<number | null>(null);

  const copyToClipboard = (text: string, ayahNumber: number) => {
    navigator.clipboard.writeText(text);
    setCopiedAyahNumber(ayahNumber);
    setTimeout(() => setCopiedAyahNumber(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-3 p-4 bg-muted rounded-lg animate-pulse">
            <div className="h-6 bg-background rounded w-1/4" />
            <div className="h-20 bg-background rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (ayahs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No verses found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {ayahs.map((ayah) => (
        <Card
          key={`${ayah.surah.number}-${ayah.numberInSurah}`}
          className="bg-card hover:shadow-md transition-shadow"
        >
          <CardContent className="p-6">
            {/* Verse Number */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                {ayah.surah.name} • Verse {ayah.numberInSurah}
              </span>
              <button
                onClick={() => copyToClipboard(ayah.text, ayah.number)}
                className="p-1.5 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Copy verse"
              >
                {copiedAyahNumber === ayah.number ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Arabic Text */}
            <p
              className={`text-right ${settings.arabicFont === 'amiri' ? 'font-amiri' : 'font-ibm-plex-arabic'} leading-relaxed mb-6 text-foreground`}
              style={{ fontSize: `${settings.arabicFontSize}px` }}
              dir="rtl"
            >
              {ayah.text}
            </p>

            {/* Translation */}
            <p
              className="text-foreground/80 leading-relaxed border-t border-border pt-4"
              style={{ fontSize: `${settings.translationFontSize}px` }}
            >
              {ayah.translation}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
