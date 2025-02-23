import { stats } from '../../lib/data';
import StarField from './StarField';
import { motion } from 'framer-motion';

export default function HomeVideoStats() {
  return (
    <section className="z-0 relative py-[200px] bg-gradient-to-b from-black to-[#000F27] h-screen w-full">
      {/* Video Section */}
      <StarField count={100} />

      {/* Video container */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="relative aspect-video">
          <div className="absolute inset-0 rounded-lg bg-gray-800">
            <div className="flex items-center justify-center h-full text-gray-400">
              <iframe
                className="border-0 rounded-lg"
                width="700"
                height="400"
                src="https://www.youtube.com/embed/Yf6X96oeNSs"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Astronaut */}
      <motion.div
        className="absolute bottom-2 right-20"
        animate={{ y: [-20, 20, -20] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.img
          src="./assets/Astronaut.png"
          alt="Astronaut"
          className="w-30 h-40 object-contain"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Space Station */}
      <motion.div
        className="absolute bottom-40 left-45"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.img
          src="/assets/spaceStation.png"
          alt="Space Station"
          className="w-50 h-50 object-contain"
          animate={{ rotate: [0, 5, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Stats Section */}
      {/* <div className="flex flex-col justify-center items-center">
        {stats.map((stat, index) => (
          <div
            key={stat.data}
            className={`${
              index % 2 === 0 ? 'lg:ml-40 md:ml-20 ml-14' : 'md:mr-8 mr-24'
            } text-center md:my-6 my-4`}
          >
            <p className="font-bold text-2xl text-primaryDark lg:text-5xl">{stat.data}</p>
            <p className="font-medium text-lg lg:text-3xl">{stat.object}</p>
          </div>
        ))}
      </div> */}
    </section>
  );
}
