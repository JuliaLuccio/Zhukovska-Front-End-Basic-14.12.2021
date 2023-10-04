import ValidationError from './validationError.js';

export const Validator = {
	errors: {},

	validators: {
		isNotEmpty: {
			validate: (value) => value !== '',
			message: "The field can't be a blank",
			errorType: 'required',
		},
		isNotNumber: {
			validate: (value) => !/\d/.test(value),
			message: 'The field should not contain numbers',
			errorType: 'NaN',
		},
		isEmailValid: {
			validate: (value) => {
				const regExpTypeEmail =
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return regExpTypeEmail.test(value);
			},
			message: 'Check the correct writing of mail',
			errorType: 'mail',
		},
		lengthRange(minLength, maxLength) {
			return {
				validate: (value) => value.length >= minLength && value.length <= maxLength,
				message: `The field must be between ${minLength} and ${maxLength} characters`,
				errorType: 'lengthRange',
			};
		},
		minLength(length) {
			return {
				validate: (value) => value.length >= length,
				message: `The field must contain at least ${length} characters`,
				errorType: 'minLength',
			};
		},
	},

	validate(form, config) {
		if (!(form instanceof HTMLFormElement)) {
			throw new ValidationError('You should provide HTML form');
		}

		const elements = form.elements;
		this.errors[form.name] = {};

		for (const [inputName, inputValidators] of Object.entries(config)) {
			if (!inputValidators.length) {
				continue;
			}

			if (!elements[inputName]) {
				throw new ValidationError(`The "${inputName}" field doesn't exist in the "${form.name}"`);
			}

			const value = elements[inputName].value.trim();
			const errors = this.errors[form.name];

			inputValidators.forEach(({ validate, message, errorType }) => {
				if (!validate(value, elements)) {
					errors[inputName] = {
						...errors[inputName],
						[errorType]: message,
					};
				}
			});
		}

		return !this._hasError(form.name);
	},

	getErrors(formName) {
		return this.errors[formName];
	},

	_hasError(formName) {
		return !!Object.keys(this.errors[formName]).length;
	},
};

export const {
	isNotEmpty,
	isNotNumber,
	isEmailValid,
	lengthRange,
} = Validator.validators;
