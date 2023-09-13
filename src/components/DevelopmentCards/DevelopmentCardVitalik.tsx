import photo from '../../assets/photo/vitalik.jpg';

export default function DevelopmentCardVitalik() {
  return (
    <div className=" z-20 container flex flex-col md:flex-row rounded-lg bg-slate-800 shadow-md md:gap-10">
      <div className="flex flex-col justify-start items-center ">
        <div className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] bg-gray-300 rounded-full overflow-hidden m-5">
          <img src={photo} alt="photo" className="w-full h-full object-cover" />
        </div>
        <div className="md:mb-10">
          <h2 className="text-2xl font-bold">Vitalii Semenov</h2>
          <p>Web Developer in Training</p>
          <p>
            <a
              className="text-lg font-medium mt-2 hover:text-blue-700"
              href="https://github.com/deepydee"
            >
              Page GitHub
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-10">
        <p>
          🚀 Transforming from a rock mechanics master&apos;s graduate at Saint Petersburg Mining
          University to a budding web developer. Currently enrolled in the RS School since December
          2022, on a mission to code the future!
        </p>
        <p>
          Former university teacher turned coding enthusiast, I bring a unique blend of analytical
          thinking and a passion for problem-solving to the world of web development.
        </p>
        <p>
          🎉 Fun Fact: When I&apos;m not immersed in lines of code, you can find me exploring hidden
          gem coffee shops around town, searching for the perfect cup of brew. ☕
        </p>
      </div>
    </div>
  );
}
