import { customDateFactory } from './custom-date';

export const removeAllBlankSpaces = (value: string, by = '') =>
	value.replace(/\s/g, by);

export const removeAllBackslash = (value: string, by = '') =>
	value.replace(/\//g, by);

interface IFormatISODate {
	day?: string;
	month: string;
	year: string;
}

export const formatISODate = ({ day = '02', month, year }: IFormatISODate) => {
	if (day && month && year) {
		const formatedDay = removeAllBlankSpaces(day);
		const formatedMonth = removeAllBlankSpaces(month);
		const formatedYear = removeAllBlankSpaces(year);

		if (formatedDay && formatedMonth && formatedYear) {
			return new Date(
				`${formatedYear}-${formatedMonth}-${formatedDay}`,
			).toISOString();
		}
	}

	return null;
};

export const stringToDate = (date: string | Date) => {
	if (!date) return null;

	let str =
		(typeof date === 'string' && `${date}`) || new Date(date).toISOString();

	if (str.match(/\//g)?.length > 0) {
		let formatedDate = '';
		const strSplited = str.split('/');

		if (strSplited.length === 2) {
			const [month, year] = strSplited;
			formatedDate = formatISODate({ month, year });
		}

		if (strSplited.length === 3) {
			const [day, month, year] = strSplited;
			formatedDate = formatISODate({ day, month, year });
		}

		str = formatedDate || str;
	} else {
		if (new Date(str).toString() !== 'Invalid Date') {
			str = new Date(str).toISOString();
		}
	}

	str = removeAllBackslash(str);
	str = removeAllBlankSpaces(str);

	if (!str) return null;

	return customDateFactory(str).toDate();
};

export const repeatLetter = (value: string, repeater: string) => {
	const splited = value.split('');

	const result = splited.filter((caracter) => caracter === repeater);

	return result.length;
};

export const removeMaskPhone = (phone: string) => {
	if (!phone) return false;

	phone = removeAllBlankSpaces(phone);

	phone = phone.replace('(', '').replace(')', '').replace('-', '');

	if (phone.indexOf('/') !== -1) phone = phone.substring(0, phone.indexOf('/'));

	if (phone.indexOf(';') !== -1) phone = phone.substring(0, phone.indexOf(';'));

	if (phone.indexOf('(') !== -1) phone = phone.substring(0, phone.indexOf('('));

	if (phone.indexOf('|') !== -1) phone = phone.substring(0, phone.indexOf('|'));

	return phone;
};
