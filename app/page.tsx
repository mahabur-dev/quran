import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Search, Settings } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center mb-16">
            <div className="mb-6 inline-block">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
              The Holy Quran
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Read the Quran with beautiful Arabic text, English translations, and powerful search capabilities. Experience the divine message with an elegant interface designed for spiritual reflection.
            </p>
            <Link href="/surahs">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg">
                Start Reading
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Complete Text
                </h3>
                <p className="text-muted-foreground">
                  All 114 Surahs with authentic Arabic text and professional English translations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Search Functionality
                </h3>
                <p className="text-muted-foreground">
                  Find verses by keyword across all translations instantly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Customizable
                </h3>
                <p className="text-muted-foreground">
                  Adjust font sizes and styles to suit your reading preferences.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-12 border border-border">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Begin Your Quranic Journey
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access the complete Quran with translations, search, and personalized reading preferences.
            </p>
            <Link href="/surahs">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Read Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
