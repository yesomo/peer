"use client"

import React from "react";
import { getLatestInfo } from "../../action";
import { getColumns } from "../../column";
import { DataTable } from "../../table";


export default function InfoPublisherPage({ params }: { params: { domain: string } }) {
  const domain = params.domain

  const [data, setData] = React.useState<[]>([])
  const columns = getColumns();
  
  React.useEffect(() => {
    async function fetchInfo() {
      let info = await getLatestInfo({ "publisher_domain": domain});
      console.log(info)
      setData(info);
    }
    fetchInfo()
  }, [domain]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <DataTable columns={columns} data={data}></DataTable>
    </main>
  );
}
