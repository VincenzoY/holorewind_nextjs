import { FiltersDBEntry } from "@/lib/pocketbase/pocketbase"
import { RewindFilterDataType } from "@/lib/rewind/filterWatchHistory/filterWatchHistory"
import { useState } from "react"
import { toast } from "react-toastify"

interface UseFilterDataReturn {
  selectedChannelIds: Array<string>,
  includedData: RewindFilterDataType["included_data"],
  addVTuber: (channelID: string | string[]) => void,
  removeVTuber: (channelID: string | string[]) => void,
  clearVTubers: () => void,
  setIncludedData: (includedData: RewindFilterDataType["included_data"]) => void,
  saveFilter: () => Promise<string>
}

export const useFilterData = (initialFilter: FiltersDBEntry | null): UseFilterDataReturn => {

  const initialFilterData = initialFilter?.filter_data

  const [includedData, setIncludedDataState] = useState<RewindFilterDataType["included_data"]>(initialFilterData?.included_data || "all")
  const [channelIds, setChannelIds] = useState<RewindFilterDataType["channel_ids"]>(initialFilterData?.channel_ids || [])
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

    const response = await fetch('/api/filters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channelIds,
        includedData,
      }),
    })

    if (!response.ok) {
      const data = await response.json()
      const errorMessage = data.error || 'Failed to save filter'
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    const data = await response.json()
    setFilterId(data.id)
    toast.success('Filter saved successfully')

    return data.id
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
