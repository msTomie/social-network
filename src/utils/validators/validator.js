export const required = (value) => {
	if (value) {
		return undefined;
	}
	return "Field is required";
};

export const maxLengthCreator = (maxLengh) => (value) => {
	if (value.length > maxLengh) {
		return `Max length is ${maxLengh} symbols`;
	}
	return undefined;
};
