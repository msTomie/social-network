import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className={s.nav}>
			<div>
				<NavLink
					to="/Profile"
					className={(navData) => (navData.isActive ? s.active : s.item)}
				>
					{" "}
					Profile{" "}
				</NavLink>
			</div>
			<div>
				<NavLink
					to="/Dialogs"
					className={(navData) => (navData.isActive ? s.active : s.item)}
				>
					Dialogs
				</NavLink>
			</div>
			<div>
				<NavLink
					to="/News"
					className={(navData) => (navData.isActive ? s.active : s.item)}
				>
					News
				</NavLink>
			</div>
			<div>
				<NavLink
					to="/Music"
					className={(navData) => (navData.isActive ? s.active : s.item)}
				>
					Music
				</NavLink>
			</div>
			<div>
				<NavLink
					to="/Users"
					className={(navData) => (navData.isActive ? s.active : s.item)}
				>
					Users
				</NavLink>
			</div>
		</nav>
	);
};
export default Navbar;
