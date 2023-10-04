import { Validator } from './validator.js';

export class FormValidator {
	constructor(formName, config) {
		this.form = document.forms[formName];
		this.config = config;
		this.init();
	}

	init() {
		this.form.addEventListener('submit', this.handleSubmit);
		this.form.addEventListener('input', this.handleInput);
	}

	handleSubmit = e => {
		e.preventDefault();

		this.clearAllErrors();

		const isValid = Validator.validate(this.form, this.config);
		const formElems = this.form.elements;

		if (!isValid) {
			const errors = Validator.getErrors(this.form.name);

			Object.entries(errors).forEach(([name, errorObject]) => {
				this.displayErrors(errorObject, formElems[name]);
			});
		}
	};

	handleInput = e => {
		const target = e.target;

		const isValid = Validator.validate(this.form, { [target.name]: this.config[target.name] });

		if (!isValid) {
			const errors = Validator.getErrors(this.form.name)?.[target.name];
			this.displayErrors(errors, target);
		} else {
			this.clearErrors(target);
		}
	};

	clearAllErrors() {
		[...this.form.elements].forEach(element => {
			if (element.type !== 'submit') {
				this.clearErrors(element);
			}
		});
	}

	clearErrors(element) {
		const errorBox = this.getErrorBox(element);
		errorBox.innerHTML = '';
		element.classList.remove('error');
	}

	getErrorBox(element) {
		return this.form.querySelector(`[data-for="${element.name}"]`);
	}

	displayErrors(error, element) {
		const fullMessage = Object.values(error)
			.map(message => `<span>${message}</span>`)
			.join('<br>');
		element.classList.add('error');

		const errorBox = this.getErrorBox(element);

		errorBox.innerHTML = fullMessage;
	}
}
