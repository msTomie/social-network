import s from "./Users.module.css";
import userPhoto from "../../assets/images/testi-user.png";
import { NavLink } from "react-router-dom";

let User = ({ user, followingInProgress, unfollow, follow }) => {
	return (
		<div className={s.c}>
			<span>
				<div>
					<NavLink to={`/Profile/` + user.id}>
						<img
							src={user.photos.small != null ? user.photos.small : userPhoto}
							className={s.UserPhoto}
						/>
					</NavLink>
				</div>
			</span>
			<div className={s.container}>
				<div className={s.text}>
					<div>{user.name}</div>
					<div>{user.status}</div>
				</div>
				<div className={s.text}>
					<div>{"user.location.country"}</div>
					<div>{"user.location.city"}</div>
				</div>
			</div>

			<div>
				{user.followed ? (
					<button
						className={s.shineButton}
						disabled={followingInProgress.some((id) => {
							return id === user.id;
						})}
						onClick={() => {
							unfollow(user.id);
						}}
					>
						Unfollow
					</button>
				) : (
					<button
						className={s.shineButton}
						disabled={followingInProgress.some((id) => {
							return id === user.id;
						})}
						onClick={() => {
							follow(user.id);
						}}
					>
						Follow
					</button>
				)}
			</div>
		</div>
	);
};

export default User;
