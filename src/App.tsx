import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainPage from './pages/Main/MainPage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import RegisterPage from './pages/Register/RegisterPage.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import UserPage from './pages/UserPage/UserPage.tsx';
import Layout from './components/Loyout/Layout.tsx';
import AuthContext from './context/authContext.ts';
import ProductPage from './pages/ProductPage/ProductPage.tsx';

export function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [redirected, setRedirected] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('bearToken')) {
      setIsAuth(true);
    }
  }, []);
  useEffect(() => {
    if (isAuth && !redirected) {
      if (pathname === '/login' || pathname === '/register') navigate('/');
      setRedirected(true);
    }
  }, [isAuth, navigate, redirected, pathname]);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/card/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
