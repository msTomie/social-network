import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../../api/api";

let SET_USER_DATA = "auth/SET_USER_DATA";
let GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.data,
				// isAuth: true,
			};

		default:
			return state;
	}
};
export const setAuthUserData = (id, email, login, isAuth) => ({
	type: SET_USER_DATA,
	data: { id, email, login, isAuth },
});
export const getCaptchaUrlSuccess = (captchaUrl) => ({
	type: GET_CAPTCHA_URL_SUCCESS,
	data: { captchaUrl },
});
export const getAuthUserData = () => async (dispatch) => {
	let response = await authAPI.me(); /* .then((response) => { */
	if (response.data.resultCode === 0) {
		let { id, email, login } = response.data.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
	// });
};

export const login =
	(email, password, rememberMe, captcha) => async (dispatch) => {
		let response = await authAPI.login(email, password, rememberMe, captcha);
		if (response.data.resultCode === 0) {
			dispatch(getAuthUserData());
		} else {
			if (response.data.resultCode === 10) {
				dispatch(getCaptchaUrl());
			}
			let message =
				response.data.messages.length > 0
					? response.data.messages[0]
					: "Some error";
			dispatch(stopSubmit("login", { _error: message }));
		}
	};

export const getCaptchaUrl = () => async (dispatch) => {
	let response = await securityAPI.getCaptchaUrl();
	let captchaUrl = response.data.url;
	dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch) => {
	let response = await authAPI.logout(); /* .then((response) => { */
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
	// });
};

export default authReducer;
