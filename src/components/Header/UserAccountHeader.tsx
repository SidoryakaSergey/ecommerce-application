import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
            gap: '15px',
            color: '#E5E7EB',
            justifyContent: 'space-evenly',
          }}
        >
          <Link to="/cart" style={{ color: 'rgb(229, 231, 235)' }}>
            <ShoppingCartIcon className="w-10 h-10 hover:text-blue-600" title="About Us" />
          </Link>
          <Link to="/about" style={{ color: 'rgb(229, 231, 235)' }}>
            <UserGroupIcon className="w-10 h-10 hover:text-blue-600" title="About Us" />
          </Link>
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
        <>
          <Link to="/cart" style={{ color: 'rgb(229, 231, 235)' }}>
            <ShoppingCartIcon className="w-10 h-10 hover:text-blue-600" title="About Us" />
          </Link>
          <Link to="/about" style={{ color: 'rgb(229, 231, 235)' }}>
            <UserGroupIcon className="w-10 h-10 hover:text-blue-600" title="About Us" />
          </Link>
          <NavLink to="/register">
            <button title="Register user" style={{ color: '#E5E7EB' }}>
              <UserPlusIcon className="w-10 h-10 mr-2" />
            </button>
          </NavLink>

          <NavLink to="/login">
            <button title="Login user" style={{ color: '#E5E7EB' }}>
              <ArrowLeftOnRectangleIcon className="w-10 h-10 mr-2" />
            </button>
          </NavLink>
        </>
      )}
    </>
  );
}
