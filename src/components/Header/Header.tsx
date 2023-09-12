import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import Hamburger from 'hamburger-react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import styles from './Header.module.css';
import UserAccountHeader from './UserAccountHeader';
import logoPng from '../../assets/logo/logo.png';
import BurgerMenu from '../BurgerMenu/BurgerMenu.tsx';

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isOpen]);

  function showBurger() {
    if (isOpen) {
      return <BurgerMenu />;
    }
    return null;
  }

  return (
    <header className={styles.headerContainer}>
      {showBurger()}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          color: '#a94d29ff',
          gap: '20px',
        }}
      >
        <Hamburger toggled={isOpen} toggle={setOpen} />
        <NavLink to="/">
          <div className={styles.logoContainer}>
            <div style={{ width: '50px', height: '100%', padding: '5px' }}>
              <img src={logoPng} alt="Logo" className="" />
            </div>
            <div className={`${styles.logoContainer} ${styles.textLogo}`}>
              <h1 className="text-xl" style={{ whiteSpace: 'nowrap' }}>
                Doomsday store
              </h1>
            </div>
          </div>
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
      >
        <Link to="/about" style={{ color: '#a94d29ff' }}>
          <UserGroupIcon className="w-10 h-10 hover:text-blue-600" title="About Us" />
        </Link>
        <div
          className="space-x-4"
          style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#a94d29ff' }}
        >
          <UserAccountHeader />
        </div>
      </nav>
    </header>
  );
};

export default Header;
