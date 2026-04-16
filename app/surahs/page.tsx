import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { SurahList } from '@/components/features/SurahList';
import { getAllSurahs } from '@/lib/quran-api';

export const metadata: Metadata = {
  title: 'Surahs - Al-Quran',
  description: 'Browse all 114 chapters of the Quran',
};

export default async function SurahsPage() {
  const surahs = await getAllSurahs();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Surahs (Chapters)
            </h1>
            <p className="text-lg text-muted-foreground">
              Select a chapter to begin reading the Quran
            </p>
          </div>

          {/* Surah List */}
          <SurahList surahs={surahs} />
        </div>
      </main>
    </>
  );
}
