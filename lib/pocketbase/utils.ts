import pb, { Channel, PAGE_SIZE, Rewind, RewindDBEntry, Video, createRecordInCollection } from "./pocketbase"


export async function fetchVideoByVideoIds(videoIds: Array<string>): Promise<Record<string, Video>> {
    const videos: Record<string, Video> = {}
    
    let pageNum = 0
    let page = videoIds.slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
    for(; 
        page.length > 0; 
        pageNum += 1, page = videoIds.slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
    ) {
        const videoDBRecords = (await pb.collection("videos").getList(1, PAGE_SIZE, {
            filter: page.map((id) => `video_id="${id}"`).join("||")
        }))["items"]

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
            filter: page.map((id) => `channel_id="${id}"`).join("||")
        }))["items"]

        channelDBRecords.forEach((channelDBRecord) => {
            const {id, collectionName, collectionId, updated, created, ...channel} = channelDBRecord
            channels[channel.channel_id] = channel
        })
    }

    return channels
}

export async function createRewind(
    rewind: object,
    dataUrl: string
): Promise<RewindDBEntry> {
    const formData = new FormData();

    const photoBlob = await fetch(dataUrl).then(res => res.blob())
    formData.append('photo', photoBlob, 'holorewind.png')
    formData.append('rewind', JSON.stringify(rewind))

    return await createRecordInCollection<RewindDBEntry>('rewinds', formData)
}

export function getRewindPhotoUrl(record: RewindDBEntry, filename: string) {
    return pb.files.getUrl(record, filename)
}