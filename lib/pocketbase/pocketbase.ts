import PocketBase, { ListResult } from 'pocketbase';
import { RecordService } from 'pocketbase'
import { RewindDataType } from '@/lib/rewind/rewindData/rewindData';
import { RewindFilterDataType } from '@/lib/rewind/filterRewind/filterRewind';
import { isOnServer } from '../utils/utils';
import { loginAsAdmin } from './server/login';

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
    org: string,
    name: string,
    group: string,
    photo: string,
}

export interface ChannelDBEntry extends Channel, PocketBaseDefaultFields{}

export interface Rewind {
    rewind: RewindDataType
}

export interface RewindDBEntry extends Rewind, PocketBaseDefaultFields {}

export interface Stats {
    stat_type: string
}

export interface StatsDBEntry extends Stats, PocketBaseDefaultFields {}

export interface Filters {
    filter_data: RewindFilterDataType
}

export interface FiltersDBEntry extends Filters, PocketBaseDefaultFields {}

export interface TypedPocketBase extends PocketBase {
    collection(idOrName: string): RecordService // default fallback for any other collection
    collection(idOrName: 'channels'): RecordService<ChannelDBEntry>
    collection(idOrName: 'videos'): RecordService<VideoDBEntry>
    collection(idOrName: 'rewinds'): RecordService<RewindDBEntry>
    collection(idOrName: 'filters'): RecordService<FiltersDBEntry>
}

export const PAGE_SIZE = 100;

export class PocketBaseWrapper {
    static POCKETBASE_ADDRESS = process.env.NEXT_PUBLIC_POCKETBASE_ADDRESS;
    static PAGE_SIZE = PAGE_SIZE

    basePocketBase: PocketBase

    constructor() {
        this.basePocketBase = new PocketBase(PocketBaseWrapper.POCKETBASE_ADDRESS) as TypedPocketBase;
        this.basePocketBase.autoCancellation(false)
    }

    loginAsAdmin() {
        loginAsAdmin(pb.basePocketBase)
    }

    async fetchRecordsFromCollectionByCustomField<T>(
        collection: string, 
        id: string, 
        values: Array<any>,
        fields?: Array<string>
    ): Promise<Array<T>> {
        let page_num = 0
        let page = values.slice(page_num * PocketBaseWrapper.PAGE_SIZE, (page_num + 1) * PocketBaseWrapper.PAGE_SIZE)
        const requests: Array<Promise<ListResult<T>>> = []
        for(; 
            page.length > 0; 
            page_num += 1, page = values.slice(page_num * PocketBaseWrapper.PAGE_SIZE, (page_num + 1) * PocketBaseWrapper.PAGE_SIZE)
        ) {
            requests.push(this.basePocketBase.collection(collection).getList<T>(1, PocketBaseWrapper.PAGE_SIZE, {
                filter: page.map((value) => `${id}="${value}"`).join("||"),
                ...(fields && {fields: fields.join(',')})
            }))
        }

        return new Promise(async (resolve) => {
            const responses = await Promise.all(requests)

            resolve(responses.map((response) => response["items"]).flat())
        })
    }

    async fetchAllRecordsInCollection<T>(
        collection: string,
        params: object = {}
    ): Promise<Array<T>> {
        const records = []
        let pageNum = 1

        while(true) {
            const collectionsFetch = (await this.basePocketBase.collection(collection).getList<T>(pageNum, PocketBaseWrapper.PAGE_SIZE, params))

            for(const record of collectionsFetch["items"]) {
                records.push(record)
            }

            if (collectionsFetch["page"] === collectionsFetch["totalPages"]) break

            pageNum += 1
        }

        return records
    }

    async fetchRecordFromCollectionById<T>(
        collection: string, 
        id: string, 
        params: object = {}
    ): Promise<T> {
        return await this.basePocketBase.collection(collection).getOne(id, params)
    }

    async createRecordInCollection<T>(
        collection: string,
        value: Record<string, any> | FormData
    ): Promise<T> {
        return await this.basePocketBase.collection(collection).create(value)
    }

}

const pb = new PocketBaseWrapper()

export default pb