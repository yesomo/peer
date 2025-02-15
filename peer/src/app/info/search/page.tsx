"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import React from "react";

export default function InfoSearchPage() {
    const [mode, setMode] = React.useState<string>('')
    const [hour, setHour] = React.useState<number>(24)
    const [publisher, setPublisher] = React.useState<string>('')

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex w-full">
                <Tabs defaultValue="latest" className="w-full" >
                    <TabsList>
                        <TabsTrigger value="latest" onClick={e => { setMode('latest') }}>最新</TabsTrigger>
                        <TabsTrigger value="trending" onClick={e => { setMode('trending') }}>热度</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="w-full">
                    <Select onValueChange={(domain) => setPublisher(domain)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="所有网站" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="所有网站">{"所有网站"}</SelectItem>
                            {
                                <SelectItem key="{domain}" value="{name}">"{name}"</SelectItem>
                            }
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={() => { window.open(`/info/search`, "_blank") }}>查看全部</Button>
            </div>


            <div className="flex pt-2 w-full">

            </div>
        </main>
    );
}
