import Head from 'next/head';
import Link from 'next/link';
import '../app/globals.css';
import {Controller} from '../components/Controller';
import * as PIXI from 'pixi.js';

// Interaction distance between the character and the huts

const INTERACTION_DISTANCE = 100;
const CLICK_INTERACTION_DISTANCE = 300;

export default function Village() {

    const app = new PIXI.Application();

    (async () => {

        await app.init({hello: true, backgroundAlpha: 0, resizeTo: window})
        

        const mainContainer = document.getElementById("main");
        mainContainer.appendChild(app.canvas)

        // Create character's texture and the character itself

        const characterTexture = await PIXI.Assets.load('/assets/character3.png');
        const character = createCharacter(app, characterTexture);

        // Create the huts

        const hutTexture = await PIXI.Assets.load('/assets/hut.png');

        let hut = createHut(app, "AI and Robotics", hutTexture, {x: 400, y: 400});

        // Move the character

        const keyController = new Controller();
        
        app.ticker.add(() => {

            moveCharacter(keyController, character, hut);

        });

        hut.on('pointerdown', () => {
            handleHutClick(hut, character);
        });

    })();

    const createCharacter = (app, texture) => {
        
        const character = PIXI.Sprite.from(texture);

        // Increase the resolution of the texture

        character.texture.source.scaleMode = "nearest";

        // Set the position of the character
        
        character.anchor.set(0.5);

        character.position.set(
            app.renderer.screen.width / 2,
            app.renderer.screen.height / 2
        );

        // Add the component to the app

        app.stage.addChild(character);
        
        return character;
    }

    const createHut = (app, name, texture, position) => {
        
        const hut = new PIXI.Sprite(texture);

        const titleStyle = new PIXI.TextStyle({
            fontFamily: 'monospace',
            fontSize: 15,
            fill: '#ffffff'
        });

        const hutTitle = new PIXI.Text({text: name, style: titleStyle});

        // Set the position of the hut

        hutTitle.position.set((app.screen.width - position.x - 50) / 2, (app.screen.height - position.y - 50) / 2);
        hut.position.set((app.screen.width - position.x) / 2, (app.screen.height - position.y) / 2);
        
        // Set the size of the hut

        hut.width = 100;
        hut.height = 100;
        
        // Make the hut interactive to be able to access the page

        hut.interactive = true;
        hut.buttonMode = true;

        // Add the components to the app

        app.stage.addChild(hut);
        app.stage.addChild(hutTitle);

        return hut
    }

    const moveCharacter = (keyController, character, hut) => {

        if (keyController.keys.left.pressed)
            character.x -= 3;

        else if (keyController.keys.right.pressed)
            character.x += 3;

        else if (keyController.keys.up.pressed)
            character.y -= 3;

        else if (keyController.keys.down.pressed)
            character.y += 3;

        if (distanceBetweenTwoPoints(hut, character) < INTERACTION_DISTANCE)
            window.location.href = '/huts/ai-robotics';
    }

    const handleHutClick = (hut, character) => {
        if (distanceBetweenTwoPoints(hut, character) < CLICK_INTERACTION_DISTANCE)
            window.location.href = 'huts/ai-robotics';
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
