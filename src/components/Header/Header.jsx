import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/icon-vine.png";

const Header = (props) => {
	return (
		<header className={s.header}>
			{/* <img src="https://clipartcraft.com/images/abstract-logo-design-4.png" /> */}
			<img src={Logo} />

			<div className={s.loginBlock}>
				{props.isAuth ? (
					<div>
						{props.login} -{" "}
						<button onClick={props.logout} className={s.shineButton}>
							Log out
						</button>
					</div>
				) : (
					<NavLink
						className={(navData) => (navData.isActive ? s.active : s.login)}
						/*  className={s.login}  */ to={"/login"}
					>
						Login
					</NavLink>
				)}
			</div>
		</header>
	);
};
export default Header;

// import userPhoto from "../../../assets/images/testi-user.png";
