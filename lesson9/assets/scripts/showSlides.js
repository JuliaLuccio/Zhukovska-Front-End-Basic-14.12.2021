export class Slider {
	startIndex = 1;
	isInitSlider = false;

	constructor(boxId, options = {}) {
		this.index = 1;
		this.box = document.getElementById(boxId);
		this.slides = this.box.querySelectorAll('.slide');
		this.prevBtn = this.box.querySelector('.prevBtn');
		this.nextBtn = this.box.querySelector('.nextBtn');
		this.numOfSlides = this.slides.length;
		this.maxWidth = options.maxWidth;
		this.minWidth = options.minWidth;

		this.isSliderActive();

		if (this.maxWidth || this.minWidth) window.addEventListener('resize', this.isSliderActive);
	}

	checkWindowWidth() {
		if (this.maxWidth && this.minWidth) {
			return innerWidth <= this.maxWidth && innerWidth >= this.minWidth;
		} else if (this.maxWidth) {
			return innerWidth <= this.maxWidth;
		} else if (this.minWidth) {
			return innerWidth >= this.minWidth;
		} else {
			return true;
		}
	}

	isSliderActive = () => {
		this.checkWindowWidth() ? this.initSlider() : this.destroySlider();
	}

	initSlider() {
		if (this.isInitSlider) return;

		this.setupBtnsListener();
		this.updateSlideVisibility();
		this.isInitSlider = true;
	}

	destroySlider() {
		if (!this.isInitSlider) return;

		this.removeBtnsListener();
		this.removeSlider();
		this.isInitSlider = false;
	}

	setupBtnsListener() {
		this.prevBtn.addEventListener('click', this.directionLeft);
		this.nextBtn.addEventListener('click', this.directionRight);
	}

	removeBtnsListener() {
		this.prevBtn.removeEventListener('click', this.directionLeft);
		this.nextBtn.removeEventListener('click', this.directionRight);
	}

	updateSlideVisibility() {
		this.slides.forEach(slide => slide.classList.add('hide'));
		this.slides[this.index - 1].classList.remove('hide');
	}

	removeSlider() {
		this.slides.forEach(slide => slide.classList.remove('hide'));
	}

	changeSlide(direction) {
		this.index += direction;

		if (this.index > this.numOfSlides) this.index = this.startIndex;
		if (this.index < this.startIndex) this.index = this.numOfSlides;

		this.updateSlideVisibility();
	}

	directionRight = () => this.changeSlide(1);

	directionLeft = () => this.changeSlide(-1);
}
