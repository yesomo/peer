import { ColumnDef } from "@tanstack/react-table"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

export type Info = {
    id: number,
    title: string,
    url: string,
    category: string,
    // labels: [],
    entities: [Entity],
    keywords: [],
    mediumn: string,
    language: string,
    content: string,
    publisher: Publisher,
    collect_time: number,
    process_time: number,
}
export type Entity = {
    name: string,
    label: string,
    timestamp: number,
}

export type Publisher = {
    name: string,
    domain: string,
    timestamp: number,
}

export const getColumns = (publishers:Map<String,String>) => {
    const columns: ColumnDef<Info>[] = [
        {
            accessorKey: "title",
            header: "标题",
            cell: ({ row }) => {
                const title: string = row.getValue("title")
                const url = row.original.url as string
                if (title.length > 30) {
                    const content_start = title.substring(0, 12);
                    const content_end = title.substring(title.length - 8, title.length);
                    const content_part = `${content_start}...${content_end}`;
                    return (
                        <HoverCard >
                            <HoverCardTrigger>
                                <Button className="pl-0" variant="link" onClick={()=>window.open(url,"_blank")}> {content_part}</Button>
                            </HoverCardTrigger>
                            <HoverCardContent >
                                {title}
                            </HoverCardContent>
                        </HoverCard>
                    )
                } else {
                    return <Button  className="pl-0"  variant="link" onClick={()=>window.open(url,"_blank")}> {title}</Button>
                }
            },
        },
        {
            accessorKey: "category",
            header: "类型",
            cell: ({ row }) => {
                const category = row.getValue("category") as string
                return <div className="font-medium">{category}</div>
            },
        },
        {
            accessorKey: "topic",
            header: "主题",
            cell: ({ row }) => {
                const topic = row.getValue("topic") as string
                return <div className="font-medium">{topic}</div>
            },
        },
        {
            accessorKey: "entities",
            header: "命名实体",
            cell: ({ row }) => {
                const nes = row.getValue("entities") as [Entity]
                let per = []
                let loc = []
                let org = []
                for (let i in nes) {
                    let entity = nes[i]
                    console.log(entity)
                    switch (entity.label) {
                        case "LOC":
                            loc.push(entity.name)
                            break;
                        case "ORG":
                            org.push(entity.name)
                            break;
                        case "PER":
                            per.push(entity.name)
                            break;
                    }
                }

                return <div className="font-medium">
                    {per.length > 0 ? ("人物:(" + per.join(",").trimEnd() + ");\n") : ""}
                    {org.length > 0 ? ("组织:(" + org.join(",").trimEnd() + ");\n") : ""}
                    {loc.length > 0 ? ("地区:(" + loc.join(",").trimEnd() + ");\n") : ""}

                </div>
            },
        },
        {
            accessorKey: "keywords",
            header: "关键字",
            cell: ({ row }) => {
                const keywords = row.getValue("keywords") as []
                return <div className="font-medium">{keywords.join(";")}</div>
            },
        },
        {
            accessorKey: "publisher",
            header: "发布网站",
            cell: ({ row }) => {
                const publisher =row.getValue("publisher") as Publisher;
                const domain = publisher.domain;
                const name = publishers[domain] ?? domain;
                return (
                    <HoverCard >
                    <HoverCardTrigger>
                        <Button className="pl-0" variant="link"  onClick={() => window.open(`${name}`, "_blank")}> {name}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent >
                        {domain}
                    </HoverCardContent>
                </HoverCard>
                )

            },
        },
        {
            accessorKey: "collect_time",
            header: () => <div className="text-right">采集时间</div>,
            cell: ({ row }) => {
                const collect_time = parseInt(row.getValue("collect_time"))
                const timestr = new Date(collect_time).toLocaleString('zh-cn', { timeZone: 'UTC' })

                return <div className="text-right font-medium">{timestr}</div>
            },
        },
        {
            id: "actions",
            header: "详情",
            cell: ({ row }) => {
                return <Button  className="pl-0"  variant="link" onClick={()=>window.open("#","_blank")}> {"分析"}</Button>
            },
        },
    ];
    return columns
}