import Head from 'next/head';
import Link from 'next/link';
import '../../app/globals.css';

import * as PIXI from 'pixi.js';

export default function Hut1() {
    
    const app = new PIXI.Application();
    app
    .init({hello: true, backgroundAlpha: 0})
    .then(async () => {

        document.getElementById("main").appendChild(app.canvas);
        const texture = await PIXI.Assets.load('/assets/character3.png');
        const sprite = PIXI.Sprite.from(texture);

        sprite.texture.source.scaleMode = "nearest";
   
        sprite.anchor.set(0.5);
       
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
            <h1 className="text-8xl font-extrabold title">Hut 1</h1>
            <Link href = "/">
                    <button className="redirect-button top-right">Return home</button>
            </Link>
            
            

        </main>
    );
}
