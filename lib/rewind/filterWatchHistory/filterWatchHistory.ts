import { Channel, FiltersDBEntry } from "@/lib/pocketbase/pocketbase"
import pb from "@/lib/pocketbase/pocketbase"
import { WatchHistoryWithDataType } from "../fetchRecords/fetchRecords"
import { WatchHistoryEntry } from "../formatWatchHistory/formatWatchHistory"

export interface RewindFilterDataType {
  includedData: "all" | "music" | "video"
  channelIds: string[]
  orgs: string[]
}

export type ExistingRewindFilterID = string

export type RewindFilterType = ExistingRewindFilterID | RewindFilterDataType

const DEFAULT_REWIND_FILTER: RewindFilterType = "ndhdtwy00bp44b9"

const isExistingRewindFilter = (filter: RewindFilterType): filter is ExistingRewindFilterID => {
  return typeof(filter) === "string"
}

const getFilterDataFromExistingFilter = async (filterId: ExistingRewindFilterID) => {
  const filterRecord = await pb.fetchRecordFromCollectionById<FiltersDBEntry>("filters", filterId)

  return filterRecord.filter_data
}

export const getTypeFilterFunction = async (filter: RewindFilterType = DEFAULT_REWIND_FILTER) => {
  const rewindFilterData = isExistingRewindFilter(filter) ? await getFilterDataFromExistingFilter(filter) : filter;

  const { includedData } = rewindFilterData

  const typeFilterFunction = (type: WatchHistoryEntry["header"]) => {
    return !(
      (includedData === "music" && type === "YouTube") || 
      (includedData === "video" && type === "YouTube Music")
    )
  }

  return typeFilterFunction
}

const getChannelFilterFunction = async (filter: RewindFilterType = DEFAULT_REWIND_FILTER) => {
  const rewindFilterData = isExistingRewindFilter(filter) ? await getFilterDataFromExistingFilter(filter) : filter;

  const { channelIds, orgs } = rewindFilterData

  const allowedChannelIdsSet = new Set(channelIds)
  const allowedChannelOrgsSet = new Set(orgs)

  const channelFilterFunction = (channel: Channel) => {
    return allowedChannelIdsSet.has(channel.channel_id) || allowedChannelOrgsSet.has(channel.org)
  }

  return channelFilterFunction
}

export const filterWatchHistory = async (watchHistory: WatchHistoryWithDataType, filter?: RewindFilterType) => {
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