import Link from 'next/link';
import RootLayout from "@/app/layout";
import '@/app/globals.css';
import {Controller} from '@/components/Controller';
import Character from '@/components/Character';
import Hut from "@/components/Hut";
import * as PIXI from 'pixi.js';

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

        const deskTexture = await PIXI.Assets.load('/assets/objects/desk.png');

        const theoryObject = Hut.createObject(app, "Activities", deskTexture, {x: 0.4 * screenWidth, y: 0.5 * screenHeight})
        const experimentObject = Hut.createObject(app, "Experiments", deskTexture, {x: 0.1 * screenWidth, y: 0.7 * screenHeight})
        const problemsObject = Hut.createObject(app, "Problems", deskTexture, {x: -0.4 * screenWidth, y: -0.5 * screenHeight})
        const designObject = Hut.createObject(app, "Design", deskTexture, {x: -0.6 * screenWidth, y: 0.5 * screenHeight})
        const connectionsObject = Hut.createObject(app, "Connections", deskTexture, {x: 0.8 * screenWidth, y: -0.5 * screenHeight})
        const peopleObject = Hut.createObject(app, "Important people", deskTexture, {x: 0.3 * screenWidth, y: -0.5 * screenHeight})
        const uvtRelationshipObject = Hut.createObject(app, "AI & Robotics at UVT", deskTexture, {x: 0.6 * screenWidth, y: 0.6 * screenHeight})
        const venuesObject = Hut.createObject(app, "Venues", deskTexture, {x: 0.4 * screenWidth, y: 0.5 * screenHeight})


        // Create character

        const characterTexture = await PIXI.Assets.load('/assets/character/characterTexture.png');
        const character = Character.create(app, characterTexture);

        const keyController = new Controller();

        app.ticker.add(() => {

            // Move the character based on key inputs
            Character.move(app, keyController, character);

        });
    })();

    return (
        <RootLayout style = "domain-page">
            <Link href = "/village" id = "redirect-button">
                <button className="redirect-button top-right">Return to Village</button>
            </Link>
        </RootLayout>
    );
}
