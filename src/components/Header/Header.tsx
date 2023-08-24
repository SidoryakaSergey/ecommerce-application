import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 p-4">
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
    </header>
  );
};

export default Header;
