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
import ThrillersPage from './pages/Catalog/ThrillersPage/ThrillersPage.tsx';
import EroticaPage from './pages/Catalog/EroticaPage/EroticaPage.tsx';
import HorrorsPage from './pages/Catalog/HorrorsPage/HorrorsPage.tsx';
// import AboutUsPage from './pages/AboutUsPage/AboutUsPage.tsx';
import CatalogPage from './pages/Catalog/CatalogPage/CatalogPage.tsx';
import CartPage from './pages/CartPage/CartPage.tsx';

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
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/card/:id" element={<ProductPage />} />
          {/* <Route path="/about" element={<AboutUsPage />} /> */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/catalog/thrillers" element={<ThrillersPage />} />
          <Route path="/catalog/erotica" element={<EroticaPage />} />
          <Route path="/catalog/horrors" element={<HorrorsPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
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
