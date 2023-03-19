import { userAPI } from "../../api/api";
import { updateObjectArray } from "../../utils/validators/object-helpers";

let FOLLOW = "FOLLOW";
let UNFOLLOW = "UNFOLLOW";
let SET_USERS = "SET_USERS";
let SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
let SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
let TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
let TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
	users: [
		/* 
		{
			id: 1,
			photoUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Antu_config-users.svg/1200px-Antu_config-users.svg.png",
			followed: false,
			fullName: "Dmitry",
			status: "I am a boss",
			location: {
				city: "Minsk",
				country: "Belarus",
			},
		},
		{
			id: 2,
			photoUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Antu_config-users.svg/1200px-Antu_config-users.svg.png",
			followed: true,
			fullName: "Sasha",
			status: "I am a boss too",
			location: {
				city: "Moscow",
				country: "Ressia",
			},
		},
		{
			id: 3,
			photoUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Antu_config-users.svg/1200px-Antu_config-users.svg.png",
			followed: false,
			fullName: "Andrew",
			status: "I am a boss too",
			location: {
				city: "Kiev",
				country: "Ukraine",
			},
		}, */
	],
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjectArray(state.users, "id", action.userId, {
					followed: true,
				}),
				// users: state.users.map((u) => {
				// 	if (u.id === action.userId) {
				// 		return { ...u, followed: true };
				// 	}
				// 	return u;
				// }),
			};
		case UNFOLLOW:
			return {
				...state,
				users: updateObjectArray(state.users, "id", action.userId, {
					followed: false,
				}),

				// users: state.users.map((u) => {
				// 	if (u.id === action.userId) {
				// 		return { ...u, followed: false };
				// 	}
				// 	return u;
				// }),
			};
		case SET_USERS:
			return {
				...state,
				users: action.users,
			};

		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage,
			};
		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.count,
			};
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			};
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter((id) => {
							return id != action.userId;
					  }),
			};
		default:
			return state;
	}
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({
	type: SET_CURRENT_PAGE,
	currentPage,
});
export const setTotalUsersCount = (totalUsersCount) => ({
	type: SET_TOTAL_USERS_COUNT,
	count: totalUsersCount,
});
export const toggleIsFetching = (isFetching) => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});
export const toggleFollowingProgress = (isFetching, userId) => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userId,
});

// thunk
export const getUserrrs = (page, pageSize) => {
	return async (dispatch) => {
		dispatch(toggleIsFetching(true));
		dispatch(setCurrentPage(page));
		let data = await userAPI.requestUsers(
			page,
			pageSize
		); /* .then((data) => { */
		dispatch(toggleIsFetching(false));
		dispatch(setUsers(data.items));
		dispatch(setTotalUsersCount(data.totalCount));
		// });
	};
};

const followUnfollowFlow = async (
	dispatch,
	userId,
	apiMethod,
	actionCreator
) => {
	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.data.resultCode == 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
};
export const follow = (userId) => {
	return async (dispatch) => {
		let apiMethod = userAPI.follow.bind(userAPI);
		followUnfollowFlow(dispatch, userId, apiMethod, followSuccess);
	};
};
export const unfollow = (userId) => {
	return async (dispatch) => {
		let apiMethod = userAPI.unfollow.bind(userAPI);
		followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
	};
};

export default usersReducer;
