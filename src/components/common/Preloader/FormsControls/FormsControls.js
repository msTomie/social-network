import s from "./FormsControls.module.css";

const FormControl = ({ input, meta, child, ...props }) => {
	const hasError = meta.touched && meta.error;
	return (
		<div className={s.formControl + " " + (hasError ? s.error : "")}>
			<div>
				{/* <textarea {...input} {...props} /> */}
				{props.children}
			</div>
			{hasError && <span>{meta.error}</span>}{" "}
			{/* эта штука отрисуется (СИНТАКСИС) когда выполнится И то условие И то  */}
		</div>
	);
};

export const Textarea = (props) => {
	const { input, meta, child, ...restProps } = props;
	return (
		<FormControl {...props}>
			<textarea {...input} {...restProps} />
		</FormControl>
	);
};

export const Input = (props) => {
	const { input, meta, child, ...restProps } = props;
	return (
		<FormControl {...props}>
			<input {...input} {...restProps} />
		</FormControl>
	);
};
