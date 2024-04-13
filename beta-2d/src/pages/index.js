import Image from "next/image";
import '../app/globals.css'

import PixiCanvas from '../components/object';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-6xl text-center font-bold">Computer Science - The Map</h1>
        <PixiCanvas/>
      </div>
    </main>
  );
}
