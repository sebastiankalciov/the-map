// PapyrusContainer.js

export function createPapyrusContainer(document, content) {

	const papyrusContainer = document.createElement('div');
	papyrusContainer.className = 'papyrus-container';

	const contentDiv = document.createElement('div');
	contentDiv.className = 'content';

	contentDiv.innerHTML = content

	const style = document.createElement('style');

	style.textContent = `
		.papyrus-container {
			width: 50%;
			height: 100vh;
			overflow-y: scroll;
			background-image: url("/assets/objects/papyrusTexture.png");
			background-repeat: repeat;
			padding: -20px;
            box-sizing: border-box;
            position: fixed;
            right: 50vh;
            top: 1vh;
		}
		.papyrus-container::-webkit-scrollbar { 
            display: none;
        }
		.content {
			color: black;
			padding: 10px;
			border-radius: 10px;
		}
	`;

	document.head.appendChild(style);
	papyrusContainer.style.display = 'none';
	papyrusContainer.appendChild(contentDiv);

	return papyrusContainer;
}

export function showPapyrusContainer(papyrusContainer) {
	if (papyrusContainer) {
		papyrusContainer.style.display = 'block';
	}
}

export function hidePapyrusContainer(papyrusContainer) {
	if (papyrusContainer) {
		papyrusContainer.style.display = 'none';
	}
}

export function isVisible(papyrusContainer) {
	if (papyrusContainer.style.display == 'block') {
		return true;
	}
	return false;
}