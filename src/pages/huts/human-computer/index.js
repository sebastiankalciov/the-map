import Link from 'next/link';
import RootLayout from "@/app/layout";
import '@/app/globals.css';
import * as PIXI from "pixi.js";
import Hut from "@/components/Hut.js";
import {createPapyrusContainer, hidePapyrusContainer, isVisible} from "@/components/PapyrusContainer.js";
import Character from "@/components/Character.js";
import {Controller} from "@/components/Controller.js";
import Utils from "@/components/Utils.js";

const PAGE_NAME = "human-computer";
const CLICK_INTERACTION_DISTANCE = 200;
export default function AIRobotics() {

	const objectPagesPathList = {
		theory: `/assets/content/${PAGE_NAME}/theory.html`,
		experiment: `/assets/content/${PAGE_NAME}/experiment.html`,
		problems: `/assets/content/${PAGE_NAME}/problems.html`,
		design: `/assets/content/${PAGE_NAME}/design.html`,
		connections: `/assets/content/${PAGE_NAME}/connections.html`,
		people: `/assets/content/${PAGE_NAME}/people.html`,
		uvtRelationship: `/assets/content/${PAGE_NAME}/uvtRelationship.html`,
		venues: `/assets/content/${PAGE_NAME}/venues.html`
	}

	const app = new PIXI.Application();

	(async () => {

		if (typeof window == "undefined") return;

		await app.init({backgroundAlpha: 0, resizeTo: window, resolution: window.devicePixelRatio || 1})

		const mainContainer = document.getElementById("main");

		// Load textures for each object
		await PIXI.Assets.load('/assets/fonts/OpenSans.ttf');
		const theoryTexture = await PIXI.Assets.load('/assets/objects/desk.png');
		const designTexture = await PIXI.Assets.load('/assets/objects/library.png');
		const globeTexture = await PIXI.Assets.load('/assets/objects/globe.png');
		const experimentTexture = await PIXI.Assets.load('/assets/objects/experiment.png');
		const peopleTexture = await PIXI.Assets.load('/assets/objects/people.png');
		const uvtTexture = await PIXI.Assets.load('/assets/objects/UVT-logo.png');
		const problemsTexture = await PIXI.Assets.load('/assets/objects/problems.png');

		// Create objects
		const objectsInfo = [
			{ id: "theory", name: "Theory", texture: theoryTexture, position: { x: 0.4, y: 0.2 } },
			{ id: "experiment", name: "Experiments", texture: experimentTexture, position: { x: 0.1, y: 0.5 } },
			{ id: "problems", name: "Problems", texture: problemsTexture, position: { x: 0.3, y: 0.7 } },
			{ id: "design", name: "Design", texture: designTexture, position: { x: 0.6, y: 0.1 } },
			{ id: "connections", name: "Connections", texture: globeTexture, position: { x: 0.7, y: 0.5 } },
			{ id: "people", name: "Important people", texture: peopleTexture, position: { x: 0.15, y: 0.1 } },
			{ id: "uvtRelationship", name: "Human Computer Interaction at UVT", texture: uvtTexture, position: { x: 0.6, y: 0.7 } },
			{ id: "venues", name: "Venues", texture: theoryTexture, position: { x: 0.8, y: 0.25 } }
		]

		const hutObjects = {};

		objectsInfo.forEach(object => {
			hutObjects[object.id] = Hut.createObject(app, object.name, object.texture, object.position);
		});

		const theoryObject = hutObjects["theory"];
		const experimentObject = hutObjects["experiment"];
		const problemsObject = hutObjects["problems"];
		const designObject = hutObjects["design"];
		const connectionsObject = hutObjects["connections"];
		const peopleObject = hutObjects["people"];
		const uvtRelationshipObject = hutObjects["uvtRelationship"];
		const venuesObject = hutObjects["venues"];

		// Create papyrus objects
		const papyrusContainers = {};

		for (const [key, value] of Object.entries(objectPagesPathList)) {
			const response = await fetch(value);
			const content = await response.text();
			papyrusContainers[key] = createPapyrusContainer(document, content, PAGE_NAME);

		}

		const listOfObjects = [
			{sprite: theoryObject, papyrus: papyrusContainers['theory']},
			{sprite: experimentObject, papyrus: papyrusContainers['experiment']},
			{sprite: problemsObject, papyrus: papyrusContainers['problems']},
			{sprite: designObject, papyrus: papyrusContainers['design']},
			{sprite: connectionsObject, papyrus: papyrusContainers['connections']},
			{sprite: peopleObject, papyrus: papyrusContainers['people']},
			{sprite: uvtRelationshipObject, papyrus: papyrusContainers['uvtRelationship']},
			{sprite: venuesObject, papyrus: papyrusContainers['venues']},
		]

		// Create character object
		const characterTexture = await PIXI.Assets.load('/assets/character/character-texture2.png');
		const character = Character.create(app, characterTexture);

		const keyController = new Controller();

		app.ticker.add(() => {

			// Add listener for exiting a papyrus
			if (keyController.keys.escape.pressed) {
				for (let i = 0; i < listOfObjects.length; i++) {
					if (isVisible(listOfObjects[i].papyrus)) {
						hidePapyrusContainer(listOfObjects[i].papyrus);
					}
				}
			}

			// Add listener for objects
			for (let i = 0; i < listOfObjects.length; i++) {
				Utils.handleObjectClick(app, listOfObjects[i].sprite, listOfObjects[i].papyrus, character, CLICK_INTERACTION_DISTANCE);

			}

			// Move the character based on key inputs
			Character.move(app, keyController, character);

		});

		for (let i = 0; i < listOfObjects.length; i++) {
			document.body.appendChild(listOfObjects[i].papyrus);
		}

		mainContainer.appendChild(app.canvas)

	})();

    return (
        <RootLayout style = "domain-page">
            <Link href = "/village" id = "redirect-button">
                <button className="redirect-button-hut top-right">Return to Village</button>
            </Link>
        </RootLayout>
    );
}
