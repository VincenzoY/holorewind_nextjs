import type { Video, Channel, VideoWithChannel } from "@/lib/pocketbase/pocketbase"
import { fetchAllRecordsInCollection } from "@/lib/pocketbase/pocketbase"
import { FormattedWatchHistory } from "../formatWatchHistory/formatWatchHistory"
import { fetchChannelByChannelIds, fetchVideosByVideoIdsInParallel } from "../../pocketbase/utils"

export interface VideoWatchHistory {
    watchHistory: Array<[string, string]>,
    totalWatchTime: number
}

export interface DecoratedVideoData {
    video: Video
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
    const tempChannelWatchData: Record<string, ChannelWatchHistory> = {}
    const decoratedVideoData: Record<string, DecoratedVideoData> = {}
    const decoratedChannelData: Record<string, DecoratedChannelData> = {}

    const videos = await fetchVideosByVideoIdsInParallel(videoIds)

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
            totalWatchTime += Math.max(
                Math.min(
                    Math.floor(Math.abs((endDate.valueOf() - startDate.valueOf()) / 1000)),
                    duration - timeAlreadyPassed,
                ),
                0
            )
        }

        decoratedVideoData[videoId] = {
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

    return {videoData: decoratedVideoData, channelData: decoratedChannelData}
}
