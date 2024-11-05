import type { Video, Channel, VideoWithChannel } from "@/lib/pocketbase/pocketbase"
import { fetchAllRecordsInCollection } from "@/lib/pocketbase/pocketbase"
import { FormattedWatchHistory } from "../watch_history/watch_history"
import { fetchChannelByChannelIds, fetchVideoByVideoIds } from "../pocketbase/utils"

export interface VideoWatchHistory {
    watchHistory: Array<[string, string]>,
    totalWatchTime: number
}

export interface DecoratedVideoData {
    video: Video
    watchHistory: VideoWatchHistory
}

export interface DecoratedVideoWithChannelData {
    video: VideoWithChannel
    watchHistory: VideoWatchHistory
}

interface ChannelWatchHistory {
    uniqueViews: number, 
    views: number, 
    totalWatchTime: number
}

export interface DecoratedChannelData {
    channel: Channel
    watchHistory: ChannelWatchHistory
}

export async function fetchRecords(formattedWatchHistory: FormattedWatchHistory) {
    const videoIds = Object.keys(formattedWatchHistory)
    const tempVideoData: Record<string, DecoratedVideoData> = {}
    const tempChannelWatchData: Record<string, ChannelWatchHistory> = {}
    const decoratedVideoWithChannelData: Record<string, DecoratedVideoWithChannelData> = {}
    const decoratedChannelData: Record<string, DecoratedChannelData> = {}

    const allChannelIdsSet = new Set((await fetchAllRecordsInCollection<{ channel_id: string }>("channels", {fields: 'channel_id'})).map((object) => object.channel_id))

    const filteredVideoIds = videoIds.filter((videoId) => {
        const videoChannelId = formattedWatchHistory[videoId]["channelId"]

        if (videoChannelId && !allChannelIdsSet.has(videoChannelId)) return false

        return true
    })

    const videos = await fetchVideoByVideoIds(filteredVideoIds)

    for(const videoId in videos) {
        const video = videos[videoId]
        const channelId = video.channel_id
        const videoWatchHistory = formattedWatchHistory[videoId].watchHistory

        const duration = video.duration
        let totalWatchTime = 0
        for(const [start, end] of videoWatchHistory) {
            const startDate = new Date(start)
            const endDate = new Date(end)
            const releaseDate = new Date(video.available_at)
            const finishDate = new Date(
                new Date(releaseDate.valueOf() + (duration * 1000))
            )
            const timeAlreadyPassed = (
                startDate < finishDate ? 
                Math.floor(Math.abs((startDate.valueOf() - releaseDate.valueOf()) / 1000)): 
                0
            )
            totalWatchTime += Math.min(
                Math.floor(Math.abs((endDate.valueOf() - startDate.valueOf()) / 1000)),
                duration - timeAlreadyPassed,
            )
        }

        tempVideoData[videoId] = {
            video: video,
            watchHistory: {
                watchHistory: videoWatchHistory,
                totalWatchTime: totalWatchTime,
            }
        }

        tempChannelWatchData[channelId] ||= {
            uniqueViews: 0,
            views: 0,
            totalWatchTime: 0
        }

        tempChannelWatchData[channelId].uniqueViews += 1
        tempChannelWatchData[channelId].views += videoWatchHistory.length
        tempChannelWatchData[channelId].totalWatchTime += totalWatchTime
    }

    const channels = await fetchChannelByChannelIds(Object.keys(tempChannelWatchData))

    for (const channelId in channels) {
        const channel = channels[channelId]

        decoratedChannelData[channelId] = {
            channel: channel,
            watchHistory: tempChannelWatchData[channelId]
        }
    }

    for (const videoId in tempVideoData) {
        const { video, watchHistory } = tempVideoData[videoId]

        decoratedVideoWithChannelData[videoId] = {
            video: {
                ...video,
                channel: channels[video.channel_id]
            },
            watchHistory: watchHistory
        }
    }

    return {videoData: decoratedVideoWithChannelData, channelData: decoratedChannelData}
}
