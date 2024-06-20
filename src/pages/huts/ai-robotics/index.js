import Link from 'next/link';
import RootLayout from "@/app/layout";
import '@/app/globals.css';
import * as PIXI from "pixi.js";
import Hut from "@/components/Hut.js";
import {createPapyrusContainer, hidePapyrusContainer, isVisible} from "@/components/PapyrusContainer.js";
import Character from "@/components/Character.js";
import {Controller} from "@/components/Controller.js";
import Utils from "@/components/Utils.js";

const PAGE_NAME = "ai-robotics";
const CLICK_INTERACTION_DISTANCE = 200;
export default function AIRobotics() {

	const objectPagesPathList = {
		theory: `/assets/content/${PAGE_NAME}/theory.html`,
		experiment: `/assets/content/${PAGE_NAME}/experiment.html`,
		whatsAI: `/assets/content/${PAGE_NAME}/whatsAI.html`,
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
		const theoryTexture = await PIXI.Assets.load('/assets/objects/newObjectsTextures/TheoryObject.png');
		const globeTexture = await PIXI.Assets.load('/assets/objects/newObjectsTextures/ConnectionsObject.png');
		const experimentTexture = await PIXI.Assets.load('/assets/objects/newObjectsTextures/ExperimentsObject.png');
		const peopleTexture = await PIXI.Assets.load('/assets/objects/newObjectsTextures/ImportantPeopleObject.png');
		const uvtTexture = await PIXI.Assets.load('/assets/objects/newObjectsTextures/UVT.png');
		const venuesTexture = await PIXI.Assets.load('/assets/objects/newObjectsTextures/VenuesObject.png');
		const problemsTexture = await PIXI.Assets.load('/assets/objects/newObjectsTextures/ProblemsObject.png');

		// Create objects
		const objectsInfo = [
			{ id: "theory", name: "Theory", texture: theoryTexture, position: { x: 0.45, y: 0.15 } },
			{ id: "whatsAI", name: "What's AI?", texture: theoryTexture, position: { x: 0.3, y: 0.7 } },
			{ id: "experiment", name: "Experiments", texture: experimentTexture, position: { x: 0.1, y: 0.5 } },
			{ id: "connections", name: "Connections", texture: globeTexture, position: { x: 0.7, y: 0.5 } },
			{ id: "people", name: "Important people", texture: peopleTexture, position: { x: 0.15, y: 0.15 } },
			{ id: "uvtRelationship", name: "AI & Robotics at UVT", texture: uvtTexture, position: { x: 0.6, y: 0.7 } },
			{ id: "venues", name: "Venues", texture: venuesTexture, position: { x: 0.8, y: 0.25 } }
		]

		const hutObjects = {};

		objectsInfo.forEach(object => {
			hutObjects[object.id] = Hut.createObject(app, object.name, object.texture, object.position);
		});

		const theoryObject = hutObjects["theory"];
		const whatsaiObject = hutObjects["whatsAI"];
		const experimentObject = hutObjects["experiment"];
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
			{sprite: whatsaiObject, papyrus: papyrusContainers['whatsAI']},
			{sprite: experimentObject, papyrus: papyrusContainers['experiment']},
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
