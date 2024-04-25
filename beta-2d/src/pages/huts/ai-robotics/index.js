import Head from 'next/head';
import Link from 'next/link';
import '../../../app/globals.css';
import keyboard from '../../../components/Keyboard'
import * as PIXI from 'pixi.js';


export default function Index() {
    console.log(keyboard("ArrowLeft"))
    const app = new PIXI.Application();
    app
    .init({hello: true, backgroundAlpha: 0})
    .then(async () => {
        
        document.getElementById("main").appendChild(app.canvas);
        const texture = await PIXI.Assets.load('/assets/character3.png');
        const character = PIXI.Sprite.from(texture);
    
        character.texture.source.scaleMode = "nearest";
   
        character.anchor.set(0.5);

        character.position.set(
            app.renderer.screen.width / 2,
            app.renderer.screen.height / 2
        );

        app.stage.addChild(character);

        character.vx = 0;
        character.vy = 0;

        const left = keyboard("ArrowLeft"),
            up = keyboard("ArrowUp"),
            right = keyboard("ArrowRight"),
            down = keyboard("ArrowDown");

        console.log(left)
        left.press = () => {
            
            character.vx = -5;
            character.vy = 0;
        };
        
        left.release = () => {

            if (!right.isDown && character.vy === 0) {
            character.vx = 0;
            }
        };


        up.press = () => {
            character.vy = -5;
            character.vx = 0;
        };
        up.release = () => {
            if (!down.isDown && character.vx === 0) {
            character.vy = 0;
            }
        };

    
        right.press = () => {
            character.vx = 5;
            character.vy = 0;
        };
        right.release = () => {
            if (!left.isDown && character.vy === 0) {
            character.vx = 0;
            }
        };

    
        down.press = () => {
            character.vy = 5;
            character.vx = 0;
        };
        down.release = () => {
            if (!up.isDown && character.vx === 0) {
            character.vy = 0;
            }
        };

        character.x += character.vx;
        character.y += character.vy;


    });

    return (

        <main className={`landing-page`} id = "main">

            <Head>
                <title>AI & Robotics</title>
            </Head>
            
            <Link href = "/">
                    <button className="redirect-button top-right">Return home</button>
            </Link>
            
        </main>
    );
}
