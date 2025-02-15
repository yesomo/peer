"use client"

import { getColumns } from "../column";
import { Info } from "../model";
import { DataTable } from "../table";

export default function InfoAnalysisView({ info, analysis }: { info: Info, analysis: [Info] }) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DataTable columns={columns} data={info}></DataTable>
    </main>
  );
}
