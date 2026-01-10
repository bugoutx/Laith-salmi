'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface ContentItem {
  id: string;
  type: 'video' | 'image';
  mediaUrl?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  eyebrow?: string | null;
  displayOrder: number;
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch content items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/content-items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching content items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Detect desktop and autoplay on desktop when in view
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Autoplay on desktop when section comes into view
  useEffect(() => {
    if (isInView && isDesktop && videoRef.current && items[activeItemIndex]?.type === 'video') {
      videoRef.current.play().catch(() => {
        // Autoplay failed, user interaction required
      });
    }
  }, [isInView, isDesktop, activeItemIndex, items]);

  // Auto-swap slides every 5 seconds
  useEffect(() => {
    if (items.length <= 1 || !isInView || isAutoPlayPaused) return;

    const interval = setInterval(() => {
      setActiveItemIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % items.length;
        // Reset video state when switching
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        return nextIndex;
      });
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [items.length, isInView, isAutoPlayPaused]);

  // Resume auto-play after 10 seconds of inactivity
  useEffect(() => {
    if (!isAutoPlayPaused) return;

    const timeout = setTimeout(() => {
      setIsAutoPlayPaused(false);
    }, 10000); // Resume after 10 seconds

    return () => clearTimeout(timeout);
  }, [isAutoPlayPaused]);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current && items[activeItemIndex]?.type === 'video') {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, activeItemIndex, items]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setDuration(total);
      setProgress((current / total) * 100);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    }
  }, [duration]);

  const currentItem = items[activeItemIndex];
  const hasMedia = currentItem?.mediaUrl && currentItem.mediaUrl.trim() !== '';

  if (loading) {
    return (
      <section 
        ref={sectionRef}
        className="relative w-full py-12 lg:py-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center py-20">
            <p className="text-zinc-400" dir="rtl">جاري التحميل...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!currentItem) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-12 lg:py-16 overflow-hidden"
    >
      {/* Background - seamless continuation from hero */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
        {/* Subtle top gradient divider */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className={`grid grid-cols-1 ${hasMedia ? 'lg:grid-cols-2' : ''} gap-12 lg:gap-16 items-center`}>
          
          {/* Media Container - Only show if media exists */}
          {hasMedia && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full order-2 lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden bg-black/40 border border-green-500/10 shadow-2xl">
                {/* Subtle green glow */}
                <div className="absolute inset-0 bg-green-500/5 rounded-2xl pointer-events-none" />
                
                {/* Video or Image element */}
                <div 
                  className="relative aspect-video bg-black"
                  onMouseEnter={() => setIsAutoPlayPaused(true)}
                  onMouseLeave={() => setIsAutoPlayPaused(false)}
                >
                  {currentItem.type === 'video' ? (
                    <>
                      <video
                        ref={videoRef}
                        key={currentItem.mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onPlay={() => {
                          setIsPlaying(true);
                          setIsAutoPlayPaused(true);
                        }}
                        onPause={() => setIsPlaying(false)}
                        onClick={() => setIsAutoPlayPaused(true)}
                        aria-label={currentItem.title || 'Video content'}
                      >
                        <source src={currentItem.mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Custom controls overlay */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${!isPlaying ? 'bg-black/0 hover:bg-black/20' : 'bg-transparent hover:bg-black/10'}`}>
                        {(!isPlaying || !isDesktop) && (
                          <button
                            onClick={handlePlayPause}
                            className="w-16 h-16 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                            aria-label={isPlaying ? 'Pause video' : 'Play video'}
                          >
                            {isPlaying ? (
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800/50 cursor-pointer" onClick={handleProgressClick}>
                        <motion.div
                          className="h-full bg-green-500"
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>

                      {/* Time display */}
                      <div className="absolute bottom-2 right-3 text-xs text-zinc-400 font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </>
                  ) : (
                    <Image
                      src={currentItem.mediaUrl}
                      alt={currentItem.title || 'Content image'}
                      fill
                      className="object-cover"
                      priority
                      onClick={() => setIsAutoPlayPaused(true)}
                    />
                  )}
                </div>
              </div>

              {/* Item indicators if multiple items */}
              {items.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {items.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveItemIndex(index);
                        setIsPlaying(false);
                        setProgress(0);
                        setCurrentTime(0);
                        setIsAutoPlayPaused(true); // Pause auto-play when user manually selects
                      }}
                      onMouseEnter={() => setIsAutoPlayPaused(true)} // Pause on hover
                      onMouseLeave={() => setIsAutoPlayPaused(false)} // Resume on leave
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeItemIndex 
                          ? 'w-8 bg-green-500' 
                          : 'w-2 bg-zinc-600 hover:bg-zinc-500'
                      }`}
                      aria-label={`Go to item ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Text Content - Right side on desktop, first on mobile, centered if no media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className={`w-full ${hasMedia ? 'order-1 lg:order-2' : ''} space-y-6 ${hasMedia ? 'text-right lg:text-right' : 'text-center max-w-4xl mx-auto'} ${!hasMedia ? 'lg:col-span-1' : ''}`}
            dir="rtl"
          >
            {/* Eyebrow text */}
            {currentItem.eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm font-medium tracking-wide text-zinc-400 uppercase"
              >
                {currentItem.eyebrow}
              </motion.p>
            )}

            {/* Headline */}
            {currentItem.title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-zinc-50"
              >
                {currentItem.title}
              </motion.h2>
            )}

            {/* Subtitle */}
            {currentItem.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-lg sm:text-xl text-green-400 font-medium"
              >
                {currentItem.subtitle}
              </motion.p>
            )}

            {/* Description */}
            {currentItem.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className={`text-lg sm:text-xl leading-relaxed text-zinc-300 max-w-2xl ${hasMedia ? 'lg:ms-auto' : 'mx-auto'}`}
              >
                {currentItem.description}
              </motion.p>
            )}
            
            {/* Item indicators if multiple items and no media */}
            {!hasMedia && items.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveItemIndex(index);
                      setIsPlaying(false);
                      setProgress(0);
                      setCurrentTime(0);
                      setIsAutoPlayPaused(true);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeItemIndex 
                        ? 'w-8 bg-green-500' 
                        : 'w-2 bg-zinc-600 hover:bg-zinc-500'
                    }`}
                    aria-label={`Go to item ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
