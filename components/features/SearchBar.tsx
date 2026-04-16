'use client';

import { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AyahTranslation } from '@/lib/types';
import { searchAyahs } from '@/lib/quran-api';

interface SearchBarProps {
  onResultsChange?: (results: AyahTranslation[]) => void;
  onLoading?: (isLoading: boolean) => void;
}

export function SearchBar({ onResultsChange, onLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      onResultsChange?.([]);
      return;
    }

    setIsSearching(true);
    onLoading?.(true);

    try {
      const results = await searchAyahs(searchQuery);
      onResultsChange?.(results);
    } catch (error) {
      console.error('Search error:', error);
      onResultsChange?.([]);
    } finally {
      setIsSearching(false);
      onLoading?.(false);
    }
  }, [onResultsChange, onLoading]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  const handleClear = () => {
    setQuery('');
    onResultsChange?.([]);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search Quran..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-secondary"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  );
}
