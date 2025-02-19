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
import { Info, NameEntity, Publisher } from "../model"



export const getColumns = (dispatch: any) => {
    const columns: ColumnDef<Info>[] = [
        {
            accessorKey: "title",
            header: "title",
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
                                <Button className="pl-0" variant="link" onClick={() => window.open(url, "_blank")}> {content_part}</Button>
                            </HoverCardTrigger>
                            <HoverCardContent >
                                {title}
                            </HoverCardContent>
                        </HoverCard>
                    )
                } else {
                    return <Button className="pl-0" variant="link" onClick={() => window.open(url, "_blank")}> {title}</Button>
                }
            },
        },
        // {
        //     accessorKey: "category",
        //     header: "category",
        //     cell: ({ row }) => {
        //         const category = row.getValue("category") as string
        //         return <div className="font-medium">{category}</div>
        //     },
        // },
        // {
        //     accessorKey: "labels",
        //     header: "labels",
        //     cell: ({ row }) => {
        //         const labels = row.getValue("labels") as []
        //         return <div className="font-medium">{labels.join(";")}</div>
        //     },
        // },
        {
            accessorKey: "labels",
            header: "labels",
            cell: ({ row }) => {
                const nes = row.getValue("labels") as [NameEntity]
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
        // {
        //     accessorKey: "keywords",
        //     header: "keywords",
        //     cell: ({ row }) => {
        //         const keywords = row.getValue("keywords") as []
        //         return <div className="font-medium">{keywords.join(";")}</div>
        //     },
        // },
        // {
        //     accessorKey: "data",
        //     header: "data",
        //     cell: ({ row }) => {
        //         const content: string = row.getValue("data")
        //         if (content.length > 50) {
        //             const content_start = content.substring(0, 12);
        //             const content_end = content.substring(content.length - 8, content.length);
        //             const content_part = `${content_start}...${content_end}`;
        //             return (
        //                 <HoverCard>
        //                     <HoverCardTrigger>
        //                         <Button variant="link"> {content_part}</Button>
        //                     </HoverCardTrigger>
        //                     <HoverCardContent >
        //                         {content}
        //                     </HoverCardContent>
        //                 </HoverCard>
        //             )
        //         } else {
        //             return <div className="font-medium">{content}</div>
        //         }
        //     },
        // },
        {
            accessorKey: "publisher",
            header: "publisher",
            cell: ({ row }) => {
                const publisher: Publisher = row.original["publisher"]
                return <div className="text-right font-medium">{publisher.domain}</div>
            },
        },
        {
            accessorKey: "publish_time",
            header: () => <div className="text-right">发布时间</div>,
            cell: ({ row }) => {
                const publish_time = row.original["publish_time"]
                return <div className="text-right font-medium">{publish_time?.toLocaleString('zh-cn', { timeZone: 'UTC' })}</div>
            },
        },
        {
            accessorKey: "collect_time",
            header: () => <div className="text-right">采集时间</div>,
            cell: ({ row }) => {
                const update_time = row.original["collect_time"]
                return <div className="text-right font-medium">{update_time?.toLocaleString('zh-cn', { timeZone: 'UTC' })}</div>
            },
        },
        {
            id: "actions",
            header: "操作",
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" onClick={(e) => {
                            const ele = e.target as HTMLElement;
                            dispatch(ele.innerText, row.original);
                            e.stopPropagation();
                        }}>
                            {/* <DropdownMenuItem>启/禁用</DropdownMenuItem> */}
                            <DropdownMenuItem>分析</DropdownMenuItem>
                            <DropdownMenuItem>原文</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>分类</DropdownMenuItem>
                            <DropdownMenuItem>主题</DropdownMenuItem>
                            <DropdownMenuItem>关键词</DropdownMenuItem>
                            <DropdownMenuItem>命名实体</DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];
    return columns
}