import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-gray-100 flex flex-col">
        <Outlet />
      </main>
      <footer className="container mx-auto flex justify-center items-center p-4">
        eCommerce Application 2023
      </footer>
    </>
  );
}

export default Layout;
