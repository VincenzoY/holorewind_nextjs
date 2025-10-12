'use client'

import TextLink from "@/components/GenericComponents/Link/Link"
import VTuberBadge from "../VTuberBadge/VTuberBadge"
import { useQuery } from "@tanstack/react-query"
import { fetchChannelByChannelIds } from "@/lib/pocketbase/utils"
import { Channel } from "@/lib/pocketbase/pocketbase"

type SelectedVTubersProps = {
  selectedChannelIds: Array<string>
  toggleVTuberSelection: (channel?: Channel) => void
  clearVTubers: () => void
}

export default function SelectedVTubers({ selectedChannelIds, toggleVTuberSelection, clearVTubers }: SelectedVTubersProps) {
  const { data: selectedChannelData } = useQuery({
    queryKey: ['selectedChannelData'],
    queryFn: () => fetchChannelByChannelIds(selectedChannelIds),
    staleTime: Infinity
  })

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="flex flex-col gap-2 items-center">
        <b className="text-page-white text-center text-2xl">
          Selected VTubers ({selectedChannelIds.length})
        </b>
        {selectedChannelIds.length > 0 && <TextLink
          onClick={clearVTubers}
          className="text-page-white"
        >
          Clear Selected
        </TextLink>}
      </div>

      {selectedChannelIds.length === 0 ? (
        <p className="text-page-white text-center text-lg opacity-50">there&apos;s nothing here yet...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {selectedChannelIds.map((channelId) => {
            const channel = selectedChannelData?.[channelId]
            return (
              <VTuberBadge
                key={channelId}
                channel={channel}
                selected
                onClick={() => toggleVTuberSelection(channel)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
