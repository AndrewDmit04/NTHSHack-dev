import Wave2 from '../assets/Wave2';
import Faq from './Faq';
import styles from './HomeFaq.module.css';
import { Images } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeFaq(props: { answeredQuestion: AnsweredQuestion[] }) {
  return (
    props.answeredQuestion.length != 0 && (
      <section
        className="bg-gradient-to-b from-[#4bccd3] to-[#4fd4dd]"
        style={{
          background: 'linear-gradient(#4bccd3 40%, #4fd4dd)',
          position: 'relative',
        }}
      >
        {/*****************Delete boulders and corgi once schedule page is back up*****************/}
        {/* Boulder Left */}
        {/* <img src={BoulderLeft.src} className={styles.boulderLeft} /> */}
        {/* Boulder Right */}
        {/* <img src={BoulderRight.src} className={styles.boulderRight} /> */}
        {/* Corgi Image with Bobbing Animation */}
        {/* <div */}
        {/*   style={{ */}
        {/*     position: 'absolute', */}
        {/*     top: '-10px', */}
        {/*     left: '50%', */}
        {/*     transform: 'translateX(-50%)', */}
        {/*     zIndex: 4, */}
        {/*     animation: 'bobbing 3s ease-in-out infinite', */}
        {/*   }} */}
        {/* > */}
        {/*   <Image src={corgi} alt="Corgi on boat" width={200} height={200} /> */}
        {/* </div> */}

        {/* placeholder text */}
        {/* <div id="schedule-section" ref={scheduleRef}> */}
        {/*   <h1 className="text-stroke text-6xl md:text-6xl sm:text-md xs:text-small font-bold text-[#F7CE79] font-jua text-center pb-10 pt-[14rem] uppercase"> */}
        {/*     Schedule coming soon... */}
        {/*   </h1> */}
        {/* </div> */}
        <Faq fetchedFaqs={props.answeredQuestion}></Faq>
        {/* Wave2 with Vertical Animation */}
        {/* <div className="wave-container">
          <div className="wave-animation">
            <Wave2
              className={styles.wave2}
              style={{
                background:
                  'linear-gradient(to bottom, rgb(218, 195, 151, 0) 55%, rgb(218, 195, 151) 45%)',
              }}
            />
          </div>
        </div> */}

        <div
          style={{
            position: 'absolute',
            bottom: '-2%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        >
          <motion.img
            src="/assets/shuttle.png"
            alt="shuttle"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            animate={{
              y: [0, -0.5, 0, 0.5, 0],
              x: [0, 0.5, -0.5, 0],
              // rotate: [0, -1, 1, -0.5, 0.5, 0]
            }}
            transition={{ dutation: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
          }}
        >
          <img src="/assets/grass1.png" alt="grass" className="w-full h-auto" />
        </div>
      </section>
    )
  );
}
