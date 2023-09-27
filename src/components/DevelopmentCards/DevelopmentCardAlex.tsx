import photo from '../../assets/photo/alex.jpg';

export default function DevelopmentCardAlex() {
  return (
    <div className=" z-20 container flex flex-col md:flex-row rounded-lg bg-slate-800 shadow-md md:gap-10">
      <div className="flex flex-col justify-start items-center ">
        <div className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] bg-gray-300 rounded-full overflow-hidden m-5">
          <img src={photo} alt="photo" className="w-full h-full object-cover" />
        </div>
        <div className="md:mb-10">
          <h2 className="text-2xl font-bold">Alexey Meshin</h2>
          <p>Frontend developer</p>
          <p>
            <a
              className="text-lg font-medium mt-2 hover:text-blue-700"
              href="https://github.com/ZiberPax"
            >
              Page GitHub
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-10">
        <p>
          Hello! My name is Alexey, and I have been a frontend developer since the summer of 2022. I
          absolutely love this job and I want to fully realize myself in this field! 💻
        </p>
        <p>
          Besides programming, I have a few other hobbies. I am a bookworm 📚 In 2022, I have read
          over 20 books, and I particularly enjoy science fiction! My favorite author is Robin Hobb.
          I also can&apos;t live without music 🎶 I have over 6000 songs in my library, spanning
          various genres. I enjoy watching movies and TV shows, and I&apos;m always happy to share
          my opinion about them. I enjoy playing multiplayer games with friends, and I also find
          great enjoyment in immersive single-player experiences like Baldur&apos;s Gate 3.
        </p>
        <p>
          I also love cycling 🚲 Sometimes, I go on small bike rides outside the city. It&apos;s
          such a great way to relax and enjoy nature 😊
        </p>
        <p>
          Currently, I work as a teacher at a programming school, where children learn the basics of
          computer literacy. I enjoy working with them, as they are so open-minded, and I&apos;m
          happy to help them build a foundation for their future profession 💪
        </p>
        <p>
          &quot;Find a job you love, and you&apos;ll never have to work a day in your life.&quot;
          This quote embodies my philosophy, and I&apos;m grateful that I found my calling in
          frontend development! ❤️
        </p>
      </div>
    </div>
  );
}
