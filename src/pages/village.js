import Head from 'next/head';
import Link from 'next/link';
import '../app/globals.css';
import {Controller} from '../components/Controller';
import Character from '../components/Character';
import Hut from '../components/Hut';
import * as PIXI from 'pixi.js';

// Interaction distances between the character and the huts

const INTERACTION_DISTANCE = 100;
const CLICK_INTERACTION_DISTANCE = 200;

export default function Village() {

    const app = new PIXI.Application();
    (async () => {


        // Play ambiental music

        if (typeof Audio !== "undefined") {
            const audio = new Audio("/assets/ambient_sound.ogg");
            audio.play()
        }

        if (typeof window == "undefined") return;

        await app.init({hello: true, backgroundAlpha: 0, resizeTo: window, resolution: window.devicePixelRatio || 1})
        
        const mainContainer = document.getElementById("main");
        mainContainer.appendChild(app.canvas)

        // Create the UVT Circle
        const uvtTexture = await PIXI.Assets.load('/assets/uvt_circle1.png');
        const uvtCircle = PIXI.Sprite.from(uvtTexture);

        uvtCircle.width = 200;
        uvtCircle.height = 200;
        uvtCircle.texture.source.scaleMode = "nearest";

        uvtCircle.anchor.set(0.5);

        uvtCircle.position.set(
            app.renderer.screen.width / 2,
            app.renderer.screen.height / 2
        );

        // Add the component to the app
        app.stage.addChild(uvtCircle);

        const characterTexture = await PIXI.Assets.load('/assets/character-someone21.png');
        const character = Character.create(app, characterTexture);

        // Create the huts

        const hutTexture = await PIXI.Assets.load('/assets/house-texture2.png');
        await PIXI.Assets.load('/assets/Pixellari.ttf');

        const screenWidth = app.screen.width;
        const screenHeight = app.screen.height;

        let ai_robotics = Hut.create(app, "AI and Robotics", hutTexture, {x: -0.5 * screenWidth, y: -0.1 * screenHeight});
        let algorithms = Hut.create(app, "Algorithms and Data Structures", hutTexture, {x: -0.5 * screenWidth, y: -0.7 * screenHeight});

        let architecture = Hut.create(app, "Architecture", hutTexture, {x: 0.7 * screenWidth, y: -0.6 * screenHeight});
        let bioinformatics = Hut.create(app, "Bioinformatics", hutTexture, {x: 0.46 * screenWidth, y: -0.3 * screenHeight});

        let computational_science = Hut.create(app, "Computational Science", hutTexture, {x: 0.78 * screenWidth, y: -0.1 * screenHeight});
        let databases = Hut.create(app, "Databases and Information Retrieval", hutTexture, {x: 0.81 * screenWidth, y: 0.3 * screenHeight});

        let graphics = Hut.create(app, "Graphics", hutTexture, {x: 0.7 * screenWidth, y: 0.7 * screenHeight});
        let human_computer = Hut.create(app, "Human Computer Interaction", hutTexture, {x: 0.3 * screenWidth, y: 0.4 * screenHeight});

        let organizational_informatics = Hut.create(app, "Organizational Informatics", hutTexture, {x: -0.6 * screenWidth, y: 0.6 * screenHeight});
        let os = Hut.create(app, "OS and Networks", hutTexture, {x: 0.4 * screenWidth, y: 0.7 * screenHeight});

        let programming_languages = Hut.create(app, "Programming Languages", hutTexture, {x: -0.3 * screenWidth, y: 0.7 * screenHeight});
        let software_engineering = Hut.create(app, "Software Engineering", hutTexture, {x: 0 * screenWidth, y: 0.7 * screenHeight});


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
                handleHutInteraction(listOfHuts[i], character);
                handleHutClickListener(listOfHuts[i], character);
            
            }
        });
    })();

    let lastInteractionTime = 0;

    const handleHutClickListener = (hut, character) => {

        const currentTime = Date.now(); 

        if (currentTime - lastInteractionTime < 1000) {
            return;
        }

        hut.sprite.on('pointerdown', () => {
            if (distanceBetweenTwoPoints(hut.sprite, character) < CLICK_INTERACTION_DISTANCE) {
                window.location.href = `huts/${hut.location}`;
                lastInteractionTime = currentTime;
                return;
            }
        });
    };

    const handleHutInteraction = (hut, character) => {

        const currentTime = Date.now(); 

        if (currentTime - lastInteractionTime < 1000) {
            return;
        }
        
        if (distanceBetweenTwoPoints(hut.sprite, character) < INTERACTION_DISTANCE) {
            window.location.href = `huts/${hut.location}`;
            lastInteractionTime = currentTime;
            return;
        };
    };

    function distanceBetweenTwoPoints (p1, p2) {

        const a = p1.x - p2.x;
        const b = p1.y - p2.y;

        return Math.hypot(a, b);
    };

    return (

        <main className={`landing-page`} id = "main">

            <Head>
                <link rel = "icon" href = "/assets/icon.png"/>
                <title>Village</title>
            </Head>
            
            <Link href = "/">
                    <button className="redirect-button top-right">Return home</button>
            </Link>
            
        </main>
    );
}
