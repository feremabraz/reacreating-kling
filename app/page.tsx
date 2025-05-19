'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { VideoBackground } from '@/components/video-background';
import { PromptInput } from '@/components/prompt-input';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Video Background */}
      <VideoBackground />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-black/20"></div>

      {/* MainContent */}
      <div className="relative z-20 flex h-full flex-col">
        {/* Navigation */}
        <header className="relative">
          <nav className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-8">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Logo className="h-6 w-6 md:h-8 md:w-8" />
                <span className="ml-2 text-lg font-bold md:text-xl">KlingAI</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="ml-8 hidden space-x-4 md:ml-16 md:flex md:space-x-8">
                <Link href="/creative-studio" className="py-2 text-white/90 hover:text-white">
                  Creative Studio
                </Link>
                <Link href="/api-platform" className="py-2 text-white/90 hover:text-white">
                  API Platform
                </Link>
                <Link href="/about-us" className="py-2 text-white/90 hover:text-white">
                  About Us
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <Link
                href="/signin"
                className="hidden rounded-md border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20 sm:inline-block sm:px-6 sm:py-2"
              >
                Create
              </Link>

              {/* Mobile menu button */}
              <button
                className="ml-2 md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMounted && (isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />)}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          {isMounted && (
            <div
              className={`absolute left-0 top-full z-50 w-full transform bg-black/50 backdrop-blur-md transition-all duration-300 md:hidden ${
                isMobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-4 opacity-0'
              }`}
            >
              <div className="flex flex-col space-y-4 p-4">
                <Link
                  href="/creative-studio"
                  className="py-2 text-white/90 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Creative Studio
                </Link>
                <Link
                  href="/api-platform"
                  className="py-2 text-white/90 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  API Platform
                </Link>
                <Link
                  href="/about-us"
                  className="py-2 text-white/90 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/signin"
                  className="mt-2 inline-block rounded-md border border-white/20 bg-white/10 px-6 py-2 text-center text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create
                </Link>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-2 text-4xl font-bold sm:text-5xl md:mb-4 md:text-6xl">KlingAI</h1>
          <h2 className="mb-8 font-serif text-3xl italic sm:text-4xl md:mb-12 md:text-5xl">
            From Vision to Screen
          </h2>

          <div className="w-full max-w-full px-2 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <PromptInput />
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-xs text-white/50">
          <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-y-0">
            <div>https://klingai.com/global/</div>
            <div>© 2025 KlingAI</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
