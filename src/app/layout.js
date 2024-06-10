import "./globals.css";
import Link from "next/link";
import Head from "next/head";

/**
 * ## Standard layout for pages
 * @param children
 * @param {string} style - Style class
 * @returns {JSX.Element}
 * @constructor
 */
export default function RootLayout({ children, style = "default-page"}) {
    return (
        <main id = "main" className={style}>

            <Head>
                <link rel="icon" href="/assets/icon.png"/>
                <title>Computer Science - The Map</title>
            </Head>

            {children}

        </main>
    );
}
