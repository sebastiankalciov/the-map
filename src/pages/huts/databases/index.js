import Head from 'next/head';
import Link from 'next/link';
import '../../../app/globals.css';

import * as PIXI from 'pixi.js';

export default function Index() {

    const app = new PIXI.Application();

    (async () => {

        await app.init({hello: true, backgroundAlpha: 0, resizeTo: window})
        
    
        app.ticker.add(() => {

        
        });

    })();

    return (

        <main className={`landing-page`} id = "main">

            <Head>
                <title>Databases</title>
            </Head>
            
            <Link href = "/village">
                    <button className="redirect-button top-right">Return to Village</button>
            </Link>
            
        </main>
    );
}
