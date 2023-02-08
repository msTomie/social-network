import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
// import {
// 	sendMessageCreator,
// 	updateNewMessageBodyCreator,
// } from "../../../redux/dialog-reducer";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { AddMessageFormRedux } from "./AddMessageForm/AddMessageForm";

const Dialogs = (props) => {
	let state = props.dialogPage;

	let dialogsElement = state.dialogs.map((d) => {
		return <DialogItem name={d.name} key={d.id} id={d.id} />;
	});
	let messagesElement = state.messages.map((m) => {
		return <Message message={m.message} key={m.id} />;
	});
	let newMessageBody = state.newMessageBody;

	// let onSendMassageClick = () => {
	// 	// props.store.dispatch(sendMessageCreator());
	// 	props.sendMessageCreator();
	// };
	// let onNewMassegeChange = (event) => {
	// 	let body = event.target.value;
	// 	props.updateNewMessageBodyCreator(body);
	// 	// props.store.dispatch(updateNewMessageBodyCreator(body));
	// };

	const addNewMessage = (value) => {
		props.sendMessageCreator(value.newMessageBody);
	};

	if (!props.isAuth) {
		return <Navigate to={"/Login"} />;
	}

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>{dialogsElement}</div>
			<div className={s.messages}>{messagesElement}</div>
			<AddMessageFormRedux onSubmit={addNewMessage} />
		</div>
	);
}; /* рендер*/

export default Dialogs;
