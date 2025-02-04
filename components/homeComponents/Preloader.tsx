'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import StarField from './StarField';

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${
      312 - i * 5 * position
    } ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${
      470 - i * 6
    } ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${375 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="red"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Preloader({ setIsLoaded }: { setIsLoaded: (loaded: boolean) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 5000);
    return () => clearTimeout(timer);
  }, [setIsLoaded]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 5, times: [0, 0.3, 0.95, 1] }}
      onAnimationComplete={() => setIsLoaded(true)}
    >
      <StarField count={20} />

      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-1/4 max-w-md"
        initial={{ x: '100%', y: '0%', rotate: 0 }}
        animate={{ x: '-100vw', y: '50%', rotate: -45 }}
        transition={{ duration: 12 }}
      >
        <Image
          className="w-full h-auto object-contain"
          src="/assets/iss.png"
          width={400}
          height={400}
          alt="ISS"
          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
        />
      </motion.div>

      <motion.div
        className="absolute -left-1/4 top-1/2 -translate-y-1/2 z-10 w-1/2 max-w-xl "
        initial={{ rotate: 0, y: '-50%' }}
        animate={{ rotate: 45 }}
        transition={{ duration: 12 }}
      >
        <Image
          className="w-full h-auto brightness-110 drop-shadow-[0_0_10px_red]"
          src="/assets/sun.png"
          width={600}
          height={600}
          alt="Sun"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 30vw"
        />
      </motion.div>

      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      <motion.h2
        className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-white z-20 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Preparing for launch...
      </motion.h2>
    </motion.div>
  );
}
