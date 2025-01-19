import React from "react"
import InfoList from "./list";
import { infoApi } from "@/app/info/action";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Link from "next/link";
import InfoStatsPie from "./stats-pie";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoStatsBar } from "./stats-bar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default async function Info() {
  const publishers = await infoApi.getPublisherMap();
  const entityStats = await infoApi.getEntityStats(168);
  const categoryStats = await infoApi.getCategoryStats(168);
  const topicStats = await infoApi.getTopicStats(168);
  return (
    <main className="flex min-h-screen flex-col p-2">
      <div  className="flex w-full">
        <ToggleGroup type="single" className="pl-6" defaultValue="all">
          <ToggleGroupItem value="all"><Link href="/info" >全部</Link></ToggleGroupItem>
          <ToggleGroupItem value="news"><Link href="/info/news" >新闻</Link></ToggleGroupItem>
          {/* <ToggleGroupItem value="view"><Link href="/info/views" >观点</Link></ToggleGroupItem>
          <ToggleGroupItem value="skill"><Link href="/info/skill" >技术</Link></ToggleGroupItem> */}
        </ToggleGroup>
        <Select>
          <SelectTrigger className="w-[180px] fixed right-5">
            <SelectValue placeholder="时间段(最近24h)" />
          </SelectTrigger>
          <SelectContent>
              <SelectItem value="1h">最近1h</SelectItem>
              <SelectItem value="6h">最近6h</SelectItem>
              <SelectItem value="24h">最近24h</SelectItem>
              <SelectItem value="7d">最近7d</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full pt-3">
        {/* <InfoStatsBar stats={categoryStats} title={"top10分类"} description={"24h内消息分类排名"}></InfoStatsBar>
        <InfoStatsBar  stats={topicStats} title={"top10主题"} description={"24h内消息主题排名"}></InfoStatsBar> */}
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
