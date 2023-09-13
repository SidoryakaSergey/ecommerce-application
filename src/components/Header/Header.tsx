import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import UserAccountHeader from './UserAccountHeader';

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer} style={{ color: '#E5E7EB' }}>
      <div className={styles.logoContainer}>
        <NavLink to="/">
          <div className={styles.logoContainer}>
            <div className={`${styles.logoContainer} ${styles.textLogo}`}>
              <h1
                className="text-xl sm:text-3xl"
                style={{ whiteSpace: 'nowrap', fontFamily: 'Gloria Hallelujah' }}
              >
                DOOMSDAY
              </h1>
            </div>
          </div>
        </NavLink>
        <div className="h-[36px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100"></div>
        <NavLink to="/catalog" style={{ fontSize: '20px' }}>
          <div>Catalog</div>
        </NavLink>
      </div>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          color: '#a94d29ff',
          gap: '15px',
        }}
        className={styles.navContainer}
      >
        <div
          className={styles.navContent}
          style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#a94d29ff' }}
        >
          {/* <nav className={styles.logoContainer}>
         <NavLink
          to="/"
          style={{ color: '#a94d29ff' }}
          className="text-white font-semibold text-lg hover:opacity-75 transition duration-300"
        >
          Main
        </NavLink>
        <div className={styles.logoContainer}> */}
          <UserAccountHeader />
        </div>
      </nav>
    </header>
  );
};

export default Header;
