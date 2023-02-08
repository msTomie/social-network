import dialogReducer from "./dialog-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
	_state: {
		profilePage: {
			posts: [
				{ message: "Hello", like: 5 },
				{ message: "hi, it's me", like: 10 },
				{ message: "How are you?", like: 30 },
			],
			newPostText: "",
		},

		dialogPage: {
			dialogs: [
				{ id: 1, name: "Дима" },
				{ id: 2, name: "Света" },
				{ id: 3, name: "Сергей" },
				{ id: 4, name: "Виктор" },
			],

			messages: [
				{ message: "Hi" },
				{ message: "Welcome" },
				{ message: "Yo" },
				{ message: "Yo!" },
			],

			newMessageBody: "",
		},
		sidebar: {},
	},
	_callSubscriber() {} /*сздаем эту функцию,т.к. будет цикл//циркуляция между index и state-плохо,поэтому создаем локальную функцию*/,

	getState() {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	} /* одно НО!!!эта функция так называемый перерендаринг//слушатель// 'связуюзий мостик'// связывает state и index */,

	dispatch(action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogPage = dialogReducer(this._state.dialogPage, action);
		this._state.sidebar = sidebarReducer(this._state.sidebar, action);

		this._callSubscriber(this._state);
	},
};

export default store;

// store
