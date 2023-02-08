import React from "react";
import { Field, reduxForm } from "redux-form";
import {
	maxLengthCreator,
	required,
} from "../../../utils/validators/validator";
import { Textarea } from "../../common/Preloader/FormsControls/FormsControls";
import {
	addPostActionCreator,
	updateNewPostTextActionCreator,
} from "../../redux/profile-reducer";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
	let postsElement = props.posts.map((p) => {
		return <Post message={p.message} like={p.like} />;
	});

	let newPostElement = React.createRef(); /* ссылка на textarea */

	let onAddPost = (value) => {
		props.addPost(value.newPostText);
	};

	return (
		<div className={s.postsBlock}>
			<h3>My posts</h3>
			<AddNewPostFormRedux onSubmit={onAddPost} />
			<div className={s.posts}>{postsElement}</div>
		</div>
	);
}; /* рендер */
const maxLength = maxLengthCreator(10);
const AddNewPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field
					placeholder="Post message"
					component={Textarea}
					name="newPostText"
					validate={[required, maxLength]}
				/>
			</div>
			<button>Add post</button>
		</form>
	);
}; /* форма */
const AddNewPostFormRedux = reduxForm({ form: "postsAddNewPostFormRedux" })(
	AddNewPostForm
); /* контейнер-формы */

export default MyPosts;
