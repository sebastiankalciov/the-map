import Link from 'next/link';
import RootLayout from "@/app/layout";
import '@/app/globals.css';
import PageLayout from "@/components/HutDefaultPage.js";

const PAGE_NAME = "databases";

export default function Databases() {

	PageLayout(PAGE_NAME);

    return (
        <RootLayout style = "domain-page">
            <Link href = "/village" id = "redirect-button">
                <button className="redirect-button-hut top-right">Return to Village</button>
            </Link>
        </RootLayout>
    );
}
