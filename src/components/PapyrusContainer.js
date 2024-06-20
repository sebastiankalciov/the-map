/**
 * ## Create a Papyrus object
 * @param {*} document - DOM
 * @param {string} content - HTML Page
 * @returns {papyrus_container} - Returns an infinite scrollable papyrus
 */
export function createPapyrusContainer(document, content, PAGE_NAME) {

	const papyrusContainer = document.createElement('div');
	papyrusContainer.className = 'papyrus-container';
	const contentDiv = document.createElement('div');
	contentDiv.className = 'content';

	// Add the HTML page
	contentDiv.innerHTML = content

	// Make the papyrus object invisible
	papyrusContainer.style.display = 'none';

	if (PAGE_NAME === "bioinformatics") {
		const script = document.createElement('script');
		script.src = '../assets/content/bioinformatics/achievements.js';
		script.async = true;

		script.onload = () => {
			console.log('Script loaded successfuly');

		};
		script.onerror = () => {
			console.log('Error occurred while loading script');
		};

		papyrusContainer.appendChild(script);
	}
	if (PAGE_NAME === "ai-robotics") {
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
		script.async = true;

		script.onload = () => {
			console.log('Script loaded successfuly');

		};
		script.onerror = () => {
			console.log('Error occurred while loading script');
		};

		const script1 = document.createElement('script');
		script1.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
		script1.async = true;

		script1.onload = () => {
			console.log('Script loaded successfuly');

		};
		script1.onerror = () => {
			console.log('Error occurred while loading script');
		};
		papyrusContainer.appendChild(script);
		papyrusContainer.appendChild(script1);
	}
	papyrusContainer.appendChild(contentDiv);

	return papyrusContainer;
}

/**
 * ## Set a papyrus object visible
 * @param {papyrus_container} papyrusContainer
 */
export function showPapyrusContainer(papyrusContainer) {
	if (papyrusContainer) {
		papyrusContainer.style.display = 'block';

	}
}

/**
 * ## Set a papyrus object invisible
 * @param {papyrus_container} papyrusContainer
 */
export function hidePapyrusContainer(papyrusContainer) {
	if (papyrusContainer) {
		papyrusContainer.style.display = 'none';
	}
}

/**
 * ## Check the visibility of a papyrus
 * @param {papyrus_container} papyrusContainer
 * @returns {boolean} true/false
 */
export function isVisible(papyrusContainer) {
	return papyrusContainer.style.display === 'block';
}