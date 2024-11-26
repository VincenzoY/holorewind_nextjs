import { DecoratedChannelData, DecoratedVideoWithChannelData } from "../fetchRecords/fetchRecords"
import { Channel, VideoWithChannel } from "../pocketbase/pocketbase"
import { type HeapInfo, type AccumulatorInfo, nLargestObjects, reduce } from "./utils"

export interface RewindDataType {
    year: number,
    specificVideoData: Record<string, Array<RewindDataItem<{video: VideoWithChannel}>>>,
    specificChannelData: Record<string, Array<RewindDataItem<{channel: Channel}>>>,
    accumulatedVideoData: Record<string, any>,
    accumulatedChannelData: Record<string, any>,
}

export type RewindDataItem<T> = T & {
    key: number
}

interface GenerateRewindParamsType {
    videoData: Record<string, DecoratedVideoWithChannelData>
    channelData: Record<string, DecoratedChannelData>
}

export async function generateRewind({videoData, channelData}: GenerateRewindParamsType, year: number): Promise<RewindDataType> {
    const videoFilters: Record<string, HeapInfo<DecoratedVideoWithChannelData>> = {
        "totalWatchTime": {
            "n": 15,
            "type": "largest",
            "lambda": ({video, watchHistory}) => ({key: watchHistory.totalWatchTime, video: video})
        },
        "views": {
            "n": 15,
            "type": "largest",
            "lambda": ({video, watchHistory}) => ({key: watchHistory.watchHistory.length, video: video})
        },
    }

    const videoAccumulationFilters: Record<string, AccumulatorInfo<DecoratedVideoWithChannelData, any>> = {
        "totalViews": {
            "initialValue": 0,
            "reducer": (item, acc) => acc + item.watchHistory.watchHistory.length
        },
        "uniqueViews": {
            "initialValue": 0,
            "reducer": (_, acc) => acc + 1
        },
        "totalWatchTime": {
            "initialValue": 0,
            "reducer": (item, acc) => acc + item.watchHistory.totalWatchTime
        },
        "earliestVideo": {
            "initialValue": undefined,
            "reducer": ({video, watchHistory}, acc: {video: VideoWithChannel, earliestView: string}) => {
                const videoWatchHistory = watchHistory.watchHistory

                const formattedReturn = {
                    video: video, 
                    earliestView: videoWatchHistory[videoWatchHistory.length - 1][0]
                }

                if (!acc) return formattedReturn

                if (Date.parse(formattedReturn.earliestView) > Date.parse(acc.earliestView)) return acc

                return formattedReturn
            }
        },
        "viewsByMonth": {
            "initialValue": Array(12).fill(0),
            "reducer": (item, acc) => {
                for(const [start, _] of item.watchHistory.watchHistory) {
                    const monthIndex = (new Date(start)).getUTCMonth()
                    acc[monthIndex] += 1
                }

                return acc
            }
        },
    }

    const channelFilters: Record<string, HeapInfo<DecoratedChannelData>> = {
        "totalWatchTime": {
            "n": 15,
            "type": "largest",
            "lambda": ({channel, watchHistory}) => ({key: watchHistory.totalWatchTime, channel: channel})
        },
        "views": {
            "n": 15,
            "type": "largest",
            "lambda": ({channel, watchHistory}) => ({key: watchHistory.views, channel: channel})
        },
        "uniqueViews": {
            "n": 15,
            "type": "largest",
            "lambda": ({channel, watchHistory}) => ({key: watchHistory.uniqueViews, channel: channel})
        },
    }

    const channelAccumulationFilters: Record<string, AccumulatorInfo<DecoratedChannelData, number>> = {
        "channelCount": {
            "initialValue": 0,
            "reducer": (item, acc) => acc + 1
        }
    }

    const specificVideoData = nLargestObjects(videoData, videoFilters)
    const specificChannelData = nLargestObjects(channelData, channelFilters)
    const accumulatedVideoData = reduce(videoData, videoAccumulationFilters)
    const accumulatedChannelData = reduce(channelData, channelAccumulationFilters)

    return {
        year,
        specificVideoData: specificVideoData,
        specificChannelData: specificChannelData,
        accumulatedVideoData: accumulatedVideoData,
        accumulatedChannelData: accumulatedChannelData,
    }
}
