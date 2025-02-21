import Image from 'next/image';
import styles from './HomeChallenges.module.css';

const PRIZES = [
  {
    title: 'General 1st place',
    description: '3D printer',
    imgSrc: '/assets/3D_printer.png',
  },
  {
    title: 'General 2nd place',
    description: 'LG Monitor',
    imgSrc: '/assets/LG_Monitor.png',
  },
  {
    title: 'General 3rd place',
    description: 'Mechanical Keyboard',
    imgSrc: '/assets/keyboard.png',
  },
  {
    title: 'Hardware',
    description: 'Amazon Alexa',
    imgSrc: '/assets/alexa.png',
  },
  {
    title: 'Tech Titans',
    description: 'Mini Projector',
    imgSrc: '/assets/projector.png',
  },
  {
    title: 'Beginner',
    description: 'Doordash Gift Card - $50',
    imgSrc: '/assets/doordash.png',
  },
];

export default function HomeChallengesComponent() {
  return (
    <section
      className={`m-auto pb-[20rem] relative bg-gradient-to-b from-[#063074] to-[#B0D6F5] pt-48`}
    >
      <div className={styles.content}>
        <div className="font-roboto font-bold md:text-3xl text-xl text-center text-white">
          Challenge Prizes
        </div>
        <div
          style={{ textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}
          className="text-center text-4xl font-bold text-[#f79256] p-2 font-roboto uppercase relative"
        >
          Choose your track to get started
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 mt-6 mx-auto">
          {' '}
          {/* Adjusted gap-x for horizontal spacing */}
          {PRIZES.map((prize, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md w-96 mx-auto">
              <img
                src={prize.imgSrc}
                alt={prize.title}
                className="mx-auto w-36 h-36 object-contain" // Set uniform width and height
              />
              <h3 className="font-bold text-center">{prize.title}</h3>
              <p className="text-center">{prize.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
