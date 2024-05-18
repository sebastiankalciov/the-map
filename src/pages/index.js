import Head from 'next/head';
import Link from 'next/link';

import '../app/globals.css';
import {useEffect, useState} from "react";


export default function Home() {

    return (

        <main className={`landing-page`}>

            <Head>
                <link rel = "icon" href = "/assets/icon.png"/>
                <title>Computer Science - The Map</title>
            </Head>

            <header>
                <h1 className="text-8xl font-extrabold title">Welcome, wanderer</h1>
            </header>

            <p>Are you here to find your path in Computer Science?</p>
            <p>Click on the button below to start your journey</p>

            <Link href = "/village">
                <button className="redirect-button">Start</button>
            </Link>

            <Link href = "/about">
                <button className="redirect-button top-right">About us</button>
            </Link>
    
        </main>
    );
}
