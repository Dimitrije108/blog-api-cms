import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className='grid grid-cols-[auto_1fr]'>
      <Sidebar />
      <Header />
      <Outlet />
    </div>
  )
};
