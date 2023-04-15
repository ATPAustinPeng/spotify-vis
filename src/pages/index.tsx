import { Graph } from "@/components/Graph";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const file = useState(null);
  return (
    <>
      <Head>
        <title>Spotify Reccomendation Visualization</title>
        <meta name="description" content="CSE6242 Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <div className="grid grid-cols-4" id="main">
        <Sidebar file={file}/>
        <div id="graph" className="col-span-3">
          <Graph width={1200} height={900} file={file}/>
        </div>
      </div>
      </main>
    </>
  )
}
