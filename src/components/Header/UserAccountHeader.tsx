import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  UserGroupIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import AuthContext from '../../context/authContext';
import { deleteLocalStorage } from '../../utils/localStorageFuncs';

export default function UserAccountHeader() {
  const authContext = useContext(AuthContext);
  const isAuth = authContext?.isAuth || false;
  const setIsAuth = authContext?.setIsAuth || null;

  return (
    <>
      {isAuth ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            gap: '10px',
            color: '#E5E7EB',
            justifyContent: 'space-evenly',
          }}
        >
          <NavLink to="/cart">
            <ShoppingCartIcon className="w-10 h-10 hover:text-blue-600" title="About Us" />
          </NavLink>
          <NavLink to="/about">
            <UserGroupIcon className="w-10 h-10 hover:text-blue-600" title="About Us" />
          </NavLink>
          <NavLink to="/user">
            <button title="User profile">
              <UserCircleIcon className="w-10 h-10 hover:text-blue-600" />
            </button>
          </NavLink>
          <NavLink to="/login">
            <button
              title="Log out"
              onClick={() => {
                deleteLocalStorage('bearToken');
                deleteLocalStorage('bearID');
                deleteLocalStorage('cartId');
                deleteLocalStorage('refreshToken');
                if (setIsAuth) setIsAuth(false);
              }}
            >
              <ArrowRightOnRectangleIcon className="w-10 h-10 mr-2 hover:text-blue-600" />
            </button>
          </NavLink>
        </div>
      ) : (
        <div className="flex text-white gap-[10px]">
          <NavLink to="/cart">
            <ShoppingCartIcon className="w-10 h-10  hover:text-blue-600" title="About Us" />
          </NavLink>
          <NavLink to="/about">
            <UserGroupIcon className="w-10 h-10  hover:text-blue-600" title="About Us" />
          </NavLink>
          <NavLink to="/register">
            <button title="Register user">
              <UserPlusIcon className="w-10 h-10  hover:text-blue-600" />
            </button>
          </NavLink>

          <NavLink to="/login">
            <button title="Login user" className="w-10 h-10  hover:text-blue-600">
              <ArrowLeftOnRectangleIcon className="w-10 h-10 mr-2" />
            </button>
          </NavLink>
        </div>
      )}
    </>
  );
}
