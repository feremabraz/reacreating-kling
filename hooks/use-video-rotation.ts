'use client';

import { useState, useEffect } from 'react';

export function useVideoRotation(interval = 5000) {
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVideo((prev) => (prev === 0 ? 1 : 0));
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return { activeVideo };
}
