import Head from 'next/head';
import Link from 'next/link';

import '../app/globals.css';


export default function Home() {

    return (

        <main className={`landing-page`}>

            <Head>
                <title>Computer Science - The Map</title>
            </Head>


            <p className="text-2xl">We are a team of Computer Science Students that want to guide you to find your path in Computer Science.</p>
        
            <Link href = "/">
                <button className="redirect-button top-right">Home</button>
            </Link>

        </main>
    );
}
