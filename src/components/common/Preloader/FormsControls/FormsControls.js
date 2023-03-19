import { Field } from "redux-form";
import s from "./FormsControls.module.css";

const FormControl = ({ input, meta: { touched, error }, children }) => {
	const hasError = touched && error;
	return (
		<div className={s.formControl + " " + (hasError ? s.error : "")}>
			<div>
				{/* <textarea {...input} {...props} /> */}
				{children}
			</div>
			{hasError && <span>{error}</span>}{" "}
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

export const createField = (
	component,
	validate,
	name,
	placeholder,
	props = {},
	text = "",

) => (
	<div>
		<Field
			component={component}
			validate={validate}
			name={name}
			placeholder={placeholder}
			{...props}
			
		/>
		{text}
	</div>
);
