import Head from 'next/head';
import Link from 'next/link';

import '../app/globals.css';
import RootLayout from "@/app/layout";


export default function About() {

    return (
		<RootLayout style={"landing-page"}>

			<div className="overlay"></div>
			<div className="content text-lg">

				<p className="text-4xl text-slate-50 font-bold">How to play the game:</p>
				<br/>
				<p className="text-2xl text-slate-50">You enter the <b
					className="text-orange-400 font-bold">Village</b> and from there you can move around
					to find what what area you want to visit. Each Area is represented by a House.
				</p>

				<p className="text-2xl text-slate-50">To enter a <b
					className="text-orange-400 font-bold">House</b> you have to get inside it
				</p>
				<br/>
				<p className="text-2xl text-slate-50 font-bold">To move around you have to use the following keys:</p>

				<div className="keyboard-layout">
					<img style={{marginLeft: "50px"}} src="/assets/objects/keys/W-KEY.png" width="50px" height="50px"/>
					<img style={{display: "inline"}} src="/assets/objects/keys/A-KEY.png" width="50px" height="50px"/>
					<img style={{display: "inline"}} src="/assets/objects/keys/S-KEY.png" width="50px" height="50px"/>
					<img style={{display: "inline"}} src="/assets/objects/keys/D-KEY.png" width="50px" height="50px"/>
				</div>

				<br/>
				<br/>

				<p className="text-2xl text-slate-50">After you enter a house, you can move around and look for objects.
					Each object represents a particular part of that Area.
				</p>
				<br/>
				<p className="text-2xl text-slate-50">To see what an object hides, you have to get near it and click
					it. After you are done with it, you have to press the following key:
					<img style={{display: "inline"}} src="/assets/objects/keys/ESC-KEY.png" width="50px" height="50px"/>
				</p>

				<br/>

				<p className="text-4xl text-yellow-300 font-bold">Warning ⚠️</p>

				<br/>

				<p className="text-2xl text-slate-50">If the houses or the objects do not load correctly when you enter
				a certain page, please reload the web page. Thank you!
				</p>
			</div>

			<Link href="/">
				<button className="start-button top-right">Return home</button>
			</Link>
		</RootLayout>

	);
}
