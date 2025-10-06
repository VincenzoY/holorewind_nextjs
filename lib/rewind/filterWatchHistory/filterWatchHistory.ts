import { Channel, FiltersDBEntry } from "@/lib/pocketbase/pocketbase"
import pb from "@/lib/pocketbase/pocketbase"
import { WatchHistoryWithDataType } from "../fetchRecords/fetchRecords"
import { WatchHistoryEntry } from "../formatWatchHistory/formatWatchHistory"

export interface RewindFilterDataType {
  includedData: "all" | "music" | "video"
  channelIds: string[]
  orgs: string[]
}

export type RewindFilterID = string

const DEFAULT_REWIND_FILTER: RewindFilterID = "ndhdtwy00bp44b9"

const getFilterDataFromExistingFilter = async (filterId: RewindFilterID) => {
  const filterRecord = await pb.fetchRecordFromCollectionById<FiltersDBEntry>("filters", filterId)

  return filterRecord.filter_data
}

export const getTypeFilterFunction = async (filter: RewindFilterID = DEFAULT_REWIND_FILTER) => {
  const rewindFilterData = await getFilterDataFromExistingFilter(filter)

  const { includedData } = rewindFilterData

  const typeFilterFunction = (type: WatchHistoryEntry["header"]) => {
    return !(
      (includedData === "music" && type === "YouTube") || 
      (includedData === "video" && type === "YouTube Music")
    )
  }

  return typeFilterFunction
}

const getChannelFilterFunction = async (filter: RewindFilterID = DEFAULT_REWIND_FILTER) => {
  const rewindFilterData = await getFilterDataFromExistingFilter(filter)

  const { channelIds, orgs } = rewindFilterData

  const allowedChannelIdsSet = new Set(channelIds)
  const allowedChannelOrgsSet = new Set(orgs)

  const channelFilterFunction = (channel: Channel) => {
    return allowedChannelIdsSet.has(channel.channel_id) || allowedChannelOrgsSet.has(channel.org)
  }

  return channelFilterFunction
}

export const filterWatchHistory = async (watchHistory: WatchHistoryWithDataType, filter?: RewindFilterID) => {
  const { videoData, channelData } = watchHistory

  const channelFilterFunction = await getChannelFilterFunction(filter)

  const filteredChannelData = Object.keys(channelData).reduce<WatchHistoryWithDataType["channelData"]>((filtered, key) => {
    const { channel } = channelData[key]

    if(channelFilterFunction(channel)) filtered[key] = channelData[key]

    return filtered;
  }, {});

  const filteredVideoData = Object.keys(videoData).reduce<WatchHistoryWithDataType["videoData"]>((filtered, key) => {
    const { video } = videoData[key]

    if(filteredChannelData[video.channel_id]) filtered[key] = videoData[key]

    return filtered;
  }, {});

  return { videoData: filteredVideoData, channelData: filteredChannelData }
}