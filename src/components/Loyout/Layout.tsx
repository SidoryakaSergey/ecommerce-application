import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.tsx';
import Footer from '../Footer/Footer.tsx';

function Layout() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-gray-100 flex flex-col">
        <Outlet />
      </main>
      <footer
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
          backgroundColor: 'rgb(253,253,255)',
        }}
      >
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
