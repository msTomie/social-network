// import { BrowserRouter, Route } from "react-router-dom";
import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Profile/ProfileInfo/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import { connect } from "react-redux";
// import { getAuthUserData } from "./components/redux/auth-reducer";
import { compose } from "redux";
// import { useParams } from "react-router-dom";
import { initializeApp } from "./components/redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

/* function withRouter(Children) {
	return (props) => {
		const match = { params: useParams() };
		return <Children {...props} match={match} />;
	};
} */
class App extends Component {
	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		}

		return (
			<BrowserRouter>
				<div className="app-wrapper">
					<HeaderContainer />
					<Navbar />
					<div className="app-wrapper-content">
						<Routes>
							<Route path="/Profile/:userId?" element={<ProfileContainer />} />
							<Route path="/Dialogs" element={<DialogsContainer />} />
							<Route path="/News" element={<News />} />
							<Route path="/Music" element={<Music />} />
							<Route path="/Users" element={<UsersContainer />} />
							<Route path="/Login" element={<LoginPage />} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
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
