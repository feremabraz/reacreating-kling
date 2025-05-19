'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { atom, useAtom } from 'jotai';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Jotai atoms for state management
const emailAtom = atom('');
const passwordAtom = atom('');
const showPasswordAtom = atom(false);

export default function LoginPage() {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [showPassword, setShowPassword] = useAtom(showPasswordAtom);
  const [charCount, setCharCount] = useState(0);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setCharCount(e.target.value.length);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white lg:flex-row">
      {/* Left side with animated image - hidden on mobile, shown on lg screens */}
      <div className="relative hidden w-full overflow-hidden lg:block lg:w-1/2">
        <motion.div
          className="absolute inset-0"
          animate={{
            x: [0, 5, 0, -5, 0],
            y: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 20,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'mirror',
          }}
        >
          <Image
            src="/images/anime-bg.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute bottom-4 left-4 text-xs text-white/70">
          Kling AI Creator @Heather Cooper
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex w-full flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="w-full max-w-md">
          <h1 className="mb-8 font-serif text-3xl italic tracking-wide sm:text-4xl md:mb-12">
            Welcome to Kling AI
          </h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block">
                Email Address
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="hello@example.com"
                  className="h-12 rounded-md border-0 bg-white/10 px-4 text-white placeholder:text-gray-500"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  {charCount} / 128
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-green-200 hover:text-green-300 font-bold"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-md border-0 bg-white/10 px-4 text-white placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-md border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20"
            >
              Sign In
            </button>
          </div>

          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <Button
              variant="link"
              className="flex items-center gap-1 text-white/70 hover:text-white"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <div className="text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="text-green-200 hover:text-green-300 font-bold">
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
