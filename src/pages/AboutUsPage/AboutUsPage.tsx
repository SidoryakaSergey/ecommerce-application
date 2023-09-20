import styles from './about.module.css';
// import logoRSS from '../../assets/logo/logo-rsschool3.png';
//
// import DevelopmentCardAlex from '../../components/DevelopmentCards/DevelopmentCardAlex';
// import DevelopmentCardSerg from '../../components/DevelopmentCards/DevelopmentCardSerg';
// import DevelopmentCardVitalik from '../../components/DevelopmentCards/DevelopmentCardVitalik';

export default function AboutUsPage() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.firstSection}>
        <div className={styles.firstSectionBox}>
          <div className={styles.firstSectionContentWrapper}>
            <div className={styles.titleBox}>
              <h1 className={styles.title}>
                Who <br /> we <br /> are.
              </h1>
            </div>
            <div className={styles.logoPhoto}></div>
          </div>
          <div className={styles.firstSectionDesc}>
            <p>Meet the specialists in creating frontend applications.</p>
            <p>
              Our team of frontend application specialists is committed to creating innovative and
              user-friendly applications that meet our clients unique needs. We are constantly
              researching the latest technologies and trends in the industry to ensure that we
              deliver the best possible solutions.
            </p>
          </div>
        </div>
        <div className={styles.firstSectionRightMenu}></div>
      </section>
      <section className={styles.descSectionOne}>
        <div className={styles.descSectionOneDecription}>
          <div className={styles.descSectionOneDecriptionContentBox}>
            <div className={styles.descSectionOneDecriptionContentBoxWrapper}>
              <h2 className={styles.descSectionOneDecriptionContentTitle}>About Me</h2>
              <p className={styles.descSectionOneDecriptionContentDescValue}>
                Hi, my name is Vitalii Semenov, and I am a budding web developer with a
                master&apos;s degree in rock mechanics from Saint Petersburg Mining University.
                Since December 2022, I have been enrolled in RS School with a mission to code the
                future! Bringing a unique blend of analytical thinking and a passion for
                problem-solving, I am a former university teacher turned coding enthusiast. You can
                connect with me on LinkedIn or check out my coding journey on GitHub. In my free
                time, I love to explore hidden gem coffee shops around town, searching for the
                perfect cup of brew. ☕
              </p>
            </div>
          </div>
          <div className={styles.descSectionOnePhotoContentBox}>
            <div className={styles.descSectionOnePhotoContentBoxWrapper}>
              <a
                href="https://github.com/deepydee"
                target="_blank"
                className={styles.descSectionOnePhotoContentPhoto}
                rel="noreferrer"
              ></a>
              <p className={styles.descSectionOnePhotoContentDescVal}>
                Vitalii made valuable contributions to the Doomstore project by managing pull
                requests, tracking progress on Trello, and setting up the environment. His
                analytical mindset and passion for coding were instrumental in the team&apos;s
                success.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.descSectionOne}>
        <div className={styles.descSectionOneDecription}>
          <div className={`${styles.descSectionOnePhotoContentBox} ${styles.changeOrderFirt}`}>
            <div className={`${styles.descSectionOnePhotoContentBoxWrapper}`}>
              <a
                href="https://github.com/ZiberPax"
                target="_blank"
                className={styles.descSectionOnePhotoContentPhotoAlex}
                rel="noreferrer"
              ></a>
              <p className={styles.descSectionOnePhotoContentDescVal}>
                Alexey worked extensively with the commercetools API, creating the shopping cart,
                catalog, and product card pages. He also worked on the design of these pages and
                created all the necessary API requests. His attention to detail and ability to
                handle complex tasks made him a valuable member of the team. Alexey&apos;s work on
                the commercetools API was crucial to the success of the project, and he was able to
                deliver high-quality results in a timely manner.
              </p>
            </div>
          </div>
          <div
            className={`${styles.descSectionOneDecriptionContentBox} ${styles.changeOrderSecond}`}
          >
            <div className={`${styles.descSectionOneDecriptionContentBoxWrapper}`}>
              <h2
                className={`${styles.descSectionOneDecriptionContentTitle} ${styles.changeOrderFirtTitle}`}
                style={{ alignSelf: 'flex-end' }}
              >
                About Me
              </h2>
              <p className={styles.descSectionOneDecriptionContentDescValue}>
                Hello everyone! My name is Alexey, and I&apos;ve been working as a frontend
                developer since the summer of 2022. I can honestly say that I love my job and feel
                so fulfilled in this field. Every day, I&apos;m excited to learn new things and take
                on new challenges. Outside of work, I have several hobbies that I&apos;m really
                passionate about. I&apos;m a huge bookworm and read over 20 books in 2022 alone!
                Science fiction is my favorite genre, and Robin Hobb is my go-to author. Music is
                another big passion of mine, and I have a library of over 6000 songs spanning
                different genres. I also love watching movies and TV shows and discussing them with
                friends. When it comes to gaming, I enjoy both multiplayer games and immersive
                single-player adventures like Baldur&apos;s Gate 3. And when I need to unwind, I
                love to go cycling and explore the great outdoors. It&apos;s such a great way to
                relax and clear my mind. Currently, I work as a teacher at a programming school,
                where I teach children the basics of computer literacy. It&apos;s a rewarding
                experience to see their enthusiasm for learning and to help them build a foundation
                for their future profession. Overall, I&apos;m a firm believer in the quote,
                &quot;Find a job you love, and you&apos;ll never have to work a day in your
                life.&quot; I feel incredibly grateful that I found my calling in frontend
                development, and I&apos; excited to see where this career takes me in the future!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.descSectionOne}>
        <div className={styles.descSectionOneDecription}>
          <div className={styles.descSectionOneDecriptionContentBox}>
            <div className={styles.descSectionOneDecriptionContentBoxWrapper}>
              <h2 className={styles.descSectionOneDecriptionContentTitle}>About Me</h2>
              <p className={styles.descSectionOneDecriptionContentDescValue}>
                Hi there! My name is Sergey, and I recently made the transition from a 20-year
                career in television graphics to frontend development. I&apos;m extremely passionate
                about coding, and every day I&apos;m excited to learn new things and take on new
                challenges. In my free time, I have a few hobbies that I&apos;m very passionate
                about, including listening to classical music, reading detective and fantasy novels
                (especially Arthur Conan Doyle&apos;s work), playing basketball and table tennis,
                gaming (both multiplayer and single-player), and cycling to unwind while exploring
                the great outdoors. Thanks for taking the time to get to know me a little better!
              </p>
            </div>
          </div>
          <div className={styles.descSectionOnePhotoContentBox}>
            <div className={styles.descSectionOnePhotoContentBoxWrapper}>
              <a
                href="https://github.com/SidoryakaSergey"
                target="_blank"
                className={styles.descSectionOnePhotoContentPhotoSerg}
                rel="noreferrer"
              ></a>
              <p className={styles.descSectionOnePhotoContentDescVal}>
                Sergey&apos;s contributions to the Doomstore project were significant. He worked
                tirelessly on various aspects of the project, including creating registration and
                login forms, pagination, sorting, and authentication state. His ability to handle
                complex tasks was a great asset to the team, and his attention to detail ensured
                that everything was working smoothly. Additionally, Sergey helped to add new
                products to the store, which helped to increase its offerings and attract more
                customers. He was always willing to participate in discussions and share his ideas,
                making him a valuable member of the team.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.thanksSection}>
        <div className={styles.thanksSectionBox}>
          <div className={styles.thanksBox}>
            <a
              href="https://rs.school/"
              target="_blank"
              className={styles.rsLogo}
              rel="noreferrer"
            ></a>
            <p className={styles.rsParagraph}>
              We would like to express our sincere gratitude to the entire RS School team for giving
              us the opportunity to learn frontend and create our final project. Huge thanks to the
              administration, mentors, and activists for their hard work and support. Without your
              help, we would not have been able to achieve such results and gain so much new
              knowledge. We are grateful for your time and energy that you put into our education.
              We look forward to applying our new skills in future projects and continuing to learn
              from you. Thanks again!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
