import { BarChart } from "@/components/BarChart";
import { GroupedBarChart } from "@/components/GroupedBarChart";
import { StackedBarChart } from "@/components/StackedBarChart";
import { Graph } from "@/components/Graph";
import type { IData, IGroupedData } from "@/util/types";
import Head from "next/head";

const BAR_CHART_DATA: IData[] = [
  { label: "Apples", value: 100 },
  { label: "Bananas", value: 200 },
  { label: "Oranges", value: 50 },
  { label: "Kiwis", value: 150 }
];

const GROUPED_BAR_CHART_DATA: IGroupedData[] = [
  { label: "Apples", values: [60, 80, 100] },
  { label: "Bananas", values: [160, 200, 120] },
  { label: "Oranges", values: [60, 40, 10] }
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify Reccomendation Visualization</title>
        <meta name="description" content="CSE6242 Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 24 24" fill="#26A69A" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5ZM3.5 6C3.5 4.61929 4.61929 3.5 6 3.5C7.38071 3.5 8.5 4.61929 8.5 6C8.5 7.38071 7.38071 8.5 6 8.5C4.61929 8.5 3.5 7.38071 3.5 6Z" fill="teal-200"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M18 16.5C17.1716 16.5 16.5 17.1716 16.5 18C16.5 18.8284 17.1716 19.5 18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5ZM15.5 18C15.5 16.6193 16.6193 15.5 18 15.5C19.3807 15.5 20.5 16.6193 20.5 18C20.5 19.3807 19.3807 20.5 18 20.5C16.6193 20.5 15.5 19.3807 15.5 18Z" fill="teal-200"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M15.55 5.5C15.7816 4.35888 16.7905 3.5 18 3.5C19.3807 3.5 20.5 4.61929 20.5 6C20.5 7.38071 19.3807 8.5 18 8.5C16.7905 8.5 15.7816 7.64112 15.55 6.5H12.5V18C12.5 18.2761 12.2761 18.5 12 18.5H8.44999C8.21836 19.6411 7.20948 20.5 6 20.5C4.61929 20.5 3.5 19.3807 3.5 18C3.5 16.6193 4.61929 15.5 6 15.5C7.20948 15.5 8.21836 16.3589 8.44999 17.5H11.5V6C11.5 5.72386 11.7239 5.5 12 5.5H15.55ZM18 4.5C17.1716 4.5 16.5 5.17157 16.5 6C16.5 6.82843 17.1716 7.5 18 7.5C18.8284 7.5 19.5 6.82843 19.5 6C19.5 5.17157 18.8284 4.5 18 4.5ZM6 16.5C5.17157 16.5 4.5 17.1716 4.5 18C4.5 18.8284 5.17157 19.5 6 19.5C6.82843 19.5 7.5 18.8284 7.5 18C7.5 17.1716 6.82843 16.5 6 16.5Z" fill="teal-200"/>
        </svg>
        <span className="font-semibold text-xl tracking-tight">Spotify Reccomendation Vis Tool</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white      hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0       3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Option 1
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Option 2
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
              Option 3
            </a>
          </div>
          <div>
            <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white       hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
              Download (Maybe png/html/etc)</a>
          </div>
        </div>
      </nav>

      <div className="grid h-screen place-items-center">
        <section id="graph">
          <h2>Graph</h2>
          <Graph/>
        </section>
      </div>

      <div className="container">
        <h1>
          <span>React and D3 examples </span>
          <span role="img" aria-label="Index pointing down emoji">
            👇
          </span>
        </h1>
        <section>
          <h2>Bar chart</h2>
          <BarChart data={BAR_CHART_DATA} />
        </section>
        <section>
          <h2>Grouped bar chart with tooltip</h2>
          <GroupedBarChart data={GROUPED_BAR_CHART_DATA} />
        </section>
        <section>
          <h2>Stacked bar chart</h2>
          <StackedBarChart data={GROUPED_BAR_CHART_DATA} />
        </section>
      </div>
      </main>
    </>
  )
}
