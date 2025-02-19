"use client"

import { getLatestInfo } from "@/app/info/action";
import { getColumns } from "@/app/info/column";
import { DataTable } from "@/app/info/table";
import React from "react";


export default function Community({ params }: { params: { label: string, name: string } }) {
  const label = params.label
  const name = decodeURI(params.name)
  const [data, setData] = React.useState<[]>([])
  const columns = getColumns();
  React.useEffect(() => {
    async function fetchInfo() {
      let info = await getLatestInfo({ "entity_label_name": [[`${label}`,`${name}`]] });
      console.log(info)
      setData(info);
    }
    fetchInfo()
  }, [label, name]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DataTable columns={columns} data={data}></DataTable>
    </main>
  );
}
