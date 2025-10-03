import { FiltersDBEntry } from "@/lib/pocketbase/pocketbase"
import pb from "@/lib/pocketbase/pocketbase"

export interface RewindFilterDataType {
  includedData: "all" | "music" | "video"
  channelIds: string[]
}

export type ExistingRewindFilterID = string

export type RewindFilterType = ExistingRewindFilterID | RewindFilterDataType

type RewindFilterFunctionType = (channel: string | undefined, type: "YouTube" | "YouTube Music") => boolean

const isExistingRewindFilter = (filter: RewindFilterType): filter is ExistingRewindFilterID => {
  return typeof(filter) === "string"
}

const getFilterDataFromExistingFilter = async (filterId: ExistingRewindFilterID) => {
  const filterRecord = await pb.fetchRecordFromCollectionById<FiltersDBEntry>("filters", filterId)

  return filterRecord.filter_data
}

export const getRewindFilterFunction = async (filter: RewindFilterType): Promise<RewindFilterFunctionType> => {
  const rewindFilterData = isExistingRewindFilter(filter) ? await getFilterDataFromExistingFilter(filter) : filter;

  const { channelIds: allowedChannelIds, includedData } = rewindFilterData

  const allowedChannelIdsSet = new Set(allowedChannelIds)

  const filterFunction: RewindFilterFunctionType = (channelId, type) => {
    //if (channelId === undefined) return false

    const shouldNotIncludeVideoType = (includedData === "music" && type === "YouTube") || (includedData === "video" && type === "YouTube Music")

    if (shouldNotIncludeVideoType) return false

    // TODO: bypass for now while implementing filtering
    return true // allowedChannelIdsSet.has(channelId)
  }

  return filterFunction
}