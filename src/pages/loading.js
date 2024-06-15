import Link from 'next/link';
import '@/app/globals.css';
import RootLayout from "@/app/layout";

export default function Loading() {

    return (

        <RootLayout style = {"landing-page"}>

            <div className="overlay"> </div>
			<div className="content text-lg">
				<h1 className="text-4xl text-slate-50 intro">Computer Science</h1>
				<p className="text-slate-50 intro">is an endlessly fascinating field, teeming with creativity, logic, and
					innovation.</p>
				<br/>
				<p className="text-slate-50 leading-8">It’s a realm
					where imagination meets precision, and complex problems are unraveled through the elegance of
					code.

				</p>
				<br/>
				<p className="text-slate-50 leading-8">Inspired by this dynamic world, we, a group of passionate students, have
					created an interactive
					map to guide you through the captivating landscapes of Computer Science.</p>

				<p className="text-slate-50 leading-8">From the fundamentals of programming to the marvels of Artificial
					Intelligence, our journey will
					help you understand the main ideas and new developments in this constantly changing field.</p>
				<br/>
				<p className="text-slate-50 leading-8">So, are you ready to dive in and explore the wonders of Computer Science
					with us?</p>

				<br/>
				<p className="text-slate-50">Click the button below to start your adventure and unlock the secrets of
					this amazing field!</p>
				<br/>
				<Link href="/village">
					<button className="start-button">Start the journey</button>
				</Link>
			</div>


		</RootLayout>
	);
}
