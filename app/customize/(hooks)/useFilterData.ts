import pb, { FiltersDBEntry } from "@/lib/pocketbase/pocketbase"
import { RewindFilterDataType } from "@/lib/rewind/filterWatchHistory/filterWatchHistory"
import { useState } from "react"

interface UseFilterDataReturn {
  selectedChannelIds: Array<string>,
  includedData: RewindFilterDataType["includedData"],
  addVTuber: (channelID: string | string[]) => void,
  removeVTuber: (channelID: string | string[]) => void,
  clearVTubers: () => void,
  setIncludedData: (includedData: RewindFilterDataType["includedData"]) => void,
  saveFilter: () => Promise<string>
}

export const useFilterData = (initialFilter: FiltersDBEntry | null): UseFilterDataReturn => {

  const initialFilterData = initialFilter?.filter_data

  const [includedData, setIncludedDataState] = useState<RewindFilterDataType["includedData"]>(initialFilterData?.includedData || "all")
  const [channelIds, setChannelIds] = useState<RewindFilterDataType["channelIds"]>(initialFilterData?.channelIds || [])
  const [filterId, setFilterId] = useState(initialFilter?.id)

  const addVTuber = (channelID: string | string[]) => {
    const idsToAdd = Array.isArray(channelID) ? channelID : [channelID]
    setChannelIds([...idsToAdd, ...channelIds])
    setFilterId(undefined)
  }
  const removeVTuber = (channelID: string | string[]) => {
    const idsToRemove = new Set(Array.isArray(channelID) ? channelID : [channelID])
    setChannelIds(channelIds.filter(id => !idsToRemove.has(id)))
    setFilterId(undefined)
  }
  const clearVTubers = () => {
    setChannelIds([])
    setFilterId(undefined)
  }

  const setIncludedData = (value: UseFilterDataReturn['includedData']) => {
    setIncludedDataState(value)
    setFilterId(undefined)
  }

  const saveFilter = async () => {
    if (filterId) return filterId

    const filterRecord = await pb.createRecordInCollection<FiltersDBEntry>("filters", {
      filter_data: {
        includedData,
        orgs: [],
        channelIds,
      }
    })

    return filterRecord.id
  }

  return {
    selectedChannelIds: channelIds, 
    includedData, 
    addVTuber, 
    removeVTuber, 
    clearVTubers, 
    setIncludedData,
    saveFilter
  }
}
