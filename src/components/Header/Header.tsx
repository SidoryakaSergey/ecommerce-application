import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';

import logoPng from '../../assets/logo/logo.png';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 p-4 flex items-center justify-center">
      <div className="container flex">
        <div>
          <img
            src={logoPng}
            alt="Пример изображения"
            className="w-40 4-20 rounded-lg border-2 border-blue-500"
          />
        </div>
        <div className="container flex flex-col items-center justify-center">
          <h1 className="text-xl">Doomday store</h1>
        </div>
      </div>
      <nav className="container mx-auto flex justify-end items-center gap-10">
        <NavLink
          to="/"
          className="text-white font-semibold text-lg hover:opacity-75 transition duration-300"
        >
          Main
        </NavLink>
        <div className="space-x-4">
          <NavLink to="/login" className="text-white hover:opacity-75 transition duration-300">
            Login
          </NavLink>
        </div>
      </nav>
      <div>
        <NavLink
          to="/login"
          className="flex flex-col items-center text-white hover:opacity-75 transition duration-300"
        >
          <UserCircleIcon className="w-10 h-10 text-white hover:text-gray-400" />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
