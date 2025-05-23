import { Outlet } from 'react-router-dom';
// Init Header, Navbar, and the CMS Dashboard
// CMS Dashboard should probably be Outlet because of SPA?
export default function App() {
  return (
    <>
      <div>
        Hello World!
      </div>
      <Outlet />
    </>
  )
};
