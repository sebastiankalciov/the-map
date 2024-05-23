import Link from 'next/link';
import RootLayout from "@/app/layout";
import '@/app/globals.css';
import {Controller} from '@/components/Controller';
import Character from '@/components/Character';
import * as PIXI from 'pixi.js';

export default function AIRobotics() {

    const app = new PIXI.Application();

    (async () => {

        if (typeof window == "undefined") return;

        await app.init({hello: true, backgroundAlpha: 0, resizeTo: window, resolution: window.devicePixelRatio || 1})

        const mainContainer = document.getElementById("main");
        mainContainer.appendChild(app.canvas)

        // Add trees (TO-D0: Add function to generate trees

        const treeTexture = await PIXI.Assets.load('/assets/background/tree.png');
        const tree1 = PIXI.Sprite.from(treeTexture);
        const tree2 = PIXI.Sprite.from(treeTexture);
        tree1.width = 75;
        tree1.height = 75;
        tree1.texture.source.scaleMode = "nearest";

        tree1.anchor.set(0.5);

        tree1.position.set(
            0.4 * app.renderer.screen.width,
            0.2 * app.renderer.screen.height
        );

        tree2.width = 75;
        tree2.height = 75;
        tree2.texture.source.scaleMode = "nearest";

        tree2.anchor.set(0.5);

        tree2.position.set(
            0.7 * app.renderer.screen.width,
            0.2 * app.renderer.screen.height
        );

        // Add the components to the app
        app.stage.addChild(tree1);
        app.stage.addChild(tree2);

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
