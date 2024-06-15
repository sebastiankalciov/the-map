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

        await app.init({hello: true, backgroundAlpha: 0, resizeTo: window, resolution: window.devicePixelRatio || 1, autoResize: true})

        const mainContainer = document.getElementById("main");
        mainContainer.appendChild(app.canvas)

        const screenWidth = app.renderer.screen.width / app.renderer.resolution;
        const screenHeight = app.renderer.screen.height / app.renderer.resolution;

        // Create character object
        const characterTexture = await PIXI.Assets.load('/assets/character/character-texture2.png');
        const character = Character.create(app, characterTexture);

        // Create huts
        const hutTexture = await PIXI.Assets.load('/assets/huts/house-texture2.png');
        await PIXI.Assets.load('/assets/fonts/OpenSans.ttf');

		const hutsInfo = [
			{id: "ai-robotics", name: "AI and Robotics", texture: hutTexture, position: {x: -0.5 * screenWidth, y: -0.35 * screenHeight}},
			{id: "algorithms", name: "Algorithms and Data Structures", texture: hutTexture, position: {x: -0.48 * screenWidth, y: -0.78 * screenHeight}},
			{id: "architecture", name: "Architecture", texture: hutTexture, position: {x: 0.85 * screenWidth, y: -0.7 * screenHeight}},
			{id: "bioinformatics", name: "Bioinformatics", texture: hutTexture, position: {x: 0.14 * screenWidth, y: -0.65 * screenHeight}},
			{id: "computational-science", name: "Computational Science", texture: hutTexture, position: {x: 0.7 * screenWidth, y: -0.22 * screenHeight}},
			{id: "databases", name: "Databases and Information Retrieval", texture: hutTexture, position: {x: 0.85 * screenWidth, y: 0.3 * screenHeight}},
			{id: "graphics", name: "Graphics", texture: hutTexture, position: {x: 0.73 * screenWidth, y: 0.8 * screenHeight}},
			{id: "human-computer", name: "Human Computer Interaction", texture: hutTexture, position: {x: -0.60 * screenWidth, y: 0.1 * screenHeight}},
			{id: "organizational-informatics", name: "Organizational Informatics", texture: hutTexture, position: {x: -0.60 * screenWidth, y: 0.55 * screenHeight}},
			{id: "os", name: "OS and Networks", texture: hutTexture, position: {x: 0.4 * screenWidth, y: 0.7 * screenHeight}},
			{id: "programming-languages", name: "Programming Languages", texture: hutTexture, position: {x: -0.27 * screenWidth, y: 0.7 * screenHeight}},
			{id: "software-engineering", name: "Software Engineering", texture: hutTexture, position: {x: 0.06 * screenWidth, y: 0.56 * screenHeight}},
		]

		// Create hut objects
		const hutObjects = {};

		hutsInfo.forEach(object => {
			hutObjects[object.id] = Hut.createObject(app, object.name, object.texture, object.position);
		});

        let ai_robotics = hutObjects["ai-robotics"]
        let algorithms = hutObjects["algorithms"]

        let architecture = hutObjects["architecture"]
        let bioinformatics = hutObjects["bioinformatics"]

        let computational_science = hutObjects["computational-science"]
        let databases = hutObjects["databases"]

        let graphics = hutObjects["graphics"]
        let human_computer = hutObjects["human-computer"]

        let organizational_informatics = hutObjects["organizational-informatics"]
        let os = hutObjects["os"]

        let programming_languages = hutObjects["programming-languages"]
        let software_engineering = hutObjects["software-engineering"]

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
