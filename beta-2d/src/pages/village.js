import Head from 'next/head';
import Link from 'next/link';
import '../app/globals.css';


import * as PIXI from 'pixi.js';

export default function Village() {
    
    const app = new PIXI.Application();
    app
    .init({hello: true })
    .then(async () => {

        document.getElementById("map-container").appendChild(app.canvas);
        const texture = await PIXI.Assets.load('/assets/character2.png');
        const sprite = PIXI.Sprite.from(texture);

        sprite.texture.source.scaleMode = "nearest";
        sprite.width = "1%"
        sprite.height = "1%"
        sprite.anchor.set(0.5);
        sprite.scale.set(10);

        sprite.position.set(
            app.renderer.screen.width / 2,
            app.renderer.screen.height / 2
        );

        app.stage.addChild(sprite);
    });

    return (

        <main className={`landing-page`} id = "main">

            <Head>
                <title>Village</title>
            </Head>
            
            <Link href = "/">
                    <button className="redirect-button top-right">Return home</button>
            </Link>
            
            <div id = "map-container"></div>

        </main>
    );
}
