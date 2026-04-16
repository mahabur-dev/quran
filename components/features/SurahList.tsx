'use client';

import Link from 'next/link';
import { Surah } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface SurahListProps {
  surahs: Surah[];
  isLoading?: boolean;
}

export function SurahList({ surahs, isLoading }: SurahListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-muted rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {surahs.map((surah) => (
        <Link key={surah.number} href={`/surahs/${surah.number}`}>
          <Card className="h-full hover:shadow-md hover:border-primary transition-all cursor-pointer bg-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {surah.englishName}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {surah.numberOfAyahs} verses
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-right">
                <p className="text-lg font-amiri text-foreground">
                  {surah.name}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
