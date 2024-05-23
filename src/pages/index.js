import Head from 'next/head';
import Link from 'next/link';

import '../app/globals.css';
import {useEffect, useState} from "react";
import RootLayout from "@/app/layout";


export default function Home() {

    return (

        <RootLayout style = {"landing-page"}>

            <header>
                <h1 className="text-8xl font-extrabold title align-top">Welcome, wanderer</h1>
            </header>

            <div className="pb-60">

                <p className="text-2xl">
                    Are you here to find your path in <a className="font-bold">Computer Science</a>?
                </p>

                <p className="text-2xl">
                    <a className="font-bold">Click</a> on the button below to start your journey
                </p>

                <Link href = "/loading">
                    <button className="redirect-button-landingPage">Start</button>
                </Link>

            </div>

            <Link href = "/about">
                <button className="redirect-button-landingPage top-right">About us</button>
            </Link>

        </RootLayout>

    );
}
