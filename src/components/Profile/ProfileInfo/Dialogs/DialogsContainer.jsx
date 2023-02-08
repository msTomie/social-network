import {
	sendMessageCreator,
	// updateNewMessageBodyCreator,
} from "../../../redux/dialog-reducer";
import Dialogs from "./Dialogs";

import { connect } from "react-redux";

import { withAuthRedirect } from "../../../../hoc/withAuthRedirect";
import { compose } from "redux";

const mapStateToProps = (state) => {
	return {
		dialogPage: state.dialogPage,
		// isAuth: state.auth.isAuth
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		// updateNewMessageBodyCreator: (body) => {
		// 	dispatch(updateNewMessageBodyCreator(body));
		// },
		sendMessageCreator: (newMessageBody) => {
			dispatch(sendMessageCreator(newMessageBody));
		},
	};
};
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);
