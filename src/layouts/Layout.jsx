import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className='mx-auto lg:max-w-[90rem] h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]'>
      <Sidebar />
      <Header />
      <main className='p-6'>
        <Outlet />
      </main>
    </div>
  )
};
