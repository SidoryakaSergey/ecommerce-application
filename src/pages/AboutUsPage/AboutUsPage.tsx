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
            <h2 className={styles.descSectionOneDecriptionContentTitle}>About Me</h2>
            <p className={styles.descSectionOneDecriptionContentDescValue}>
              Hi, my name is Vitalii Semenov, and I am a budding web developer with a master&apos;s
              degree in rock mechanics from Saint Petersburg Mining University. Since December 2022,
              I have been enrolled in RS School with a mission to code the future! Bringing a unique
              blend of analytical thinking and a passion for problem-solving, I am a former
              university teacher turned coding enthusiast. You can connect with me on LinkedIn or
              check out my coding journey on GitHub. In my free time, I love to explore hidden gem
              coffee shops around town, searching for the perfect cup of brew. ☕
            </p>
          </div>
          <div className={styles.descSectionOnePhotoContentBox}>
            <h2 className={styles.descSectionOnePhotoContentPhoto}></h2>
            <p className={styles.descSectionOnePhotoContentDescVal}></p>
          </div>
        </div>
      </section>
    </div>
  );
}
