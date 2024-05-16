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

        await app.init({hello: true, backgroundAlpha: 0, resizeTo: window})
        

        const mainContainer = document.getElementById("main");

        mainContainer.appendChild(app.canvas)

        // Create character's texture and the character itself

        const characterTexture = await PIXI.Assets.load('/assets/character5.png');

        const character = Character.create(app, characterTexture);

        // Create the huts

        const hutTexture = await PIXI.Assets.load('/assets/hut.png');

        let ai_robotics = Hut.create(app, "AI and Robotics", hutTexture, {x: 400, y: 400});
        let databases = Hut.create(app, "Databases", hutTexture, {x: -300, y: 200});
        let algorithms = Hut.create(app, "Algorithms", hutTexture, {x: 440, y: -200});

        const listOfHuts = [
            {sprite: ai_robotics, location: "ai-robotics"},
            {sprite: databases, location: "databases"},
            {sprite: algorithms, location: "algorithms"}
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
                <link rel = "icon" href = "/assets/character3.png"/>
                <title>Village</title>
            </Head>
            
            <Link href = "/">
                    <button className="redirect-button top-right">Return home</button>
            </Link>
            
        </main>
    );
}
