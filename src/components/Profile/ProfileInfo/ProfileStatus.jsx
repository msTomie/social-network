import React from "react";
import s from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
	// statusInputRef= React.createRef()
	state = {
		editMode: false,
		status: this.props.status,
	};
	activeEditMode = () => {
		this.setState({ editMode: true });
		// this.state.editMode = true;
		// this.forceUpdate()   --костыль,принудительно заставляет реакт перериросываться; реагировать
	};
	deactiveEditMode = () => {
		this.setState({ editMode: false });
		this.props.updateStatus(this.state.status);
	};
	onStatusChange = (e) => {
		this.setState({
			status: e.currentTarget.value,
		});
	};

	componentDidUpdate(prevProps) {
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status,
			});
		}
	}

	render() {
		return (
			<div>
				{!this.state.editMode && (
					<div>
						<span onDoubleClick={this.activeEditMode /* .bind(this) */}>
							{this.props.status}
						</span>
					</div>
				)}

				{this.state.editMode && (
					<div>
						<input
							onChange={this.onStatusChange}
							autoFocus={true}
							onBlur={this.deactiveEditMode /* .bind(this) */}
							value={this.state.status}
						></input>
					</div>
				)}
			</div>
		);
	}
}
export default ProfileStatus;
