import React from "react";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

let Users = ({
	currentPage,
	totalUsersCount,
	pageSize,
	onPageChange,
	users,
	...props
}) => {
	return (
		<div>
			<Pagination
				currentPage={currentPage}
				onPageChange={onPageChange}
				totalItemsCount={totalUsersCount}
				pageSize={pageSize}
			/>
			{users.map((u) => {
				return (
					<User
						user={u}
						key={u.id}
						followingInProgress={props.followingInProgress}
						unfollow={props.unfollow}
						follow={props.follow}
					/>
				);
			})}
		</div>
	);
};
export default Users;
