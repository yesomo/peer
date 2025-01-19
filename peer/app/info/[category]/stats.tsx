import { infoApi } from "@/app/info/action";
import React from "react"


export default async function Info({ params }: { params: { list?:string[] } }) {
  const publishers = await infoApi.getPublisherMap()
  console.log(publishers)
  console.log(params)
  return (
    <div className="flex pl-6">
    
    </div>
  );
}
