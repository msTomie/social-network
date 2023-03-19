import { stopSubmit } from "redux-form";
import { profileAPI, userAPI } from "../../api/api";

let ADD_POST = "ADD-POST";
// let UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
let SET_USER_PROFILE = "SET_USER_PROFILE";
let SET_STATUS = "SET_STATUS";
let DELETE_POST = "DELETE_POST";
let SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

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
				// newPostText: "",
				posts: [
					...state.posts,
					{ id: 5, message: action.newPostText, like: 0 },		
				],
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
		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter((p) => p.id !== action.postId),
			};
		}
		case SAVE_PHOTO_SUCCESS: {
			return {
				...state,
				profile: { ...state.profile, photos: action.photos },
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
export const deletePost = (postId) => ({
	type: DELETE_POST,
	postId,
});
export const savePhotoSuccess = (photos) => ({
	type: SAVE_PHOTO_SUCCESS,
	photos,
});
export const setUserProfile = (profile) => ({
	type: SET_USER_PROFILE,
	profile,
});
export const setStatus = (status) => ({
	type: SET_STATUS,
	status,
});
export const getUserProfile = (userId) => async (dispatch) => {
	let response = await userAPI.getProfile(userId); /* .then((response) => { */
	dispatch(setUserProfile(response.data));
	// });
};
export const getStatus = (userId) => async (dispatch) => {
	let response = await profileAPI.getStatus(userId); /* .then((response) => { */
	dispatch(setStatus(response.data));
	// });
};
export const updateStatus = (status) => async (dispatch) => {
	let response = await profileAPI.updateStatus(
		status
	); /* .then((response) => { */
	if (response.data.resultCode === 0) {
		dispatch(setStatus(status));
	}
	// });
};

export const savePhoto = (file) => async (dispatch) => {
	let response = await profileAPI.savePhoto(file);
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
	}
};
export const saveProfile = (profile) => async (dispatch, getState) => {
	const userId = getState().auth.id;
	let response = await profileAPI.saveProfile(profile);
	if (response.data.resultCode === 0) {
		dispatch(getUserProfile(userId));
	} else {
		dispatch(
			stopSubmit(
				"edit-profile",
				// {contacts: { facebook: response.data.messages[0] }},
				{ _error: response.data.messages[0] }
			)
		);
		return Promise.reject(response.data.messages[0]);
	}
};

export default profileReducer;

/* 	form: "edit-profie", */
