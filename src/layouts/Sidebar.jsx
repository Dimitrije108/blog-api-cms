import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const { pathname } = useLocation();
  const activeStyle = "text-black";

  return (
    <div className="pt-4 pr-16 pb-4 pl-16 bg-white row-span-2 border-r border-r-gray-300 shadow-[8px_0_15px_-3px_rgba(0,0,0,0.1),8px_0_6px_-2px_rgba(0,0,0,0.05)]">
      <img
        className="pb-6"
        src={logo}
        alt="logo icon"
        title="Archaeoblog logo"
        width={100}
        height={100}
      />
      <nav>
        <ul className="space-y-2 divide-y divide-gray-300 font-['Oswald-Light'] text-xl tracking-wider [&>li]:pb-2 [&>li]:text-gray-500 [&>li]:transition-all [&>li]:duration-100 [&>li]:hover:text-gray-900">
          <li>
            <NavLink 
              to="/" 
              className={pathname === "/" ? activeStyle : ""}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/articles" 
              className={pathname.startsWith("/articles") && pathname !== "/articles/create" ? activeStyle : ""}
            >
              Articles
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/articles/create" 
              className={pathname === "/articles/create" ? activeStyle : ""}
            >
              Create Article
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/categories" 
              className={pathname === "/categories" ? activeStyle : ""}
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/comments" 
              className={pathname === "/comments" ? activeStyle : ""}
            >
              Comments
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/users" 
              className={pathname === "/users" ? activeStyle : ""}
            >
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
