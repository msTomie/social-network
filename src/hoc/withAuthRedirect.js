import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const mapStateToPropsForRedirect = (state) => {
	return {
		// dialogPage: state.dialogPage,
		isAuth: state.auth.isAuth,
	};
};

export const withAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render() {
			if (!this.props.isAuth) {
				return <Navigate to={"/Login"} />;
			}
			return <Component {...this.props} />;
		}
	}
	// return RedirectComponent;

	let ConnectRedirectComponent = connect(mapStateToPropsForRedirect)(
		RedirectComponent
	);
	return ConnectRedirectComponent;
};



// let AuthRedirectComponent = (props) => {
// 	if (!this.props.isAuth) {
// 		return <Navigate to={"/Login"} />;
// 	}
// 	return <Dialogs {...props} />;
// };
