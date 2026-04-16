'use client';

import Link from 'next/link';
import { Book } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Book className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Al-Quran</h1>
        </Link>
        <nav className="flex gap-4">
          <Link
            href="/surahs"
            className="text-foreground hover:text-primary transition-colors"
          >
            Read
          </Link>
        </nav>
      </div>
    </header>
  );
}
