import store from "./components/redux/redux-store";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import StoreContext, { Provider } from "./StoreContext";
// import { addPost, updateNewPostText } from "./components/redux/state";

const root = ReactDOM.createRoot(document.getElementById("root"));
let rerenderEntireTree = () => {
	root.render(
		<BrowserRouter>
			<React.StrictMode>
				<Provider store={store}>
					<App />
				</Provider>
			</React.StrictMode>
		</BrowserRouter>
	);
};

rerenderEntireTree(
	store.getState()
); /* вызвали стрелочную функцию rerenderEntireTree */

store.subscribe(() => {
	let state = store.getState();
	rerenderEntireTree(state);
});
