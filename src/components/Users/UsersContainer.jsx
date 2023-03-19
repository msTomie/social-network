import { connect } from "react-redux";
import {
	follow,
	setCurrentPage,
	// setTotalUsersCount,
	// setUsers,
	// toggleIsFetching,
	unfollow,
	toggleFollowingProgress,
	getUserrrs,
} from "../redux/users-reducer";
import Users from "./Users";
// import /* * as */ axios from "axios";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import { userAPI } from "../../api/api";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers,
} from "../redux/users-selectors";

class UsersContainer extends React.Component {
	componentDidMount() {
		const { currentPage, pageSize } = this.props;
		this.props.getUserrrs(currentPage, pageSize);
		// this.props.toggleIsFetching(true);
		// userAPI
		// 	.getUsers(this.props.currentPage, this.props.pageSize)
		// 	.then((data) => {
		// 		this.props.toggleIsFetching(false);
		// 		this.props.setUsers(data.items);
		// 		this.props.setTotalUsersCount(data.totalCount);
		// 	});
	}
	onPageChange = (pageNumber) => {
		const { pageSize } = this.props;
		this.props.getUserrrs(pageNumber, pageSize);
	};
	render() {
		return (
			<>
				{this.props.isFetching ? <Preloader /> : null}
				<Users
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					onPageChange={this.onPageChange}
					users={this.props.users}
					unfollow={this.props.unfollow}
					follow={this.props.follow}
					toggleFollowingProgress={this.props.toggleFollowingProgress}
					followingInProgress={this.props.followingInProgress}
				/>
				;
			</>
		);
	}
}

/* let mapStateToProps = (state) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress,
	};
}; */
let mapStateToProps = (state) => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
	};
};

/* let mapDispatchToProps = (dispatch) => {
	return {
		follow: (userId) => {
			dispatch(followActionCreator(userId));
		},
		unfollow: (userId) => {
			dispatch(unfollowActionCreator(userId));
		},
		setUsers: (users) => {
			dispatch(setUsersActionCreator(users));
		},
		setCurrentPage: (pageNumber) => {
			dispatch(setCurrentPageActionCreator(pageNumber));
		},
		setTotalUsersCount: (totalCount) => {
			dispatch(setTotalUsersCountActionCreator(totalCount));
		},
		toggleIsFetching: (isFetching) => {
			dispatch(toggleIsFetchingActionCreator(isFetching));
		},
	};
}; */

// export default withAuthRedirect(
// 	connect(mapStateToProps, {
// 		follow,
// 		unfollow,
// 		setCurrentPage,
// 		toggleFollowingProgress,
// 		getUserrrs,
// 	})(UsersContainer)
// );

export default compose(
	connect(mapStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		toggleFollowingProgress,
		getUserrrs,
	})
	// withAuthRedirect
)(UsersContainer);
