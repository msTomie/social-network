import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";

const DialogItem = (props) => {
	let path = "/Dialogs/" + props.id;
	return (
		<div className={s.dialog + " " + s.active}>
			<NavLink className={s.dial} to={path}>{props.name}</NavLink>
		</div>
	);
};

export default DialogItem;
