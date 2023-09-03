import { useContext } from 'react';
import { Link } from 'react-router-dom';
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
        // Пользователь аутентифицирован, показываем кнопку "User"
        <Link to="/user">
          <button>User</button>
          <button>reLogin</button>
        </Link>
      ) : (
        // Пользователь не аутентифицирован, показываем кнопку "Login"
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </>
  );
}
