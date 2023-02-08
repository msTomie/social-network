import s from "./Post.module.css";

const Post = (props) => {
	return (
		<div className={s.item}>
			<img
				src="https://i.pinimg.com/originals/7f/c4/4c/7fc44ce68893ab5ab05d830fcf3dacd5.png"
				alt=""
			/>
			{props.message}
			<div>
				<span>like</span> {props.like}
			</div>
		</div>
	);
};
export default Post;
