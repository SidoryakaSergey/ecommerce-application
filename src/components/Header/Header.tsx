import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Hamburger from 'hamburger-react';
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
            <div>
              <img src={logoPng} alt="Logo" className="w-10 4-20 rounded-lg" />
            </div>
            <div className={styles.logoContainer}>
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
        {/* <NavLink
          to="/"
          style={{ color: '#a94d29ff' }}
          className="text-white font-semibold text-lg hover:opacity-75 transition duration-300"
        >
          Main
        </NavLink> */}
        <div
          className="space-x-4"
          style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#a94d29ff' }}
        >
          <UserAccountHeader />
          {/* <div>
            <NavLink
              style={{ color: '#a94d29ff' }}
              to="/login"
              className="flex flex-col items-center text-white hover:opacity-75 transition duration-300"
            >
              <UserCircleIcon className="w-10 h-10 text-white hover:text-gray-400" />
            </NavLink>
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
