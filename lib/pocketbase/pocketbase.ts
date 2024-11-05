import PocketBase, { RecordModel } from 'pocketbase';
import { RecordService } from 'pocketbase'
import { RewindDataType } from '../rewind/rewind';

interface PocketBaseDefaultFields {
    id: string,
    collectionId: string,
    collectionName: string,
    created: string,
    updated: string
}

export interface Video {
    video_id: string,
    title: string,
    available_at: string,
    duration: number,
    channel_id: string,
}

export interface VideoWithChannel extends Video {
    channel: Channel
}

export interface VideoDBEntry extends Video, PocketBaseDefaultFields {}

export interface Channel {
    channel_id: string,
    name: string,
    group: string,
    photo: string,
}

export interface ChannelDBEntry extends Channel, PocketBaseDefaultFields{}

export interface Rewind {
    rewind: RewindDataType
    photo: string
    year?: string
}

export interface RewindDBEntry extends Rewind, PocketBaseDefaultFields {}

export interface TypedPocketBase extends PocketBase {
    collection(idOrName: string): RecordService // default fallback for any other collection
    collection(idOrName: 'channels'): RecordService<ChannelDBEntry>
    collection(idOrName: 'videos'): RecordService<VideoDBEntry>
    collection(idOrName: 'rewinds'): RecordService<RewindDBEntry>
}

//console.log("aaa")
//console.log(process.env.NODE_ENV)

const pb = new PocketBase("https://backend.holorewind.com") as TypedPocketBase;

export default pb

export const PAGE_SIZE = 500

export async function fetchRecordsFromCollectionByCustomField(
    collection: string, 
    id: string, 
    values: Array<any>,
    fields?: Array<string>
): Promise<Array<RecordModel>> {
    let page_num = 0
    let page = values.slice(page_num * PAGE_SIZE, (page_num + 1) * PAGE_SIZE)
    const records: Array<RecordModel> = []
    for(; 
        page.length > 0; 
        page_num += 1, page = values.slice(page_num * PAGE_SIZE, (page_num + 1) * PAGE_SIZE)
    ) {
        records.concat((await pb.collection(collection).getList(1, PAGE_SIZE, {
            filter: page.map((value) => `${id}="${value}"`).join("||"),
            ...(fields && {fields: fields.join(',')})
        }))["items"])
    }

    return records
}

export async function fetchAllRecordsInCollection<T>(
    collection: string,
    params: object = {}
): Promise<Array<T>> {
    const records = []
    let pageNum = 1

    while(true) {
        const collectionsFetch = (await pb.collection(collection).getList<T>(pageNum, PAGE_SIZE, params))

        for(const record of collectionsFetch["items"]) {
            records.push(record)
        }

        if (collectionsFetch["page"] === collectionsFetch["totalPages"]) break

        pageNum += 1
    }

    return records
}

export async function fetchRecordFromCollectionById<T>(
    collection: string, 
    id: string, 
    params: object = {}
): Promise<T> {
    return await pb.collection(collection).getOne(id, params)
}

export async function createRecordInCollection<T>(
    collection: string,
    value: Record<string, any> | FormData
): Promise<T> {
    return await pb.collection(collection).create(value)
}