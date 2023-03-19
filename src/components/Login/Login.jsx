import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validator";
import {
	createField,
	Input,
} from "../common/Preloader/FormsControls/FormsControls";
import { login } from "../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import s from "../common/Preloader/FormsControls/FormsControls.module.css";

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<form onSubmit={handleSubmit}>
			{createField(Input, required, "email", "Email", {
				type: "email",
			})}
			{createField(Input, required, "password", "Password", {
				type: "password",
			})}
			{/* {createField(	Input,	null,	"rememberMe",null,	{type: "checkbox",},"remember me",
			)} */}
			{captchaUrl && <img src={captchaUrl} />}
			{captchaUrl &&
				createField(Input, [required], "captcha", "Symbols from image", {type: "error",})}

			{error && <div className={s.formSummaryError}>{error}</div>}
			<div>
				<button className={s.shineButton}>Login</button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({
	form: "login",
})(LoginForm);

const Login = (props) => {
	const onSubmit = (formData) => {
		props.login(
			formData.email,
			formData.password,
			formData.rememberMe,
			formData.captcha
		);
	};

	if (props.isAuth) {
		return <Navigate to="/Profile" />;
	}

	return (
		<div className={s.conteinerLogin}>
			<h1 className={s.textLogin}>Login</h1> 
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		captchaUrl: state.auth.captchaUrl,
		isAuth: state.auth.isAuth,
	};
};

export default connect(mapStateToProps, { login })(Login);
