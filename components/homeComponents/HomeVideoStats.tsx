import StarField from './StarField';

export default function HomeVideoStats() {
  return (
    <section className="z-0 relative py-[3rem] bg-gradient-to-b from-black to-[#000F27] pt-48">
      {/* Video Section */}
      <StarField count={100} />
      <div className="w-full flex justify-center mr-10">
        <iframe
          className="border-0 rounded-lg  z-10"
          width="700"
          height="400"
          src="https://www.youtube.com/embed/Yf6X96oeNSs"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

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
