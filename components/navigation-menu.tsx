'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { atom, useAtom } from 'jotai';
import { Logo } from './logo';

const isHoveringNavAtom = atom(false);
const activeNavAtom = atom<string | null>(null);

export function NavigationMenu() {
  const [isHoveringNav, setIsHoveringNav] = useAtom(isHoveringNavAtom);
  const [activeNav, setActiveNav] = useAtom(activeNavAtom);

  const handleNavHover = (item: string | null) => {
    setActiveNav(item);
  };

  return (
    <nav
      className="flex items-center justify-between px-8 py-6"
      onMouseEnter={() => setIsHoveringNav(true)}
      onMouseLeave={() => {
        setIsHoveringNav(false);
        setActiveNav(null);
      }}
    >
      <div className="flex items-center">
        <Link href="/" className="mr-16 flex items-center">
          <Logo />
          <span className="ml-2 text-xl font-bold">KlingAI</span>
        </Link>

        <div className="flex space-x-8">
          <div
            className="relative"
            onMouseEnter={() => handleNavHover('creative')}
            onMouseLeave={() => handleNavHover(null)}
          >
            <button className="py-2 text-white/90 hover:text-white">Creative Studio</button>

            <AnimatePresence>
              {isHoveringNav && activeNav === 'creative' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 space-y-2 whitespace-nowrap"
                >
                  <div className="py-1 text-white/80 hover:text-white">AI Tools</div>
                  <div className="py-1 text-white/80 hover:text-white">Video Generation</div>
                  <div className="py-1 text-white/80 hover:text-white">Image Generation</div>
                  <div className="py-1 text-white/80 hover:text-white">Sound Generation</div>
                  <div className="py-1 text-white/80 hover:text-white">Effects</div>
                  <div className="py-1 text-white/80 hover:text-white">More Tools</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onMouseEnter={() => handleNavHover('api')}
            onMouseLeave={() => handleNavHover(null)}
          >
            <button className="py-2 text-white/90 hover:text-white">API Platform</button>

            <AnimatePresence>
              {isHoveringNav && activeNav === 'api' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 space-y-2 whitespace-nowrap"
                >
                  <div className="py-1 text-white/80 hover:text-white">Mobile App</div>
                  <div className="flex space-x-4 py-2">
                    <div className="flex flex-col items-center">
                      <div className="h-24 w-24 bg-white p-2">
                        <div className="h-full w-full bg-black"></div>
                      </div>
                      <span className="mt-1 text-sm">iOS</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-24 w-24 bg-white p-2">
                        <div className="h-full w-full bg-black"></div>
                      </div>
                      <span className="mt-1 text-sm">Android</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onMouseEnter={() => handleNavHover('about')}
            onMouseLeave={() => handleNavHover(null)}
          >
            <button className="py-2 text-white/90 hover:text-white">About Us</button>
          </div>
        </div>
      </div>

      <div>
        <Link
          href="/signin"
          className="rounded-md border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20"
        >
          Create
        </Link>
      </div>
    </nav>
  );
}
