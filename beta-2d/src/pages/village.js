import Head from 'next/head';
import Link from 'next/link';
import '../app/globals.css';
import {Controller} from '../components/Controller';
import {Character} from '../components/Character';
import * as PIXI from 'pixi.js';
import { useEffect } from 'react';


export default function Village() {

    const app = new PIXI.Application();

    (async () => {
        app
        .init({hello: true, backgroundAlpha: 0, resizeTo: window})
        .then(async () => {
            
            const mainContainer = document.getElementById("main");
            mainContainer.appendChild(app.canvas)

            // Create character's texture and the character itself

            const characterTexture = await PIXI.Assets.load('/assets/character3.png');
            const character = PIXI.Sprite.from(characterTexture);
    
            character.texture.source.scaleMode = "nearest";

            // Set the position of the character
            character.anchor.set(0.5);

            character.position.set(
                app.renderer.screen.width / 2,
                app.renderer.screen.height / 2
            );

            // Create the huts

            const hutTexture = await PIXI.Assets.load('/assets/hut.png');
            const hut = new PIXI.Sprite(hutTexture);

            const style = new PIXI.TextStyle({
                fontFamily: 'monospace',
                fontSize: 16,
                fill: '#ffffff'
            });

            const hutTitle = new PIXI.Text({text: "AI and Robotics", style: style});

            // Set the position of the hut and the size

            hutTitle.position.set((app.screen.width - 450) / 2, (app.screen.height - 450) / 2);
            hut.position.set((app.screen.width - 400) / 2, (app.screen.height - 400) / 2);
            hut.width = 100;
            hut.height = 100;
            
            // Check if the player has left-clicked and the user is in the proximity of the hut
            // This has to be done properly, it is just a test

            hut.interactive = true;
            hut.buttonMode = true;
            
            // Move the character

            const keyController = new Controller();
            
            app.ticker.add(() => {

                if (keyController.keys.left.pressed)
                    character.x -= 3;
                else if (keyController.keys.right.pressed)
                    character.x += 3;
                else if (keyController.keys.up.pressed)
                    character.y -= 3;
                else if (keyController.keys.down.pressed)
                    character.y += 3;

                if (distanceBetweenTwoPoints(hut, character) < 100)
                    window.location.href = '/huts/ai-robotics';


            
            });

            hut.on('pointerdown', () => {
                if (distanceBetweenTwoPoints(hut, character) < 2500)
                    window.location.href = '/huts/ai-robotics'; 
            });

            // Add the objects to the container
            app.stage.addChild(character);
            app.stage.addChild(hut);
            app.stage.addChild(hutTitle);
        });
    })();

    const createCharacter = (app) => {
        const characterTexture = PIXI.Assets.load('/assets/character3.png');
        const character = PIXI.Sprite.from(characterTexture);

        character.texture.source.scaleMode = "nearest";

        // Set the position of the character
        character.anchor.set(0.5);

        character.position.set(
            app.renderer.screen.width / 2,
            app.renderer.screen.height / 2
        );
        return character;
    }
    function distanceBetweenTwoPoints(p1, p2) {
        const a = p1.x - p2.x;
        const b = p1.y - p2.y;

        return Math.hypot(a, b);
    }

    return (

        <main className={`landing-page`} id = "main">

            <Head>
                <title>Village</title>
            </Head>
            
            <Link href = "/">
                    <button className="redirect-button top-right">Return home</button>
            </Link>
            
        </main>
    );
}
