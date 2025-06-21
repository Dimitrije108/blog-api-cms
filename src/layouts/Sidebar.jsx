import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Sidebar() {
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
        <ul className='space-y-2 divide-y divide-gray-300 font-["Oswald-Light"] text-xl tracking-wider [&>li]:pb-2 [&>li]:text-gray-500 [&>li]:transition-all [&>li]:duration-100 [&>li]:hover:text-gray-900'>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          <li>
            <Link to="/articles/create">Create Article</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/comments">Comments</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
