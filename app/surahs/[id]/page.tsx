'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { AyatDisplay } from '@/components/features/AyatDisplay';
import { SettingsPanel } from '@/components/features/SettingsPanel';
import { SearchBar } from '@/components/features/SearchBar';
import { getSurahAyahs, getAllSurahs } from '@/lib/quran-api';
import { AyahTranslation, UserSettings, Surah } from '@/lib/types';
import { getSettings } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Sliders } from 'lucide-react';

export default function SurahPage() {
  const params = useParams();
  const surahId = parseInt(params.id as string, 10);

  const [ayahs, setAyahs] = useState<AyahTranslation[]>([]);
  const [filteredAyahs, setFilteredAyahs] = useState<AyahTranslation[]>([]);
  const [surah, setSurah] = useState<Surah | null>(null);
  const [settings, setSettings] = useState<UserSettings>(getSettings());
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [surahAyahs, allSurahs] = await Promise.all([
          getSurahAyahs(surahId),
          getAllSurahs(),
        ]);

        if (surahAyahs) {
          setAyahs(surahAyahs);
          setFilteredAyahs(surahAyahs);
        }

        const currentSurah = allSurahs.find((s) => s.number === surahId);
        if (currentSurah) {
          setSurah(currentSurah);
        }
      } catch (error) {
        console.error('Error loading surah:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [surahId]);

  const handleSearch = (results: AyahTranslation[]) => {
    setFilteredAyahs(results.length > 0 ? results : ayahs);
  };

  const handleSettingsChange = (newSettings: UserSettings) => {
    setSettings(newSettings);
  };

  if (!surah && !isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Surah not found</p>
            <Link href="/surahs">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Back to Surahs
              </Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Navigation */}
          <Link href="/surahs" className="inline-block mb-6">
            <Button
              variant="outline"
              className="gap-2 border-border hover:bg-secondary"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Surahs
            </Button>
          </Link>

          {/* Page Header */}
          {surah && (
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {surah.englishName}
                  </h1>
                  <p className="text-3xl font-amiri text-right text-primary mb-3">
                    {surah.name}
                  </p>
                  <p className="text-muted-foreground">
                    {surah.numberOfAyahs} verses • {surah.revelationType}
                  </p>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="p-2.5 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Open settings"
                >
                  <Sliders className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar onResultsChange={handleSearch} />
          </div>

          {/* Verses */}
          <AyatDisplay
            ayahs={filteredAyahs}
            settings={settings}
            isLoading={isLoading}
          />
        </div>
      </main>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsChange={handleSettingsChange}
      />
    </>
  );
}
