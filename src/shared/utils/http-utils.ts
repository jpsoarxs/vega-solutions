export const formUrlParser = (formObject: any) => {
	return Object.keys(formObject).reduce(
		(acc, field) => acc + `&${field}=${encodeURIComponent(formObject[field])}`,
		'',
	);
};
