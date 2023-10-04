export class ToggleCategory {
	constructor(boxId, options = {}) {
		this.box = document.getElementById(boxId);
		this.navClass = options.navBtnsClass || '.categoryNav';
		this.elemsClass = options.elemsClass || '.listElems';
		this.showClass = options.showClass || 'show';

		this.buttons = [...this.box.querySelector(this.navClass).children];
		this.elems = [...this.box.querySelector(this.elemsClass).children];

		this.setupButtonsListener();
		this.showAllCategories();
	}

	setupButtonsListener() {
		this.buttons.forEach(btn => btn.addEventListener('click', () => this.handleFilterClick(btn)));
	}

	handleFilterClick(btn) {
		const filter = btn.dataset.filter;
		this.filterCategories(filter);
	}

	filterCategories(filter) {
		this.elems.forEach(el => {
			const category = el.dataset.category;
			const shouldShow = filter === 'all' || filter === category;
			el.classList.toggle(this.showClass, shouldShow);
		});
	}

	showAllCategories() {
		this.elems.forEach(el => el.classList.add(this.showClass));
	}
}
