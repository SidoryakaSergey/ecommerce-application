import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/MainPage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import RegisterPage from './pages/Register/RegisterPage.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Layout from './components/Loyout/Layout.tsx';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
