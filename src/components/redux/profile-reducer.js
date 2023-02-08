import { profileAPI, userAPI } from "../../api/api";

let ADD_POST = "ADD-POST";
// let UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
let SET_USER_PROFILE = "SET_USER_PROFILE";
let SET_STATUS = "SET_STATUS";

let initialState = {
	posts: [
		{ message: "Hello", like: 5 },
		{ message: "hi, it's me", like: 10 },
		{ message: "How are you?", like: 30 },
	],
	// newPostText: "",
	profile: null,
	status: "",
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			return {
				...state,
				newPostText: "",
				posts: [...state.posts, { id: 5, message: action.newPostText, like: 0 }],
			};
		}
		// case UPDATE_NEW_POST_TEXT: {
		// 	return {
		// 		...state,
		// 		newPostText: action.newText,
		// 	};
		// 	// stateCopy.newPostText = action.newText;
		// 	// return stateCopy;
		// }
		case SET_STATUS: {
			return {
				...state,
				status: action.status,
			};
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile,
			};
		}
		default:
			return state;
	}
};

export const addPostActionCreator = (newPostText) => ({
	type: ADD_POST,
	newPostText,
});
// export const updateNewPostTextActionCreator = (text) => ({
// 	type: UPDATE_NEW_POST_TEXT,
// 	newText: text,
// });
export const setUserProfile = (profile) => ({
	type: SET_USER_PROFILE,
	profile,
});
export const setStatus = (status) => ({
	type: SET_STATUS,
	status,
});
export const getUserProfile = (userId) => (dispatch) => {
	userAPI.getProfile(userId).then((response) => {
		dispatch(setUserProfile(response.data));
	});
};
export const getStatus = (userId) => (dispatch) => {
	profileAPI.getStatus(userId).then((response) => {
		dispatch(setStatus(response.data));
	});
};
export const updateStatus = (status) => (dispatch) => {
	profileAPI.updateStatus(status).then((response) => {
		if (response.data.resultCode === 0) {
			dispatch(setStatus(status));
		}
	});
};

export default profileReducer;
