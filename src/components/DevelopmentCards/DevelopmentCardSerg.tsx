import photo from '../../assets/photo/serg.jpg';

export default function DevelopmentCardSerg() {
  return (
    <div className=" z-20 container flex flex-col md:flex-row rounded-lg bg-slate-800 shadow-md md:gap-10">
      <div className="flex flex-col justify-start items-center ">
        <div className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] bg-gray-300 rounded-full overflow-hidden m-5">
          <img src={photo} alt="photo" className="w-full h-full object-cover" />
        </div>
        <div className="md:mb-10">
          <h2 className="text-2xl font-bold">Sergey Sidoryaka</h2>
          <p>Frontend developer</p>
          <p>
            <a
              className="text-lg font-medium mt-2 hover:text-blue-700"
              href="https://github.com/SidoryakaSergey"
            >
              Page GitHub
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-10">
        <p>
          Hello! I&apos;m Sergey, and I made a career switch from 20 years in television graphics to
          frontend development in 2022. 📺💼 I&apos;m passionate about coding and enjoy every moment
          of it! 💻
        </p>
        <p>
          When I&apos;m not coding, you&apos;ll often find me immersed in classical music 🎶 or
          engrossed in detective and fantasy novels, with a particular fondness for Arthur Conan
          Doyle&apos;s work. 📚
        </p>
        <p>
          I also have a love for sports like basketball 🏀 and table tennis 🏓, and I&apos;m an avid
          gamer. Whether it&apos;s multiplayer with friends or immersive single-player adventures,
          I&apos;m all in! 🎮
        </p>
        <p>
          In my downtime, I unwind with cycling 🚲 and love hiking in the forest and mountains.😊
        </p>
      </div>
    </div>
  );
}
