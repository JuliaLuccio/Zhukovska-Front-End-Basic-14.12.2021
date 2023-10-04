import {
	isNotEmpty,
	isNotNumber,
	isEmailValid,
	lengthRange,
} from './validator.js';

export const contactFormConfig = {
	'username': [lengthRange(2, 25), isNotNumber],
	'usermail': [isNotEmpty, isEmailValid],
	'usermessage': [isNotEmpty],
};
