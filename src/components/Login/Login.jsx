import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validator";
import { Input } from "../common/Preloader/FormsControls/FormsControls";
import { login } from "../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import s from "../common/Preloader/FormsControls/FormsControls.module.css";

const LoginForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field
					component={Input}
					validate={required}
					name={"email"}
					placeholder={"Email"}
				/>
			</div>
			<div>
				<Field
					component={Input}
					validate={required}
					name={"password"}
					placeholder={"Password"}
					type={"password"}
				/>
			</div>
			<div>
				<Field component={Input} name={"rememberMe"} type={"checkbox"} />{" "}
				remember me
			</div>
			{props.error && <div className={s.formSummaryError}>{props.error}</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({
	form: "login",
})(LoginForm);

const Login = (props) => {
	const onSubmit = (formData) => {
		props.login(formData.email, formData.password, formData.rememberMe);
	};

	if (props.isAuth) {
		return <Navigate to="/Profile" />;
	}

	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return { isAuth: state.auth.isAuth };
};

export default connect(mapStateToProps, { login })(Login);
