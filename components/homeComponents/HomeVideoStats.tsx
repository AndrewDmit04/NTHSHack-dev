import { stats } from '../../lib/data';
import StarField from './StarField';

export default function HomeVideoStats() {
  return (
    <section className="z-0 relative py-[3rem] bg-gradient-to-r from-black to-blue-950 h-screen w-full">
      {/* Video Section */}
      <StarField count={100} />
      <div className="w-full flex justify-center mr-10 translate-x-[-130px] translate-y-10 ">
        <style jsx>
          {`
            @keyframes float {
              0% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-20px);
              }
              100% {
                transform: translateY(0);
              }
            }
            @keyframes floatDiagonal {
              0% {
                transform: translate(0, 0);
              }
              50% {
                transform: translate(15px, -15px);
              }
              100% {
                transform: translate(0, 0);
              }
            }

            .animate-float-diagonal {
              animation: floatDiagonal 4s ease-in-out infinite;
            }

            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
          `}
        </style>
        <img src="/assets/Moon.png" className="absolute bottom-0 right-5 w-80 h-80" />
        <img
          src="/assets/Astronaut.png"
          className="absolute top-2 right-20 w-30 h-40 animate-float"
        />
        <img
          src="/assets/spaceStation.png"
          className="absolute bottom-10 left-40 w-50 h-50 animate-float-diagonal"
        />

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
    </section>
  );
}
