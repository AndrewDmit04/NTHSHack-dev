import clsx from 'clsx';
import { SectionReferenceContext } from '@/lib/context/section';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { X } from 'lucide-react';
import Preloader from './Preloader';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import StarField from './StarField';

export default function SpaceThemedHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const words = 'HTHS Hack Blast Off'.split(' ');

  const controls = useAnimation();
  const controls1 = useAnimation();

  useEffect(() => {
    const radius = 350; // Radius of the circles in pixels
    const duration = 10; // Duration for a full circle in seconds
    let angle = 0; // Base angle
    const angleOffset = Math.PI; // 180 degrees offset for opposite direction

    const animate = () => {
      // Animate first object (clockwise)
      controls.start({
        opacity: 1,
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        transition: { duration: 0.01, ease: 'linear' },
      });

      // Animate second object (counterclockwise, offset by π)
      controls1.start({
        opacity: 1,
        x: radius * Math.cos(angle + angleOffset),
        y: radius * Math.sin(angle + angleOffset),
        transition: { duration: 0.01, ease: 'linear' },
      });

      angle += (2 * Math.PI) / (duration * 100); // Increment angle for smoothness
      requestAnimationFrame(animate);
    };

    animate(); // Start the animation loop
  }, [controls, controls1]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {!isLoaded && <Preloader setIsLoaded={setIsLoaded} />}

      <StarField count={200} />

      <motion.div
        initial={{ opacity: 0, rotate: 0, translateY: '-50%', translateX: '-50%' }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{
          opacity: { delay: 2, duration: 2, ease: 'easeInOut' }, // Fade in over 2 seconds
          rotate: { delay: 2, duration: 70, ease: 'linear', repeat: Infinity, repeatType: 'loop' }, // Slow spin after fade-in
        }}
        className="max-w-4xl mx-auto absolute top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2"
      >
        <img src="/assets/moonLanding.png" alt="moon" className="" />
      </motion.div>

      <motion.div
        animate={controls}
        initial={{ opacity: 0 }}
        className="max-w-4xl mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <img src="/assets/astroid.png" alt="astroid" className="w-20 h-20" />
      </motion.div>

      <motion.div
        animate={controls1}
        initial={{ opacity: 0 }}
        className="max-w-4xl mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <img src="/assets/astroid.png" alt="astroid" className="w-20 h-20" />
      </motion.div>

      <AnimatePresence>
        {isLoaded && (
          <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
                {words.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                    {word.split('').map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: wordIndex * 0.1 + letterIndex * 0.03,
                          type: 'spring',
                          stiffness: 150,
                          damping: 25,
                        }}
                        className="inline-block text-transparent bg-clip-text 
                                  bg-gradient-to-r from-blue-500 via-sky-300 to-red-200"
                      >
                        {/* from-blue-500 via-sky-300 to-red-200 */}
                        {/* from-blue-500 to-purple-400 */}
                        {/* from-cyan-500 to-rose-200 */}
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-xl md:text-2xl text-gray-300 mb-8"
              >
                Embark on a cosmic coding adventure!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="space-x-4"
              ></motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rocket animation */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        initial={{ y: '100%' }}
        animate={{ y: '-100vh' }}
        transition={{ delay: 4, duration: 4, ease: 'easeInOut' }}
      >
        <Image src="/assets/rocket.webp" alt="Rocket" width={50} height={100} className="" />
      </motion.div>
    </div>
  );
}
