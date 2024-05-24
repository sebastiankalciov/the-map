import Link from 'next/link';
import RootLayout from "@/app/layout";
import '@/app/globals.css';
import {Controller} from '@/components/Controller';
import Utils from '@/components/Utils';
import Character from '@/components/Character';
import Hut from '@/components/Hut';
import * as PIXI from 'pixi.js';

// Interaction distances between the character and the huts
const INTERACTION_DISTANCE = 75;
const CLICK_INTERACTION_DISTANCE = 200;

export default function Village() {

    const app = new PIXI.Application();

    (async () => {

        if (typeof window == "undefined") return;

        await app.init({hello: true, backgroundAlpha: 0, resizeTo: window, resolution: window.devicePixelRatio || 1})

        const mainContainer = document.getElementById("main");
        mainContainer.appendChild(app.canvas)

        const screenWidth = app.renderer.screen.width;
        const screenHeight = app.renderer.screen.height;

        // Create the character
        const characterTexture = await PIXI.Assets.load('/assets/character/characterTexture.png');
        const character = Character.create(app, characterTexture);

        // Create trees

        const treeTexture = await PIXI.Assets.load('/assets/background/tree.png');

        Hut.createObject(app,"" , treeTexture, {x: 0.2 * screenWidth, y: 0.3 * screenHeight});
        Hut.createObject(app,"" , treeTexture, {x: 0.7 * screenWidth, y: 0.5 * screenHeight});

        // Create huts
        const hutTexture = await PIXI.Assets.load('/assets/huts/house-texture2.png');
        await PIXI.Assets.load('/assets/fonts/OpenSans.ttf');

        let ai_robotics = Hut.createObject(app, "AI and Robotics", hutTexture,{x: -0.5 * screenWidth, y: -0.3 * screenHeight});
        let algorithms = Hut.createObject(app, "Algorithms and Data Structures", hutTexture, {x: -0.3 * screenWidth, y: -0.67 * screenHeight});

        let architecture = Hut.createObject(app, "Architecture", hutTexture, {x: 0.7 * screenWidth, y: -0.6 * screenHeight});
        let bioinformatics = Hut.createObject(app, "Bioinformatics", hutTexture, {x: 0.16 * screenWidth, y: -0.5 * screenHeight});

        let computational_science = Hut.createObject(app, "Computational Science", hutTexture, {x: 0.6 * screenWidth, y: -0.1 * screenHeight});
        let databases = Hut.createObject(app, "Databases and Information Retrieval", hutTexture, {x: 0.81 * screenWidth, y: 0.3 * screenHeight});

        let graphics = Hut.createObject(app, "Graphics", hutTexture, {x: 0.7 * screenWidth, y: 0.8 * screenHeight});
        let human_computer = Hut.createObject(app, "Human Computer Interaction", hutTexture, {x: -0.5 * screenWidth, y: 0.1 * screenHeight});

        let organizational_informatics = Hut.createObject(app, "Organizational Informatics", hutTexture, {x: -0.6 * screenWidth, y: 0.6 * screenHeight});
        let os = Hut.createObject(app, "OS and Networks", hutTexture, {x: 0.4 * screenWidth, y: 0.7 * screenHeight});

        let programming_languages = Hut.createObject(app, "Programming Languages", hutTexture, {x: -0.3 * screenWidth, y: 0.7 * screenHeight});
        let software_engineering = Hut.createObject(app, "Software Engineering", hutTexture, {x: 0 * screenWidth, y: 0.56 * screenHeight});

        const listOfHuts = [
            {sprite: ai_robotics, location: "ai-robotics"},
            {sprite: databases, location: "databases"},
            {sprite: algorithms, location: "algorithms"},
            {sprite: architecture, location: "architecture"},
            {sprite: bioinformatics, location: "bioinformatics"},
            {sprite: computational_science, location: "computational-science"},
            {sprite: graphics, location: "graphics"},
            {sprite: human_computer, location: "human_computer"},
            {sprite: organizational_informatics, location: "organizational-informatics"},
            {sprite: os, location: "os"},
            {sprite: programming_languages, location: "programming-languages"},
            {sprite: software_engineering, location: "software-engineering"},
        ]

        const keyController = new Controller();

        app.ticker.add(() => {

            // Move the character based on key inputs
            Character.move(app, keyController, character);

            // Add listeners for interaction with huts
            for (let i = 0; i < listOfHuts.length; i++) {
                Utils.handleHutInteraction(listOfHuts[i], character, INTERACTION_DISTANCE);
                Utils.handleHutClick(listOfHuts[i], character, CLICK_INTERACTION_DISTANCE);
            
            }
        });
    })();

    return (
        <RootLayout>
            <Link href = "/" id = "redirect-button">
                <button className="redirect-button top-right">Return home</button>
            </Link>
        </RootLayout>
    );
}
