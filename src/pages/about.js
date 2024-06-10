import Head from 'next/head';
import Link from 'next/link';

import '../app/globals.css';
import RootLayout from "@/app/layout";


export default function About() {

    return (
        <RootLayout>
            <Head>
                <title>Computer Science - The Map</title>
            </Head>

            <p className="text-2xl">We are a team of Computer Science Students that want to guide you to find your path in Computer Science.</p>

            <Link href = "/">
                <button className="redirect-button top-right">Home</button>
            </Link>
        </RootLayout>

    );
}
