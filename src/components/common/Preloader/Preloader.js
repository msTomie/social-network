import preloader from "../../../assets/images/loading.gif";
import s from "./Preloader.module.css";

let Preloader = () => {
	return (
		<div>
			<img src={preloader} className={s.loader} />
		</div>
	);
};
export default Preloader;
