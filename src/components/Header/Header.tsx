import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Hamburger from 'hamburger-react';
import styles from './Header.module.css';
import UserAccountHeader from './UserAccountHeader';
import logoPng from '../../assets/logo/logo.png';
import BurgerMenu from '../BurgerMenu/BurgerMenu.tsx';
import SearchingForm from './SearchingForm.tsx';

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
        <div
          className="space-x-4"
          style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#a94d29ff' }}
        >
          <SearchingForm />
          <UserAccountHeader />
        </div>
      </nav>
    </header>
  );
};

export default Header;
