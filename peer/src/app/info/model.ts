export type Info = {
    // id: number,
    title: string,
    url: string,
    // category: string,
    // labels: [],
    labels: NameEntity[],
    language: string,
    data: string,
    publisher: Publisher,
    collect_time: number,
    publish_time: number,
}

export type NameEntity = {
    name: string,
    label: string,
    timestamp: number,
}

export type Publisher = {
    name: string,
    domain: string,
    timestamp: number,
}
