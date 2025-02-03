"use server"
import { INFO_API_URI } from '@/app/env'

export type QueryParams = {
  start_time: number
  end_time: number
  limit: number
  mode: string
  category: string
  labels: string
  // nes: string
  // keywords: string
  publisher: string
}

export async function getLatestInfo(hour: number) {
  const info = await fetch(`${INFO_API_URI}/latest/${hour}`).then(res => res.json());
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
