// let NEW_MASSAGE_BODY = "NEW-MASSAGE-BODY";
let SEND_MASSAGE = "SEND-MASSAGE";

let initialState = {
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

	// newMessageBody: "",
};

const dialogReducer = (state = initialState, action) => {
	switch (action.type) {
		// case NEW_MASSAGE_BODY:
		// 	return {
		// 		...state,
		// 		newMessageBody: action.body,
		// 	};  

		case SEND_MASSAGE:
			let body = action.newMessageBody;
			return {
				...state,
				// newMessageBody: "" /* ЗАНУЛЕНИЕ */,
				messages: [...state.messages, { id: 6, message: body }],
			};

		default:
			return state;
	}
};

export const sendMessageCreator = (newMessageBody) => ({
	type: SEND_MASSAGE,
	newMessageBody,
});
// export const updateNewMessageBodyCreator = (body) => ({
// 	type: NEW_MASSAGE_BODY,
// 	body: body,
// });

export default dialogReducer;
