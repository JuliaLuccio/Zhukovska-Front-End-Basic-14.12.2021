export class NavigationMenu {
	constructor(boxId, options = {}) {
		this.box = document.getElementById(boxId);
		this.elems = this.box.children;
		this.activeElem = this.elems[0];
		this.setupClickListener();
		if (options.scrollListener) {
			this.scrollPosition;
			this.headerHeight;
			this.header = document.getElementById(options.headerId);
			this.sections = document.querySelectorAll(`.${options.navSectionClass}`);
			this.setupScrollListener();
		}
	}

	setupClickListener() {
		this.box.addEventListener('click', this.highlightByClick);
	}

	setupScrollListener() {
		window.addEventListener('scroll', this.handleScroll);
	}

	highlightByClick = e => {
		if (e.target.parentElement === this.box) {
			this.removePrevActiveElem();
			this.activeElem = e.target;
			this.addCurrentActiveElem();
		}
	};

	highlightByIndex(index) {
		this.removePrevActiveElem();
		this.activeElem = this.elems[index];
		this.addCurrentActiveElem();
	}

	removePrevActiveElem() {
		this.activeElem.classList.remove('active');
	}

	addCurrentActiveElem() {
		this.activeElem.classList.add('active');
	}

	handleScroll = () => {
		this.scrollPosition = window.scrollY;
		this.headerHeight = this.header.clientHeight;

		for (const [index, section] of this.sections.entries()) {
			const borderTopWidth = Math.ceil(parseFloat(window.getComputedStyle(section).borderTopWidth)); // cuz sections have a negative margin equal to the size of the positive border
			const sectionTop = section.offsetTop + borderTopWidth - this.headerHeight;
			const sectionBottom = sectionTop + section.clientHeight;

			if (this.scrollPosition >= sectionTop && this.scrollPosition < sectionBottom) {
				this.highlightByIndex(index);
				break;
			}
		}
	};
}
