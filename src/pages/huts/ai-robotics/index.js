import Link from 'next/link';
import RootLayout from "@/app/layout";
import '@/app/globals.css';
import {Controller} from '@/components/Controller';
import Character from '@/components/Character';
import Hut from "@/components/Hut";
import * as PIXI from 'pixi.js';
import Utils from "@/components/Utils";

const CLICK_INTERACTION_DISTANCE = 200;
export default function AIRobotics() {

    const app = new PIXI.Application();

    (async () => {

        if (typeof window == "undefined") return;

        await app.init({hello: true, backgroundAlpha: 0, resizeTo: window, resolution: window.devicePixelRatio || 1})

        const mainContainer = document.getElementById("main");
        mainContainer.appendChild(app.canvas)

        // Create objects
        const screenWidth = app.renderer.screen.width;
        const screenHeight = app.renderer.screen.height;

        await PIXI.Assets.load('/assets/fonts/OpenSans.ttf');

        const theoryTexture = await PIXI.Assets.load('/assets/objects/desk.png');
        const designTexture = await PIXI.Assets.load('/assets/objects/library.png');
        const globeTexture = await PIXI.Assets.load('/assets/objects/globe.png');
        const experimentTexture = await PIXI.Assets.load('/assets/objects/experiment.png');
        const peopleTexture = await PIXI.Assets.load('/assets/objects/people.png');
        const uvtTexture = await PIXI.Assets.load('/assets/objects/UVT-logo.png');
        const problemsTexture = await PIXI.Assets.load('/assets/objects/problems.png');

        const theoryObject = Hut.createObject(app, "Theory", theoryTexture, {x: 0.4 * screenWidth, y: 0.5 * screenHeight})
        const experimentObject = Hut.createObject(app, "Experiments", experimentTexture, {x: 0.1 * screenWidth, y: 0.7 * screenHeight})
        const problemsObject = Hut.createObject(app, "Problems", problemsTexture, {x: -0.4 * screenWidth, y: -0.5 * screenHeight})
        const designObject = Hut.createObject(app, "Design", designTexture, {x: -0.6 * screenWidth, y: 0.1 * screenHeight})
        const connectionsObject = Hut.createObject(app, "Connections", globeTexture, {x: 0.8 * screenWidth, y: -0.5 * screenHeight})
        const peopleObject = Hut.createObject(app, "Important people", peopleTexture, {x: 0.3 * screenWidth, y: -0.5 * screenHeight})
        const uvtRelationshipObject = Hut.createObject(app, "AI & Robotics at UVT", uvtTexture, {x: 0.8 * screenWidth, y: 0.6 * screenHeight})
        const venuesObject = Hut.createObject(app, "Venues", theoryTexture, {x: -0.5 * screenWidth, y: 0.8 * screenHeight})

        // Create character
        const characterTexture = await PIXI.Assets.load('/assets/character/characterTexture.png');
        const character = Character.create(app, characterTexture);

        // Create books
        const bookTexture = await PIXI.Assets.load('/assets/objects/book.png');

        let textLeftPart = ""
        let textRightPart = ""
        let bookTheory= Hut.createBook(app, {left: textLeftPart, right: textRightPart}, bookTexture, {x: 0.6 * screenWidth, y: 0.8 * screenHeight})

        const listOfObjects = [
            {sprite: theoryObject, bookTheory}
        ]
        const keyController = new Controller();

        app.ticker.add(() => {

            if (keyController.keys.escape.pressed) {
                // TO-DO: Book.setInvisible(book)
                bookTheory.visible = false;
            }

            // Move the character based on key inputs
            Character.move(app, keyController, character);
            Utils.handleObjectClick(app, theoryObject, bookTheory, character, CLICK_INTERACTION_DISTANCE);
        });
    })();

    return (
        <RootLayout style = "domain-page">
            <Link href = "/village" id = "redirect-button">
                <button className="redirect-button-hut top-right">Return to Village</button>
            </Link>
        </RootLayout>
    );
}
