import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
	if (!props.profile /* == null || props.profile==undefined */) {
		return <Preloader />;
	}

	return (
		<div>
			{/* <div className={s.picture}>
				<img src="https://mobimg.b-cdn.net/v3/fetch/f4/f40635a3b32b024e707508cd72676a60.jpeg" />
			</div> */}
			<div className={s.descriptionBlock}>
				<img src={props.profile.photos.large} />
				<span>{props.profile.aboutMe} </span>
				<ProfileStatusWithHooks
					status={props.status}
					updateStatus={props.updateStatus}
				/>
			</div>
		</div>
	);
};
export default ProfileInfo;
