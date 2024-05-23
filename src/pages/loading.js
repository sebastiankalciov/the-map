import Head from 'next/head';
import Link from 'next/link';

import '../app/globals.css';
import {useEffect, useState} from "react";
import RootLayout from "@/app/layout";


export default function Home() {

    return (

        <RootLayout style = {"landing-page"}>

            <div className="pb-60">

                <div className = "storyContainer">
                    <p className="storyText">

                        <a className="text-2xl text-cyan-100">Computer Science </a>
                        is an endlessly fascinating field, teeming with creativity,
                        logic, and innovation. It’s a realm where imagination meets precision, and complex problems
                        are unraveled through the elegance of code.
                        <br/>
                        <br/>
                        <a className="text-cyan-100">Inspired</a>
                        by this dynamic world, we, a group of passionate
                        students, have created an
                        interactive map to guide you through the captivating landscapes of Computer Science.
                        <br/>
                        <br/>

                        <a className="text-cyan-100">From the fundamentals </a>
                        of programming to the marvels of Artificial Intelligence,
                        our journey
                        will take you through the key concepts and exciting frontiers of this ever-evolving domain.

                        <br/>
                        <br/>
                        So, are you ready to dive in and explore the wonders of Computer Science with us?
                        <br/>
                        <br/>

                        <a className="text-cyan-100">Click the button</a>
                        below to start your adventure and
                        unlock the secrets of this amazing field!
                    </p>
                </div>

                <Link href="/village">
                    <button className="redirect-button-landingPage">Start the journey</button>
                </Link>

            </div>

        </RootLayout>

    );
}
