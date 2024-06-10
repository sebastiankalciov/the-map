import Link from 'next/link';
import RootLayout from "@/app/layout";
import '@/app/globals.css';
import {Controller} from '@/components/Controller';
import Character from '@/components/Character';
import Hut from "@/components/Hut";
import * as PIXI from 'pixi.js';
import {createPapyrusContainer, showPapyrusContainer, hidePapyrusContainer, isVisible} from './PapyrusContainer.js';
import Utils from "@/components/Utils.js";

const CLICK_INTERACTION_DISTANCE = 200;

const PAGE_NAME = "ai-robotics";

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

export default function AIRobotics() {

    const app = new PIXI.Application();

    (async () => {

        if (typeof window == "undefined") return;

        await app.init({hello: true, backgroundAlpha: 0, resizeTo: window, resolution: window.devicePixelRatio || 1})

        const mainContainer = document.getElementById("main");

        const screenWidth = app.renderer.screen.width;
        const screenHeight = app.renderer.screen.height;

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
        const theoryObject = Hut.createObject(app, "Theory", theoryTexture, {x: 0.4 * screenWidth, y: 0.5 * screenHeight})
        const experimentObject = Hut.createObject(app, "Experiments", experimentTexture, {x: 0.1 * screenWidth, y: 0.7 * screenHeight})
        const problemsObject = Hut.createObject(app, "Problems", problemsTexture, {x: -0.4 * screenWidth, y: -0.5 * screenHeight})
        const designObject = Hut.createObject(app, "Design", designTexture, {x: -0.6 * screenWidth, y: 0.1 * screenHeight})
        const connectionsObject = Hut.createObject(app, "Connections", globeTexture, {x: 0.8 * screenWidth, y: -0.5 * screenHeight})
        const peopleObject = Hut.createObject(app, "Important people", peopleTexture, {x: 0.3 * screenWidth, y: -0.5 * screenHeight})
        const uvtRelationshipObject = Hut.createObject(app, "AI & Robotics at UVT", uvtTexture, {x: 0.8 * screenWidth, y: 0.6 * screenHeight})
        const venuesObject = Hut.createObject(app, "Venues", theoryTexture, {x: -0.5 * screenWidth, y: 0.8 * screenHeight})

		// Create a papyrus for each object (a lot of duplicated code, needs serious rework)

		const theoryPapyrusTextPageResponse = await fetch(objectPagesPathList.theory);
		const theoryPapyrusTextPageContent = await theoryPapyrusTextPageResponse.text();

		const experimentPapyrusTextPageResponse = await fetch(objectPagesPathList.experiment);
		const experimentPapyrusTextPageContent = await experimentPapyrusTextPageResponse.text();

		const problemsPapyrusTextPageResponse = await fetch(objectPagesPathList.problems);
		const problemsPapyrusTextPageContent = await problemsPapyrusTextPageResponse.text();

		const designPapyrusTextPageResponse = await fetch(objectPagesPathList.design);
		const designPapyrusTextPageContent = await designPapyrusTextPageResponse.text();

		const connectionsPapyrusTextPageResponse = await fetch(objectPagesPathList.connections);
		const connectionsPapyrusTextPageContent = await connectionsPapyrusTextPageResponse.text();

		const peoplePapyrusTextPageResponse = await fetch(objectPagesPathList.people);
		const peoplePapyrusTextPageContent = await peoplePapyrusTextPageResponse.text();

		const uvtRelationshipTextPageResponse = await fetch(objectPagesPathList.uvtRelationship);
		const uvtRelationshipTextPageContent = await uvtRelationshipTextPageResponse.text();

		const venuesTextPageResponse = await fetch(objectPagesPathList.venues);
		const venuesTextPageContent = await venuesTextPageResponse.text();

		const theoryPapyrus = createPapyrusContainer(document, theoryPapyrusTextPageContent);
		const experimentPapyrus = createPapyrusContainer(document, experimentPapyrusTextPageContent);
		const problemsPapyrus = createPapyrusContainer(document, problemsPapyrusTextPageContent);
		const designPapyrus = createPapyrusContainer(document, designPapyrusTextPageContent);
		const connectionsPapyrus = createPapyrusContainer(document, connectionsPapyrusTextPageContent);
		const peoplePapyrus = createPapyrusContainer(document, peoplePapyrusTextPageContent);
		const uvtRelationshipPapyrus = createPapyrusContainer(document, uvtRelationshipTextPageContent);
		const venuesPapyrus = createPapyrusContainer(document, venuesTextPageContent);

		const objects = [
			{sprite: theoryObject, papyrus: theoryPapyrus},
			{sprite: experimentObject, papyrus: experimentPapyrus},
			{sprite: problemsObject, papyrus: problemsPapyrus},
			{sprite: designObject, papyrus: designPapyrus},
			{sprite: connectionsObject, papyrus: connectionsPapyrus},
			{sprite: peopleObject, papyrus: peoplePapyrus},
			{sprite: uvtRelationshipObject, papyrus: uvtRelationshipPapyrus},
			{sprite: venuesObject, papyrus: venuesPapyrus},
		]

        // Create character

        const characterTexture = await PIXI.Assets.load('/assets/character/characterTexture.png');
        const character = Character.create(app, characterTexture);

        // Create books

        const keyController = new Controller();

        app.ticker.add(() => {

            if (keyController.keys.escape.pressed) {
				for (let i = 0; i < objects.length; i++) {
					if (isVisible(objects[i].papyrus)) {
						hidePapyrusContainer(objects[i].papyrus);
					}
				}
            }

			for (let i = 0; i < objects.length; i++) {
				Utils.handleObjectClick(app, objects[i].sprite, objects[i].papyrus, character, CLICK_INTERACTION_DISTANCE);

			}

            // Move the character based on key inputs
            Character.move(app, keyController, character);

        });

		for (let i = 0; i < objects.length; i++) {
			document.body.appendChild(objects[i].papyrus);
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
