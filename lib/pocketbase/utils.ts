import pb, { Channel, PAGE_SIZE, RewindDBEntry, StatsDBEntry, Video, createRecordInCollection } from "./pocketbase"


export async function fetchVideoByVideoIds(videoIds: Array<string>): Promise<Record<string, Video>> {
    const videos: Record<string, Video> = {}
    
    let pageNum = 0
    let page = videoIds.slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
    for(; 
        page.length > 0; 
        pageNum += 1, page = videoIds.slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
    ) {
        const videoDBRecords = (await pb.collection("videos").getList(1, PAGE_SIZE, {
            filter: page.map((id) => `video_id="${id}"`).join("||"),
            requestKey: null
        }))["items"]

        videoDBRecords.forEach((videoDBRecord) => {
            const {id, collectionName, collectionId, updated, created, ...video} = videoDBRecord
            videos[video.video_id] = video
        })
    }

    return videos
}

export async function fetchVideosByVideoIdsInParallel(videoIds: Array<string>): Promise<Record<string, Video>> {
    const videos: Record<string, Video> = {}
    const requests = []
    
    let pageNum = 0
    let page = videoIds.slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
    for(; 
        page.length > 0; 
        pageNum += 1, page = videoIds.slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
    ) {
        requests.push(pb.collection("videos").getList(1, PAGE_SIZE, {
            filter: page.map((id) => `video_id="${id}"`).join("||"),
            requestKey: null
        }))
    }

    const responses = await Promise.all(requests)

    for(const response of responses) {
        const videoDBRecords = response["items"]

        videoDBRecords.forEach((videoDBRecord) => {
            const {id, collectionName, collectionId, updated, created, ...video} = videoDBRecord
            videos[video.video_id] = video
        })
    }

    return videos
}

export async function fetchChannelByChannelIds(channelIds: Array<string>): Promise<Record<string, Channel>> {
    const channels: Record<string, Channel> = {}
    
    let pageNum = 0
    let page = channelIds.slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
    for(; 
        page.length > 0; 
        pageNum += 1, page = channelIds.slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
    ) {
        const channelDBRecords = (await pb.collection("channels").getList(1, PAGE_SIZE, {
            filter: page.map((id) => `channel_id="${id}"`).join("||"),
            requestKey: null
        }))["items"]

        channelDBRecords.forEach((channelDBRecord) => {
            const {id, collectionName, collectionId, updated, created, ...channel} = channelDBRecord
            channels[channel.channel_id] = channel
        })
    }

    return channels
}

export async function createRewind(
    rewind: object
): Promise<RewindDBEntry> {
    return await createRecordInCollection<RewindDBEntry>('rewinds', {rewind})
}

export function getRewindPhotoUrl(record: RewindDBEntry, filename: string) {
    return pb.files.getUrl(record, filename)
}

export async function createRewindCreationStat(): Promise<StatsDBEntry> {
    return await createRecordInCollection<StatsDBEntry>('stats', {stat_type: 'created_rewind'})
}