import { DecoratedChannelData, DecoratedVideoData } from "../watchHistory/fetchRecords/fetchRecords"
import { VideoWithChannel } from "../pocketbase/pocketbase"
import { type HeapInfo, type AccumulatorInfo, nLargestObjects, reduce } from "./utils"

export type RewindDataType = Record<string, any>
interface GenerateRewindParamsType {
    videoData: Record<string, DecoratedVideoData>
    channelData: Record<string, DecoratedChannelData>
}

export interface RewindDataItem {
    key: any
    [data: string]: any
}

export async function generateRewind({videoData, channelData}: GenerateRewindParamsType, year: number): Promise<RewindDataType> {
    const videoFilters: Record<string, HeapInfo<DecoratedVideoData>> = {
        "video_watch_time": {
            "n": 15,
            "type": "largest",
            "lambda": ({video, watchHistory}) => ({key: watchHistory.totalWatchTime, video_id: video.video_id})
        },
        "video_views": {
            "n": 15,
            "type": "largest",
            "lambda": ({video, watchHistory}) => ({key: watchHistory.watchHistory.length, video_id: video.video_id})
        },
    }

    const videoAccumulationFilters: Record<string, AccumulatorInfo<DecoratedVideoData, any>> = {
        "total_view_count": {
            "initialValue": 0,
            "reducer": (item, acc) => acc + item.watchHistory.watchHistory.length
        },
        "total_unique_videos_viewed": {
            "initialValue": 0,
            "reducer": (_, acc) => acc + 1
        },
        "total_video_watch_time": {
            "initialValue": 0,
            "reducer": (item, acc) => acc + item.watchHistory.totalWatchTime
        },
        "earliest_video": {
            "initialValue": undefined,
            "reducer": ({video, watchHistory}, acc: {video_id: string, earliest_view: string}) => {
                const videoWatchHistory = watchHistory.watchHistory

                const formattedReturn = {
                    video_id: video.video_id, 
                    earliest_view: videoWatchHistory[videoWatchHistory.length - 1][0]
                }

                if (!acc) return formattedReturn

                if (Date.parse(formattedReturn.earliest_view) > Date.parse(acc.earliest_view)) return acc

                return formattedReturn
            }
        },
        "views_by_month": {
            "initialValue": Array(12).fill(0),
            "reducer": (item, acc) => {
                for(const [start, _] of item.watchHistory.watchHistory) {
                    const monthIndex = (new Date(start)).getMonth()
                    acc[monthIndex] += 1
                }

                return acc
            }
        },
    }

    const channelFilters: Record<string, HeapInfo<DecoratedChannelData>> = {
        "channel_watch_time": {
            "n": 15,
            "type": "largest",
            "lambda": ({channel, watchHistory}) => ({key: watchHistory.totalWatchTime, channel_id: channel.channel_id})
        },
        "channel_views": {
            "n": 15,
            "type": "largest",
            "lambda": ({channel, watchHistory}) => ({key: watchHistory.views, channel_id: channel.channel_id})
        },
        "channel_unique_views": {
            "n": 15,
            "type": "largest",
            "lambda": ({channel, watchHistory}) => ({key: watchHistory.uniqueViews, channel_id: channel.channel_id})
        },
    }

    const channelAccumulationFilters: Record<string, AccumulatorInfo<DecoratedChannelData, number>> = {
        "total_channel_count": {
            "initialValue": 0,
            "reducer": (_, acc) => acc + 1
        }
    }

    const specificVideoData = nLargestObjects(videoData, videoFilters)
    const specificChannelData = nLargestObjects(channelData, channelFilters)
    const accumulatedVideoData = reduce(videoData, videoAccumulationFilters)
    const accumulatedChannelData = reduce(channelData, channelAccumulationFilters)

    return {
        year,
        ...specificVideoData,
        ...specificChannelData,
        ...accumulatedVideoData,
        ...accumulatedChannelData,
    }
}
