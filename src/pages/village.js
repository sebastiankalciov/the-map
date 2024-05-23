import Head from 'next/head';
import Link from 'next/link';
import RootLayout from "@/app/layout";
import '../app/globals.css';
import {Controller} from '../components/Controller';
import Utils from '../components/Utils';
import Character from '../components/Character';
import Hut from '../components/Hut';
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

        // Add the fountain of Turing

        const fountainTexture = await PIXI.Assets.load('/assets/background/fountain_of_turing.png');
        const fountainObject = PIXI.Sprite.from(fountainTexture);

        fountainObject.width = 300;
        fountainObject.height = 300;
        fountainObject.texture.source.scaleMode = "nearest";

        fountainObject.anchor.set(0.5);

        fountainObject.position.set(
            app.renderer.screen.width / 2,
            app.renderer.screen.height / 2
        );

        // Add the component to the app
        app.stage.addChild(fountainObject);

        const characterTexture = await PIXI.Assets.load('/assets/character/characterTexture.png');
        const character = Character.create(app, characterTexture);

        // Create the huts

        const hutTexture = await PIXI.Assets.load('/assets/huts/house-texture2.png');
        await PIXI.Assets.load('/assets/fonts/OpenSans.ttf');

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let ai_robotics = Hut.create(app, "AI and Robotics", hutTexture, {x: -0.5 * screenWidth, y: -0.3 * screenHeight});
        let algorithms = Hut.create(app, "Algorithms and Data Structures", hutTexture, {x: -0.3 * screenWidth, y: -0.67 * screenHeight});

        let architecture = Hut.create(app, "Architecture", hutTexture, {x: 0.7 * screenWidth, y: -0.6 * screenHeight});
        let bioinformatics = Hut.create(app, "Bioinformatics", hutTexture, {x: 0.16 * screenWidth, y: -0.5 * screenHeight});

        let computational_science = Hut.create(app, "Computational Science", hutTexture, {x: 0.6 * screenWidth, y: -0.1 * screenHeight});
        let databases = Hut.create(app, "Databases and Information Retrieval", hutTexture, {x: 0.81 * screenWidth, y: 0.3 * screenHeight});

        let graphics = Hut.create(app, "Graphics", hutTexture, {x: 0.7 * screenWidth, y: 0.8 * screenHeight});
        let human_computer = Hut.create(app, "Human Computer Interaction", hutTexture, {x: -0.5 * screenWidth, y: 0.1 * screenHeight});

        let organizational_informatics = Hut.create(app, "Organizational Informatics", hutTexture, {x: -0.6 * screenWidth, y: 0.6 * screenHeight});
        let os = Hut.create(app, "OS and Networks", hutTexture, {x: 0.4 * screenWidth, y: 0.7 * screenHeight});

        let programming_languages = Hut.create(app, "Programming Languages", hutTexture, {x: -0.3 * screenWidth, y: 0.7 * screenHeight});
        let software_engineering = Hut.create(app, "Software Engineering", hutTexture, {x: 0 * screenWidth, y: 0.56 * screenHeight});


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
