import React from "react"
import InfoList from "./list";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Link from "next/link";
import InfoStatsPie from "./stats-pie";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getEntityStats, getPublisherMap } from "./action";

export default async function Info() {
  const publishers = await getPublisherMap();
  const entityStats = await getEntityStats(168);

  return (
    <main className="flex min-h-screen flex-col p-2">
      <div  className="flex justify-between w-full">
        <ToggleGroup type="single" className="pl-6" defaultValue="all">
          <ToggleGroupItem value="all"><Link href="/info" >全部</Link></ToggleGroupItem>
          <ToggleGroupItem value="news"><Link href="/info/news" >新闻</Link></ToggleGroupItem>
        </ToggleGroup>
        <Select>
          <SelectTrigger className="w-[180px] flex right-5">
            <SelectValue placeholder="时间段(最近24h)" />
          </SelectTrigger>
          <SelectContent>
              <SelectItem value="1h">最近</SelectItem>
              <SelectItem value="1h">最近1h</SelectItem>
              <SelectItem value="6h">最近6h</SelectItem>
              <SelectItem value="24h">最近24h</SelectItem>
              <SelectItem value="7d">最近7d</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full pt-3">
        <InfoStatsPie stats={entityStats[0]} description={"24h内消息人物排名top10"} title={"人物top10"}></InfoStatsPie>
        <InfoStatsPie stats={entityStats[2]} description={"24h内消息组织排名top10"} title={"组织top10"}></InfoStatsPie>
        <InfoStatsPie stats={entityStats[1]} description={"24h内消息地区排名top10"} title={"地区top10"}></InfoStatsPie>
      </div>
      <div>
      <InfoList publishers={publishers} query={{"param":"category","value":""}}></InfoList>
      </div>
    </main>

  );
}
