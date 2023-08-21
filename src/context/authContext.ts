import { createContext, Dispatch, SetStateAction } from 'react';

interface AuthContextValue {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export default AuthContext;
