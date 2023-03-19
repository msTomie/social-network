import React from "react";
import { useState, useEffect } from "react";

const ProfileStatusWithHooks = (props) => {
	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	const activeEditMode = () => {
		setEditMode(true);
	};

	const deactiveEditMode = () => {
		setEditMode(false);
		props.updateStatus(status);
	};
	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value);
	};
	return (
		<div 
			>
			{!editMode && (
				<div>
					<span onDoubleClick={activeEditMode}>{props.status || "---"}</span>
				</div>
			)}
			{editMode && (
				<div>
					<input
						onChange={onStatusChange}
						onBlur={deactiveEditMode}
						autoFocus={true}
						value={status}
					></input>
				</div>
			)}
		</div>
	);
};

export default ProfileStatusWithHooks;
