"use server"
import { INFO_API_URI } from '@/app/env'

export type QueryParams = {
  timestamp_from_to: [number, number],
  publisher_domain: string | null,
  entity_label_name: [String, String],
  page_size_offset: [number, number],
}

export async function getLatestInfo(params: QueryParams) {
  // let params = null
  // { method: "POST", headers: { "content-type": "application/json" } , body: JSON.stringify(params)}
  // const res = await fetch(`${INFO_API_URI}`, { method: "POST", headers: { "content-type": "application/json" } , body: JSON.stringify({})});
  const res = await fetch(`${INFO_API_URI}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(params) });
  // console.log(res)
  const info = await res.json()
  return info;
}

export async function getPublisherMap() {
  const publishers = await fetch(`${INFO_API_URI}/publishers`).then(res => res.json());
  console.log(publishers)
  return publishers;
}

export async function getEntityStats(hour: number) {
  const entities = await fetch(`${INFO_API_URI}/entity/${hour}`).then(res => res.json());
  return entities;
}

export async function getRelatedInfo(url: string) {
  const res = await fetch(`${INFO_API_URI}/analysis?url=${url}`);
  // console.log(res)
  const info = await res.json()
  // console.log(info)
  return info;
}

export async function getInfo(url: string) {
  const res = await fetch(`${INFO_API_URI}?url=${url}`);
  // console.log(res)
  const info = await res.json()
  // console.log(info)
  return info;
}