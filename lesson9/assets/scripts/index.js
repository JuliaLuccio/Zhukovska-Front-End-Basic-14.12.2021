import { ToggleMenu } from './toggleMenu.js';
import { ToggleCategory } from './toggleCategory.js';
import { Slider } from './showSlides.js';
import { contactFormConfig } from './formConfigs.js';
import { FormValidator } from './formValidator.js';
import { NavigationMenu } from './navigationMenu.js';

document.addEventListener('DOMContentLoaded', () => {
	const navListId = 'headerNavList';
	const portfolioNavFilterId = 'portfolioNavFilter';
	const portfolioBoxId = 'portfolioBox';
	const quoteSliderId = 'quoteSlider';
	const teamSliderId = 'teamSlider';
	const contactForm = 'contactForm';
	const teamOptions = {
		maxWidth: 500,
	};
	const headerNavOptions = {
		scrollListener: true,
		headerId: 'header',
		navSectionClass: 'navSection',
	};

	new NavigationMenu(navListId, headerNavOptions);
	new NavigationMenu(portfolioNavFilterId);
	new ToggleMenu();
	new ToggleCategory(portfolioBoxId);
	new Slider(quoteSliderId);
	new FormValidator(contactForm, contactFormConfig);
	new Slider(teamSliderId, teamOptions);
});
