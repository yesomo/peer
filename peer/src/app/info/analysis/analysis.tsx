"use client"

import { Info } from "../model";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "../table";
import { getColumns } from "../column";
import InfoGraph from "./graph";
import KnowledgeGraph from "./graph";


export default function InfoAnalysisView({ info, analysis }: { info: Info, analysis: Info[] }) {
  console.log(analysis)
  const columns = getColumns();
  return (
    <div className="flex flex-col w-full pt-4 ">
      <Tabs defaultValue="list" className="w-full">
      <div className="flex bg-slate-300 w-full">关联分析</div>
        <TabsList>
          <TabsTrigger value="list">列表形式</TabsTrigger>
          <TabsTrigger value="graph">图表形式</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <DataTable columns={columns} data={analysis}></DataTable>
        </TabsContent>
        <TabsContent value="graph">
          <KnowledgeGraph></KnowledgeGraph>
        </TabsContent>
      </Tabs>
    </div>

  );
}
