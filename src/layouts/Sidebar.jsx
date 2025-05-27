import { Link } from "react-router-dom";

export default function Sidebar() {
	return (
		<nav className='row-span-2 pt-4 pb-4 pl-8 pr-8 border-r border-gray-300'>
			<ul className='space-y-2 divide-y divide-gray-300 [&>li]:pt-1 [&>li]:pb-1'>
				<li><Link to='/'>Dashboard</Link></li>
				<li><Link to='/articles'>Articles</Link></li>
				<li><Link to='/articles/create'>Create Article</Link></li>
				<li><Link to='/categories'>Categories</Link></li>
				<li><Link to='/comments'>Comments</Link></li>
				<li><Link to='/users'>Users</Link></li>
			</ul>
		</nav>
	)
};
