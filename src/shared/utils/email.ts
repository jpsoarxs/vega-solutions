import { removeAllBlankSpaces, repeatLetter } from './';

export const sanitizeEmail = (email: string) => {
	if (!email) return false;
	if (email === '-') return false;

	email = email
		.replace(/"/g, '')
		.replace(' ', '')
		.replace(',', '.')
		.replace('..', '.')
		.replace('seuemailemail.com', '')
		.replace('@.', '@')
		.replace('.@', '@')
		.trim();

	email = removeAllBlankSpaces(email);

	const length = email.length;
	if (email[0] === '@') return false;
	if (email[0] === '.') email = email.substring(1, length - 1);
	if (email[length - 1] === '.') email = email.substring(0, length - 1);
	if (email[length - 1] === '@') return false;
	if (email[length - 1] === '>') email = email.substring(0, length - 1);
	if (email[length - 1] === '-') email = email.substring(0, length - 1);

	if (email.indexOf('/') !== -1) email = email.substring(0, email.indexOf('/'));

	if (email.indexOf(';') !== -1) email = email.substring(0, email.indexOf(';'));

	if (email.indexOf('(') !== -1) email = email.substring(0, email.indexOf('('));

	if (email.indexOf('|') !== -1) email = email.substring(0, email.indexOf('|'));

	if (repeatLetter(email, '@') === 0) {
		return false;
	}

	if (repeatLetter(email, '@') > 1) {
		let newEmail = '';
		const firstIndex = email.indexOf('@');
		for (let index = 0; index < email.length; index++) {
			const element = email[index];
			if (element === '@' && index !== firstIndex) {
				continue;
			}
			newEmail += element;
		}

		email = newEmail;
	}
	if (email && email.slice(email.length - 6) === '.br.br') {
		email = email.substring(0, email.length - 3);
	}

	if (
		email &&
		email.slice(email.length - 3) !== '.br' &&
		email.slice(email.length - 4) !== '.com'
	) {
		email += '.br';
	}
	return email;
};
