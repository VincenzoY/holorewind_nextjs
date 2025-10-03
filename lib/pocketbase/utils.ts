import pb, { Channel, RewindDBEntry, StatsDBEntry, Video, VideoDBEntry, ChannelDBEntry } from "./pocketbase"


export async function fetchVideoByVideoIds(videoIds: Array<string>): Promise<Record<string, Video>> {
    const videos: Record<string, Video> = {}

    const videoDBRecords = await pb.fetchRecordsFromCollectionByCustomField<VideoDBEntry>(
        "videos",
        "video_id",
        videoIds
    )

    videoDBRecords.forEach((videoDBRecord) => {
        const {id, collectionName, collectionId, updated, created, ...video} = videoDBRecord
        videos[video.video_id] = video
    })

    return videos
}

export async function fetchChannelByChannelIds(channelIds: Array<string>): Promise<Record<string, Channel>> {
    const channels: Record<string, Channel> = {}

    const channelDBRecords = await pb.fetchRecordsFromCollectionByCustomField<ChannelDBEntry>(
        "channels",
        "channel_id",
        channelIds
    )

    channelDBRecords.forEach((channelDBRecord) => {
        const {id, collectionName, collectionId, updated, created, ...channel} = channelDBRecord
        channels[channel.channel_id] = channel
    })

    return channels
}

export async function createRewind(rewind: object): Promise<RewindDBEntry> {
    return await pb.createRecordInCollection<RewindDBEntry>('rewinds', {rewind})
}

export function getRewindPhotoUrl(record: RewindDBEntry, filename: string) {
    return pb.basePocketBase.files.getUrl(record, filename)
}

export async function createRewindCreationStat(): Promise<StatsDBEntry> {
    return await pb.createRecordInCollection<StatsDBEntry>('stats', {stat_type: 'created_rewind'})
}