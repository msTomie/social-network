import { Field, reduxForm } from "redux-form";
import {
	maxLengthCreator,
	required,
} from "../../../../../utils/validators/validator";
import { Textarea } from "../../../../common/Preloader/FormsControls/FormsControls";
import s from "../Dialogs.module.css";
const maxLength = maxLengthCreator(50);

const AddMessageForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div className={s.form}>
				<Field
					component={Textarea}
					name="newMessageBody"
					placeholder="Enter your massage"
					className={s.text}
					validate={[required, maxLength]}
				></Field>
			</div>
			<div>
				<button className={s.shineButton}>Add message</button>
			</div>
		</form>
	);
}; /* сама форма*/

export const AddMessageFormRedux = reduxForm({
	form: "dialogAddMessageFormRedux",
})(AddMessageForm); /* это есть мой констейнер///контейнер-формы */
