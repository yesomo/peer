"use server"

import { getEntityStats, getInfo, getPublisherMap, getRelatedInfo } from "../action";
import { getColumns } from "../column";

export default async function InfoAnalysisPage({searchParams}:{searchParams:{url:string}}) {
  const url = searchParams.url;
  const publishers = await getPublisherMap();
  const entityStats = await getEntityStats(168);
  const infoList = await getRelatedInfo(url);
  const info = await getInfo(url);
  const columns = getColumns(publishers);
  console.log(info)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {url}
    </main>
  );
}
