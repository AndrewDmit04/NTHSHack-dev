import React, { useState, useEffect } from 'react';
import birds from '../../public/assets/birds.png';
import frogBalloonMoving from '../../public/assets/frog-balloon-moving.gif';
import NumberTicker from '../NumberTicker';
import Image from 'next/image';
import StarField from './StarField';
import { motion } from 'framer-motion';

const HomeAboutPhotos = () => {
  const [windowScroll, setWindowScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setWindowScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cloudStyle = {
    transition: 'transform 0.3s ease-out',
  };

  const cloudLeftScroll = {
    transform: `translateX(${windowScroll * (window.innerWidth <= 660 ? 0.2 : 0.92)}px) rotate(${
      windowScroll / 30
    }deg) translateY(40%)`,
  };

  const cloudRightScroll = {
    transform: `translateX(${-1 * windowScroll * (window.innerWidth <= 660 ? 0.3 : 0.62)}px)`,
  };

  const balloonHoverStyle = {
    animation: 'balloonBob 1.5s infinite alternate ease-in-out',
  };

  return (
    <div className="relative flex flex-col items-center justify-center font-jua bg-black pt-72   ">
      <StarField count={200} />

      {/* Right Cloud */}
      <div
        className="absolute top-[60%] lg:top-[5%] left-[5%] lg:left-[0%] transform z-0"
        style={{ ...cloudStyle, ...cloudLeftScroll }}
      >
        <img
          src="/assets/iss.png"
          alt="Astronaut"
          className="w-[15rem] md:w-[20rem] lg:w-[25rem] cloud-hover"
        />
      </div>

      {/* Left Cloud
      <div
        className="absolute top-[40%] lg:top-[5%] right-[5%] lg:right-[30%] transform translate-x-[30%] z-50"
        style={{ ...cloudStyle, ...cloudRightScroll }}
      >
        <img
          src="/assets/iss.png"
          alt="Astronaut"
          className="w-[20rem] md:w-[25rem] lg:w-[30rem] cloud-hover"
          style={{ transform: 'scaleX(-1)' }} // flipping the image horizontally
        />
      </div> */}

      {/* About Section */}
      <div className="relative flex flex-col-reverse lg:flex-row items-center mb-5 font-fredoka z-10 space-y-8 lg:space-y-0 lg:space-x-15 mt-44 ">
        <div className="w-[600px] order-1 lg:order-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-300 to-red-200 lg:ml-8 ">
          <p className="text-5xl font-bold stroke-rose-700 text-centers ">
            <NumberTicker value={100} />+ Hackers
          </p>

          <p className="text-5xl font-bold ">
            <NumberTicker value={24} /> hours
          </p>

          <p className="text-5xl font-bold">
            $<NumberTicker value={2500} /> in prizes
          </p>

          <p className="text-5xl font-bold">
            <NumberTicker value={50} />+ projects
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeAboutPhotos;
