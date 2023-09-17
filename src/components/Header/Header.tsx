import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import UserAccountHeader from './UserAccountHeader';

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer} style={{ color: '#E5E7EB' }}>
      <div className={styles.logoContainer}>
        <Link to="/">
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
        </Link>
        <div className="h-[36px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100"></div>
        <Link to="/catalog" style={{ fontSize: '20px' }}>
          <div>Catalog</div>
        </Link>
      </div>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          color: '#a94d29ff',
          gap: '10px',
        }}
        className={styles.navContainer}
      >
        <div
          className={styles.navContent}
          style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#a94d29ff' }}
        >
          <UserAccountHeader />
        </div>
      </nav>
    </header>
  );
};

export default Header;
