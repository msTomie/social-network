// import { BrowserRouter, Route } from "react-router-dom";
import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
// import ProfileContainer from "./components/Profile/ProfileContainer";
// import DialogsContainer from "./components/Profile/ProfileInfo/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import { connect } from "react-redux";
// import { getAuthUserData } from "./components/redux/auth-reducer";
import { compose } from "redux";
// import { useParams } from "react-router-dom";
import { initializeApp } from "./components/redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
// import { withSuspense } from "./hoc/withSuspense";

// import DialogsContainer from "./components/Profile/ProfileInfo/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() =>
	import("./components/Profile/ProfileInfo/Dialogs/DialogsContainer")
);
// import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() =>
	import("./components/Profile/ProfileContainer")
);

class App extends Component {
	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		}

		return (
			// <BrowserRouter>
			<div className="app-wrapper">
				<HeaderContainer />
				<Navbar />
				<div className="app-wrapper-content">
					<Suspense
						fallback={
							<div>
								{" "}
								<Preloader />
							</div>
						}
					>
						<Routes>
							<Route path="/Profile/:userId?" element={<ProfileContainer />} />
							<Route path="/Dialogs" element={<DialogsContainer />} /> */
							{/* <Route
							path="/Dialogs"
							element={<Suspense	fallback={<div>	<Preloader /></div>	}>
									<DialogsContainer />
								</Suspense>
							}
						/> */}
							<Route path="/News" element={<News />} />
							<Route path="/Music" element={<Music />} />
							<Route path="/Users" element={<UsersContainer />} />
							<Route path="/Login" element={<LoginPage />} />
						</Routes>
					</Suspense>
				</div>
			</div>
			// </BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized,
});

export default compose(
	// withRouter,
	connect(mapStateToProps, { initializeApp /* getAuthUserData */ })
)(App);
