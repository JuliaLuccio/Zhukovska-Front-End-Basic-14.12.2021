export class ToggleMenu {
	shouldEnable;
	constructor(options = {}) {
		this.navClass = options.navClass || '.toggleNavigation';
		this.burgerClass = options.burgerClass || '.toggleBurger';
		this.openClass = options.openClass || 'open';
		this.overflowClass = options.overflowClass || 'overflowHidden';
		this.burgerVisibleWidth = options.burgerVisibleWidth || 720;

		this.nav = document.querySelector(this.navClass);
		this.burger = document.querySelector(this.burgerClass);

		window.addEventListener('resize', this.updateBurgerMenuState);
		this.updateBurgerMenuState();
	}

	updateBurgerMenuState = () => {
		const isBurgerActive = innerWidth <= this.burgerVisibleWidth;
		if (isBurgerActive) {
			this.setupBurgerListener();
			this.setupNavListener();
		} else {
			this.closeMenu();
			this.cleanupEventListeners();
		}
	};

	setupBurgerListener() {
		this.burger.addEventListener('click', this.toggleMenu);
	}

	setupNavListener() {
		this.nav.addEventListener('click', this.closeMenuAfterClickLink);
	}

	toggleMenu = () => {
		this.burger.classList.toggle(this.openClass);
		this.nav.classList.toggle(this.openClass);
		this.hasOpenClass();
	};

	hasOpenClass() {
		this.shouldEnable = this.burger.classList.contains(this.openClass);
		this.toggleOutsideClickListener();
		this.toggleOverflowHidden();
	}

	toggleOutsideClickListener() {
		this.shouldEnable
			? document.addEventListener('click', this.handleOutsideClick)
			: document.removeEventListener('click', this.handleOutsideClick);
	}

	toggleOverflowHidden() {
		document.body.classList.toggle(this.overflowClass, this.shouldEnable);
	}

	closeMenu() {
		this.burger.classList.remove(this.openClass);
		this.nav.classList.remove(this.openClass);
	}

	closeMenuAfterClickLink = e => {
		if (e.target.tagName !== 'A') return;
		this.toggleMenu();
	};

	handleOutsideClick = e => {
		if (!this.nav.contains(e.target) && !this.burger.contains(e.target)) {
			this.toggleMenu();
		}
	};

	cleanupEventListeners() {
		this.burger.removeEventListener('click', this.toggleMenu);
		this.nav.removeEventListener('click', this.closeMenuAfterClickLink);
		document.removeEventListener('click', this.handleOutsideClick);
	}
}
