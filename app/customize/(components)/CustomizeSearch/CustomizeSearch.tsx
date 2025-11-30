'use client'

import { PrivacyPolicyFooter } from "@/components/RewindComponents/Drawers/PrivacyPolicyDrawer/PrivacyPolicyDrawer"
import { useVTuberSearchParams } from "../../(hooks)/useVTuberSearchParams"
import { useFilterData } from "../../(hooks)/useFilterData"
import SelectedVTubers from "../SelectedVTubers/SelectedVTubers"
import SearchFields from "../SearchFields/SearchFields"
import SearchResults from "../SearchResults/SearchResults"
import CollapsibleSection from "../CollapsibleSection/CollapsibleSection"
import ShareFilterButton from "../ShareFilterButton/ShareFilterButton"
import CreateRewindButton from "../CreateRewindButton/CreateRewindButton"
import { useQueryClient } from "@tanstack/react-query"
import { Channel, FiltersDBEntry } from "@/lib/pocketbase/pocketbase"

type CustomizeSearchProps = {
  filter: FiltersDBEntry | null
}

const useAddChannelToSelectedChannelData = () => {
  const queryClient = useQueryClient()

  const addChannelToSelectedChannelData = (channel: Channel | Channel[]) => {
    const channels = Array.isArray(channel) ? channel : [channel]

    return queryClient.setQueryData<Record<string, Channel>>(['selectedChannelData'], (channelData) => {
      const newData = {...channelData}
      channels.forEach(ch => {
        newData[ch.channel_id] = ch
      })
      return newData
    })
  }

  return addChannelToSelectedChannelData
}

export default function CustomizeSearch({ filter }: CustomizeSearchProps) {
  const [searchParams, setSearchParams] = useVTuberSearchParams()
  const {selectedChannelIds, includedData, addVTuber, removeVTuber, clearVTubers, setIncludedData, saveFilter} = useFilterData(filter)

  const addChannelToSelectedChannelData = useAddChannelToSelectedChannelData()

  const toggleVTuberSelection = (channel?: Channel) => {
    if (!channel) return

    if (selectedChannelIds.includes(channel.channel_id)) {
      removeVTuber(channel.channel_id)
    } else {
      addChannelToSelectedChannelData(channel)
      addVTuber(channel.channel_id)
    }
  }

  const addVtubers = (channels: Channel[]) => {
    const selectedChannelIdsSet = new Set(selectedChannelIds)
    const newChannels = channels.filter(({channel_id}) => !selectedChannelIdsSet.has(channel_id))

    addChannelToSelectedChannelData(newChannels)
    addVTuber(newChannels.map(channel => channel.channel_id))
  }

  const removeVtubers = (channels: Channel[]) => {
    removeVTuber(channels.map(channel => channel.channel_id))
  }

  return (
    <>
      <div className="w-full flex gap-8 justify-center py-16 lg:py-32">
        <div className="w-[75%] lg:w-[60%] max-w-[64rem] flex flex-col gap-4">
          <h2 className="text-page-white font-bold text-3xl">Customize Filter</h2>
          <CollapsibleSection title={`Video Types`}>
            <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
              <div className="flex gap-2">
                <input type="checkbox" id="all" checked={includedData === "all"} onChange={() => setIncludedData("all")} />
                <label htmlFor="all" className="text-page-white text-md font-bold">YouTube Videos + Music</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="video" checked={includedData === "video"} onChange={() => setIncludedData("video")} />
                <label htmlFor="video" className="text-page-white text-md font-bold">Only YouTube Videos</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="music" checked={includedData === "music"} onChange={() => setIncludedData("music")} />
                <label htmlFor="music" className="text-page-white text-md font-bold">Only YouTube Music</label>
              </div>
            </div>
          </CollapsibleSection>
          <CollapsibleSection title={`Select VTubers (${selectedChannelIds.length} selected)`} defaultOpen={false}>
            <div className="flex flex-col gap-8 items-center">
              <SearchFields searchParams={searchParams} setSearchParams={setSearchParams} />
              <hr className="border-ame-gold border-solid border-1 w-[80%]"/>
              <SearchResults searchParams={searchParams} toggleVTuberSelection={toggleVTuberSelection} selectedChannelIds={selectedChannelIds} addVtubers={addVtubers} removeVtubers={removeVtubers} />
              <hr className="border-ame-gold border-solid border-1 w-[80%]"/>
              <SelectedVTubers selectedChannelIds={selectedChannelIds} toggleVTuberSelection={toggleVTuberSelection} clearVTubers={clearVTubers} />
            </div>
          </CollapsibleSection>
          <div className="flex flex-col gap-4">
            <CreateRewindButton saveFilter={saveFilter} />
            <ShareFilterButton saveFilter={saveFilter} />
          </div>
        </div>
      </div>
      <PrivacyPolicyFooter />
    </>
  )
}
