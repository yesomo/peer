import React from "react"
import InfoList from "../list";
import { infoApi } from "@/app/info/action";


export default async function Info({ params }: { params: { category:string } }) {
  const publishers = await infoApi.getPublisherMap()
  console.log(publishers)
  console.log(params)
  const query = {param:"category",value:params.category}
  return (
    <>
    <InfoList publishers={publishers} query={query}></InfoList>
    </>
  );
}
