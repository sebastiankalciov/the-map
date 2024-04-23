import Head from 'next/head';
import Link from 'next/link';

import '../app/globals.css';


export default function Home() {

    return (

        <main className={`landing-page`}>

            <Head>
                <title>Computer Science - The Map</title>
            </Head>

            <h1 className="text-8xl font-extrabold title">Welcome, wanderer</h1>

            <p>Are you here to find your path in Computer Science?</p>
            <p>Click on the button below to start your journey</p>

            <Link href = "/village">
                <button className="redirect-button">Start</button>
            </Link>


        </main>
    );
}
