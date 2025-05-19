'use client';

import { atom, useAtom } from 'jotai';
import { useVideoRotation } from '@/hooks/use-video-rotation';
import { motion } from 'motion/react';

const promptAtom = atom('');

export function PromptInput() {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const { activeVideo } = useVideoRotation();

  const handleGenerate = () => {
    console.log('Generating with prompt:', prompt);
  };

  return (
    <div className="w-full">
      <div className="flex w-full flex-col rounded-md border border-white/20 bg-white/10 text-white/60 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:pl-6">
        <motion.span
          key={activeVideo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-3 text-center sm:px-0 sm:text-left"
        >
          <span className="line-clamp-1">
            {activeVideo === 0
              ? 'Handheld, a starfighter takes off in the rain'
              : 'A whale dives into the desert, stirring up huge sand waves'}
          </span>
        </motion.span>
        <button className="rounded-r-md bg-white px-6 py-3 font-medium text-black hover:bg-white/90">
          Generate
        </button>
      </div>
    </div>
  );
}
