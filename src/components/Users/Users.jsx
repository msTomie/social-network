import s from "./Users.module.css";
import userPhoto from "../../assets/images/testi-user.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { userAPI } from "../../api/api";

let Users = (props) => {
	let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

	let pages = [];
	for (let i = 1; i <= pageCount; i++) {
		if (pages.length < 10) {
			pages.push(i);
		} /* добавила условие с if для меньшего отображения количества страниц */
	}

	return (
		<div>
			{pages.map((p) => {
				return (
					<span
						className={props.currentPage === p && s.selectedPage}
						onClick={(event) => {
							props.onPageChange(p);
							// this.props.setCurrentPage(p);
						}}
					>
						{p}
					</span>
				);
			})}

			{props.users.map((u) => {
				return (
					<div key={u.id} className={s.p}>
						<span>
							<div>
								<NavLink to={`/Profile/` + u.id}>
									<img
										src={u.photos.small != null ? u.photos.small : userPhoto}
										className={s.UserPhoto}
									/>
								</NavLink>
							</div>
							<div>
								{u.followed ? (
									<button
										disabled={props.followingInProgress.some((id) => {
											return id === u.id;
										})}
										onClick={() => {
											props.unfollow(u.id);
											// userAPI.unfollow(u.id).then((response) => {
											// 	if (response.data.resultCode == 0) {
											// 		props.unfollow(u.id);
											// 	}
											// 	props.toggleFollowingProgress(false, u.id);
											// });
										}}
									>
										Unfollow{" "}
									</button>
								) : (
									<button
										disabled={props.followingInProgress.some((id) => {
											return id === u.id;
										})}
										onClick={() => {
											props.follow(u.id);
											// userAPI.follow(u.id).then((response) => {
											// 	if (response.data.resultCode == 0) {
											// 		props.follow(u.id);
											// 	}
											// 	props.toggleFollowingProgress(false, u.id);
											// });
										}}
									>
										Follow{" "}
									</button>
								)}
							</div>
						</span>
						<span>
							<span>
								<div>{u.name}</div>
								<div>{u.status}</div>
							</span>
							<span>
								<div>{"u.location.country"}</div>
								<div>{"u.location.city"}</div>
							</span>
						</span>
					</div>
				);
			})}
		</div>
	);
};
export default Users;
