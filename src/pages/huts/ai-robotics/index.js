import Head from 'next/head';
import Link from 'next/link';
import '../../../app/globals.css';

import * as PIXI from 'pixi.js';


export default function Index() {

    const app = new PIXI.Application();
    app
    .init({hello: true, backgroundAlpha: 0})
    .then(async () => {
    
    });

    return (

        <main className={`domain-page`} id = "main">

            <Head>
                <link rel = "icon" href = "/assets/icon.png"/>
                <title>AI & Robotics</title>
            </Head>
            
            <Link href = "/village">
                    <button className="redirect-button top-right">Return to Village</button>
            </Link>
            
        </main>
    );
}
