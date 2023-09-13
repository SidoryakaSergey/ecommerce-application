import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
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
        <div style={{ display: 'flex', gap: '15px', color: '#E5E7EB' }}>
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
