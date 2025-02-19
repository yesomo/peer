"use server"

import { getInfo, getRelatedInfo } from "../action";
import InfoAnalysisView from "./analysis";
import InfoBasicView from "./basic";

export default async function InfoAnalysisPage({ searchParams }: { searchParams: { url: string } }) {
  const url = searchParams.url;

  const infoList = await getRelatedInfo(url);
  const info = await getInfo(url);

  return (
    <main className="grid grid-cols-5 gap-4  min-h-screen  w-full p-4 ">

      <div className="col-span-2">
        <InfoBasicView info={info}></InfoBasicView>
      </div>

      <div className="col-span-3">
        <InfoAnalysisView info={info} analysis={infoList}></InfoAnalysisView>
      </div>

      <div className="col-span-5 h-64 bg-slate-300"></div>

    </main>
  );
}
