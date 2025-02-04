"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from "react"
import { DataTable } from "./table"
import { getColumns } from "./column"
import { Button } from "@/components/ui/button"
import { getLatestInfo } from "./action"


export default function InfoList({ query, publishers }: { query: { param: string, value: string }|null, publishers: Map<string,string> }) {
    const [category, setCategory] = React.useState<string>('')
    const [mode, setMode] = React.useState<string>('')
    const [hour, setHour] = React.useState<number>(24)
    const [publisher, setPublisher] = React.useState<string>('')
    const [data, setData] = React.useState<[]>([])
    const columns = getColumns(publishers);

    // console.log(typeof publishers);
    // console.log(JSON.stringify(publishers));
    let selection =[];
    for(let domain in publishers){
        const name = publishers[domain] as string;
        selection.push(<SelectItem key={domain} value={name}>{name}</SelectItem>)
        // return <SelectItem key={domain} value={name}>{name}</SelectItem>;
    };
  
    React.useEffect(() => {
        async function fetchInfo() {
            let info = await getLatestInfo(hour);
            console.log(info)
            setData(info);
        }
        fetchInfo()
    }, [hour]);
    
    return (
        <div className="flex flex-col pl-6 pt-10 ">
            <div className="flex w-full">
                <Tabs defaultValue="latest" className="w-full" >
                    <TabsList>
                        <TabsTrigger value="latest" onClick={e => { setMode('latest') }}>最新</TabsTrigger>
                        <TabsTrigger value="trending" onClick={e => { setMode('trending') }}>热度</TabsTrigger>
                    </TabsList>
                </Tabs>
                {/* <Tabs defaultValue="24h" className="w-full">
                    <TabsList>
                        <TabsTrigger value="1h" onClick={e => { setHour(1) }}>1h</TabsTrigger>
                        <TabsTrigger value="6h" onClick={e => { setHour(6) }}>6h</TabsTrigger>
                        <TabsTrigger value="24h" onClick={e => { setHour(24) }}>24h</TabsTrigger>
                        <TabsTrigger value="7d" onClick={e => { setHour(168) }}>7d</TabsTrigger>
                    </TabsList>
                </Tabs> */}

                <div  className="w-full">
                    <Select onValueChange={(domain) => setPublisher(domain)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="所有网站" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="所有网站">{"所有网站"}</SelectItem>
                            {
                                selection
                                // ()=>{
                                //     let selection = []
                                //     for(let domain in publishers){
                                //         const name = publishers.get(domain) as string;
                                //         selection.push( <SelectItem key={domain} value={name}>{name}</SelectItem>);
                                //     };
                                //     return selection;
                                // }()
                            }
                        </SelectContent>
                    </Select>
                </div>
                <Button>查看全部</Button>
            </div>

   
            <div  className="flex pt-2 w-full">
                <DataTable columns={columns} data={data}></DataTable>
            </div>
        </div>
    );
}
