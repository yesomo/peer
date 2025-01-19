import {APISERVER_HOST} from '@/lib/env'

export const infoApiUrl:string = "/api/info";
export const infoInfoListUrl:string = `${APISERVER_HOST}/${infoApiUrl}/list`;

export const fetcher = (url:string) => fetch(url).then(res => res.json())

export type QueryParams = {
    start_time: number
    end_time:number
    limit: number
    mode:string
    category:string
    labels:string
    nes:string
    keywords:string
    publisher:string
  }

  
export const infoApi={
    getPublisherMap:()=>fetch(`${APISERVER_HOST}/${infoApiUrl}/publishers`).then(res => res.json()),
    getLatestInfo:(hour:number)=>fetch(`${APISERVER_HOST}/${infoApiUrl}/latest/${hour}`).then(res => res.json()),
    getEntityStats:(hour:number)=>fetch(`${APISERVER_HOST}/${infoApiUrl}/entity/stats/${hour}`).then(res => res.json()),
    getCategoryStats:(hour:number)=>fetch(`${APISERVER_HOST}/${infoApiUrl}/category/stats/${hour}`).then(res => res.json()),
    getTopicStats:(hour:number)=>fetch(`${APISERVER_HOST}/${infoApiUrl}/topic/stats/${hour}`).then(res => res.json()),
    getKeywordStats:(hour:number)=>fetch(`${APISERVER_HOST}/${infoApiUrl}/keyword/stats/${hour}`).then(res => res.json()),
}