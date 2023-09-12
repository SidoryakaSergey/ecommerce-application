import styles from './about.module.css';
import logoRSS from '../../assets/logo/logo-rsschool3.png';

import DevelopmentCardAlex from '../../components/DevelopmentCards/DevelopmentCardAlex';
import DevelopmentCardSerg from '../../components/DevelopmentCards/DevelopmentCardSerg';
import DevelopmentCardVitalik from '../../components/DevelopmentCards/DevelopmentCardVitalik';

export default function AboutUsPage() {
  return (
    <div className={styles.bg}>
      <div className="flex items-center flex-col mb-10 ">
        <div className="flex flex-col justify-center items-center md:flex-row  relative rounded-lg bg-gray-400  shadow-md p-5 m-10">
          <div className="absolute inset-0 bg-slate-800 opacity-80 rounded-lg"></div>
          <div className="bg-white z-10 w-60 h-30 hover:bg-green-200">
            <a href="https://rs.school/" target="_blank" rel="noreferrer">
              <img src={logoRSS} alt="logoRSS" className="w-full h-full object-cover" />
            </a>
          </div>
          <div className="z-10 mt-2 md:ml-4">
            RS School is free-of-charge and community-based education program conducted by The
            Rolling Scopes developer community since 2013.
          </div>
        </div>
        <h2 className=" text-stone-50 font-extrabold text-2xl">Team The Apocalype Riders</h2>
        <div className="border-b border-white h-1 w-80 mb-6"></div>
        <div className=" relative flex flex-col items-center justify-center w-full">
          <div className="absolute inset-0 bg-white opacity-20 rounded-lg m-4"></div>
          <DevelopmentCardAlex />
          <br />
          <DevelopmentCardSerg />
          <br />
          <DevelopmentCardVitalik />
        </div>
      </div>
    </div>
  );
}
