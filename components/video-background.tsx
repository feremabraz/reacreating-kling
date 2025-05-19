'use client';

import { useState, useRef, useEffect } from 'react';

export function VideoBackground() {
  const [activeVideo, setActiveVideo] = useState(1);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [isVideo1Loaded, setIsVideo1Loaded] = useState(false);
  const [isVideo2Loaded, setIsVideo2Loaded] = useState(false);

  // Initialize videos
  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;

    if (video1) {
      video1.addEventListener('loadeddata', () => {
        console.log('Video 1 loaded');
        setIsVideo1Loaded(true);
      });
    }

    if (video2) {
      video2.addEventListener('loadeddata', () => {
        console.log('Video 2 loaded');
        setIsVideo2Loaded(true);
      });
    }

    return () => {
      if (video1) {
        video1.removeEventListener('loadeddata', () => setIsVideo1Loaded(true));
      }
      if (video2) {
        video2.removeEventListener('loadeddata', () => setIsVideo2Loaded(true));
      }
    };
  }, []);

  // Start playing the first video when loaded
  useEffect(() => {
    if (isVideo1Loaded && activeVideo === 1) {
      console.log('Starting video 1');
      const video1 = video1Ref.current;
      if (video1) {
        video1.currentTime = 0;
        video1.play().catch((err) => console.error('Error playing video 1:', err));
      }
    }
  }, [isVideo1Loaded, activeVideo]);

  // Start playing the second video when it becomes active
  useEffect(() => {
    if (isVideo2Loaded && activeVideo === 2) {
      console.log('Starting video 2');
      const video2 = video2Ref.current;
      if (video2) {
        video2.currentTime = 0;
        video2.play().catch((err) => console.error('Error playing video 2:', err));
      }
    }
  }, [isVideo2Loaded, activeVideo]);

  // Handle video 1 ended
  useEffect(() => {
    const video1 = video1Ref.current;
    if (!video1) return;

    const handleVideo1Ended = () => {
      console.log('Video 1 ended');
      setActiveVideo(2);
    };

    video1.addEventListener('ended', handleVideo1Ended);
    return () => video1.removeEventListener('ended', handleVideo1Ended);
  }, []);

  // Handle video 2 ended
  useEffect(() => {
    const video2 = video2Ref.current;
    if (!video2) return;

    const handleVideo2Ended = () => {
      console.log('Video 2 ended');
      setActiveVideo(1);
    };

    video2.addEventListener('ended', handleVideo2Ended);
    return () => video2.removeEventListener('ended', handleVideo2Ended);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-black">
      {/* Video 1 */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          activeVideo === 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <video
          ref={video1Ref}
          muted
          playsInline
          className="h-full w-full object-cover"
          preload="auto"
        >
          <source src="/videos/video1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Video 2 */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          activeVideo === 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <video
          ref={video2Ref}
          muted
          playsInline
          className="h-full w-full object-cover"
          preload="auto"
        >
          <source src="/videos/video2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Debug info - remove in production */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 p-2 text-xs text-white">
        Active: Video {activeVideo} | Loaded: V1: {isVideo1Loaded ? 'Yes' : 'No'}, V2:{' '}
        {isVideo2Loaded ? 'Yes' : 'No'}
      </div>
    </div>
  );
}
