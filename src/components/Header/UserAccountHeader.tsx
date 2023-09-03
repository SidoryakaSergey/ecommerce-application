import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/authContext';
// import UserData from '../../interfaces/UserData';
// import getDataCustomer from '../../fetchs/getDataCustomer';

// async function handelGetDataCustomer() {
//   const data: UserData = await getDataCustomer('5b8323b7-5a80-4175-b4ff-72c4325b0d8a');
//   console.log(data);
// }

export default function UserAccountHeader() {
  const authContext = useContext(AuthContext);
  const isAuth = authContext?.isAuth || false; // Если authContext равен null, то isAuth равен false

  return (
    <>
      {isAuth ? (
        // Пользователь аутентифициро-ван, показываем кнопку "User"
        <div style={{ display: 'flex', gap: '15px' }}>
          <NavLink to="/user">
            <button>User</button>
          </NavLink>
          <NavLink to="/login">
            <button>reLogin</button>
          </NavLink>
        </div>
      ) : (
        // Пользователь не аутентифицирован, показываем кнопку "Login"
        <NavLink to="/login">
          <button>Login</button>
        </NavLink>
      )}
    </>
  );
}
