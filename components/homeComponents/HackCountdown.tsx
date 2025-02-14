import React, { useEffect, useState, useRef } from 'react';
import { config } from '../../hackportal.config';
import styles from './HackCountdown.module.css';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import StarField from './StarField';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 20,
    hours: 22,
    minutes: 56,
    seconds: 0,
  });

  const countdownRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLImageElement>(null);
  const countdownTitleRef = useRef<HTMLHeadingElement>(null);
  const countdownBoxesRef = useRef<(HTMLDivElement | null)[]>([]);

  // const isDesktopView = window.innerWidth >= 768;
  const isDesktopView = true;

  const moonHoverStyle = {
    animation: isDesktopView ? 'moveUpDown 2s infinite alternate' : 'none',
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const eventDate = new Date(config.targetDate);
      const timeDifference = eventDate.getTime() - now.getTime();

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isDesktopView) {
      gsap.set(cloudRef.current, { opacity: 1 });
      return;
    }

    // Set initial opacity of elements to 0 for desktop animation
    gsap.set(cloudRef.current, { opacity: 0 });
    gsap.set(countdownTitleRef.current, { opacity: 0, y: -50 });
    gsap.set(countdownBoxesRef.current, { scale: 0, opacity: 0 });

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });
          tl.to(cloudRef.current, { x: 0, opacity: 1, duration: 1.5 })
            .fromTo(
              countdownTitleRef.current,
              { opacity: 0, y: -50 },
              { opacity: 1, y: 0 },
              '+=0.5',
            )
            .fromTo(
              countdownBoxesRef.current,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, stagger: 0.1 },
              '+=0.5',
            );

          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
    if (countdownRef.current) {
      observer.observe(countdownRef.current);
    }

    return () => {
      if (countdownRef.current) {
        observer.unobserve(countdownRef.current);
      }
    };
  }, [isDesktopView]);

  const renderTimeBox = (value: number, label: string, index: number) => {
    const digits = value.toString().padStart(2, '0').split('');
    return (
      <div className="flex flex-col items-center space-y-2" key={label}>
        <div className="flex space-x-1 p-2 rounded-md">
          {digits.map((digit, idx) => (
            <div
              key={idx}
              className={`font-fredoka bg-white rounded-md flex items-center justify-center ${styles['countdown-box']} countdown-box`}
              ref={(el) => {
                countdownBoxesRef.current[index * 2 + idx] = el;
              }} // Now returns void
              style={{ opacity: isDesktopView ? 0 : 1 }}
            >
              {digit}
            </div>
          ))}
        </div>
        <span className={`text-lg md:text-md sm:text-sm xs:text-xs ${styles['countdown-label']}`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <div
      ref={countdownRef}
      className="relative min-h-screen flex flex-col items-center justify-center font-roboto"
      style={{
        background: '#000F27',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        minHeight: '180vh',
      }}
    >
      <div className="relative flex justify-center items-center w-full">
        <div
          className="relative w-full flex justify-center items-center"
          style={{ height: 'auto' }}
        >
          <StarField count={20} />
          <motion.img
            src="/assets/PurplePlanet.png"
            alt="Planet"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: 'center' }}
            ref={cloudRef}
            className={`w-100 h-auto ${styles.cloud}`}
          />

          <img
            src="/assets/moon1.png"
            alt="Moon 1"
            className="absolute"
            style={{
              width: '150px',
              height: '150px',
              top: '-10%',
              left: '60%',
              transform: 'translateX(-50%)', // center horizontally
              ...moonHoverStyle,
            }}
          />

          <img
            src="/assets/moon2.png"
            alt="Moon 2"
            className="absolute"
            style={{
              width: '50px',
              height: '50px',
              bottom: '20%',
              left: '80%',
              transform: 'translateX(-50%)',
              ...moonHoverStyle,
            }}
          />

          <img
            src="/assets/moon3.png"
            alt="Moon 3"
            className="absolute"
            style={{
              width: '100px',
              height: '100px',
              bottom: '50%',
              right: '90%',
              transform: 'translateX(-50%)',
              ...moonHoverStyle,
            }}
          />

          <img
            src="/assets/constellation.png"
            alt="Constellation"
            className="absolute"
            style={{
              width: '200px',
              height: '200px',
              bottom: '100%',
              right: '75%',
              transform: 'translateX(-50%)',
            }}
          />

          <div className="absolute flex flex-col items-center justify-center w-full h-full p-4 text-center">
            <h1
              ref={countdownTitleRef}
              className="text-6xl md:text-6xl sm:text-md xs:text-small font-bold text-[#f79256] text-stroke countdown-title"
              style={{ opacity: isDesktopView ? 0 : 1 }}
            >
              COUNTDOWN
            </h1>
            <div className="flex justify-center mt-2 space-x-2 text-3xl md:text-2xl sm:text-xl xs:text-lg font-inter font-slightbold text-[#05149C] ">
              {renderTimeBox(timeLeft.days, 'DAYS', 0)}
              {renderTimeBox(timeLeft.hours, 'HOURS', 1)}
              {renderTimeBox(timeLeft.minutes, 'MINUTES', 2)}
              {renderTimeBox(timeLeft.seconds, 'SECONDS', 3)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
