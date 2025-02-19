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
import { InfoTable } from "./info-table";

export default function InfoSearchPage() {
    const [mode, setMode] = React.useState<string>('')
    const [hour, setHour] = React.useState<number>(24)
    const [publisher, setPublisher] = React.useState<string>('')

    return (
        <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 bg-white rounded-lg border bg-card text-card-foreground shadow-sm m-2">
            <InfoTable />
        </main>
    );
}
