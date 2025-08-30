"use client"
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { getLatestInfo, QueryParams } from "@/app/info/action";



export default function InfoToolbar<TData>({
    table, dispatch
}: { table: Table<TData>, dispatch: any }) {
    const [date, setDate] = React.useState<DateRange | undefined>()
    // const [date, setDate] = React.useState<DateRange | undefined>({
    //     from: addDays(new Date(), -7),
    //     to: new Date(),
    // })
    const [domain, setDomain] = React.useState("")

    return (
        <div className="flex items-center py-4">
            <Input
                placeholder="过滤当前结果集标题"
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
            <div className="flex items-center py-4 ml-4">
                <label>域名:</label>
                <Input
                    placeholder=""
                    value={domain}
                    onChange={(event) =>
                        setDomain(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="flex items-center py-4 ml-4">
                <label>起止时间:</label>
                <div className={cn("grid gap-2")}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-[300px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="flex items-center py-4 ml-4">
                <Button onClick={
                    async () => {
                        const param: QueryParams = {
                            publisher_domain: domain,
                            timestamp_from_to: [(date?.from?.getTime() ?? 0) - 60 * 60 * 24 * 1000, date?.to?.getTime() ?? new Date().getTime()],
                            entity_label_name: null,
                            page_size_offset: null
                        }
                        const info = await getLatestInfo(param);
                        console.log(info)
                        dispatch("updateInfo", info);
                    }
                }>查询</Button>
            </div>
        </div>
    )
}