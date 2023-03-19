import { reduxForm } from "redux-form";
import {
	createField,
	Input,
	Textarea,
} from "../../common/Preloader/FormsControls/FormsControls";
import s from "./ProfileInfo.module.css";
import st from "../../common/Preloader/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
	return (
		<form className={s.form} onSubmit={handleSubmit}>
			{/* <div>
				<button className={s.shineButton}>Save</button>
			</div> */}
			{error && <div className={st.formSummaryError}>{error}</div>}
			<div>
				<b>Full name</b>:{createField(Input, [], "fullName", "Full name")}
			</div>
			<div>
				<b>Looking for a job</b>:
				{createField(Input, [], "lookingForAJob", "", { type: "checkbox" })}
			</div>
			<div>
				<b>My professional skills</b>:
				{createField(
					Textarea,
					[],
					"lookingForAJobDescription",
					"My professional skills"
				)}
			</div>
			<div>
				<b>About me</b>:{createField(Textarea, [], "aboutMe", "About me")}
			</div>
			<div>
				<b>Contacts</b>:{" "}
				{Object.keys(profile.contacts).map((key) => {
					return (
						<div key={key} className={s.contact}>
							<b>
								{key}:{createField(Textarea, [], "contacts." + key, key)}
							</b>
						</div>
					);

					// <Contact
					// 	key={key}
					// 	contactTitle={key}
					// 	contactValue={profile.contacts[key]}
					// />
				})}
			</div>
			<div>
				<button className={s.shineButton}>Save</button>
			</div>
		</form>
	);
};
/* const ProfileDataFormReduxForm = reduxForm({
	form: "edit-profile",
})(ProfileDataForm); */
const ProfileDataFormReduxForm = reduxForm({
	form: "edit-profile",
	enableReinitialize: true,
	destroyOnUnmount: false,
})(ProfileDataForm);
export default ProfileDataFormReduxForm;
