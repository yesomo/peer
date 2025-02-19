"use client"

import { Info } from "../model";

export default function InfoBasicView({ info }: { info: Info }) {
    console.log(info)
    return (

        <div className="flex flex-col h-64 w-full">
            <div className="flex bg-slate-300 h-64 w-full">基本信息 </div>
            <div className="flex bg-slate-300 h-64 w-full"> {info.title} </div>
            <div className="flex flex-col bg-red-300  h-64 w-full">
                <div className="flex flex-row  pt-4">
                    <div>命名实体:</div>
                    {
                        info.labels.map((entity, index) => <div key={index} onClick={() => window.open(`/info/entity/${entity.label}/${entity.name}`)}>{entity.label}.{entity.name}</div>)
                    }
                </div>
                <div className="flex flex-row pt-4">
                    <div>发布者:</div>
                    <div onClick={() => window.open(`/info/publisher/${info.publisher.domain}`)}>{info.publisher.domain}.{info.publisher.name}</div>
                </div>
            </div>
        </div>
    );
}
