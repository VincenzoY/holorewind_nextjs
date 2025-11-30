'use client'

import TextLink from "@/components/GenericComponents/Link/Link"
import VTuberBadge from "../VTuberBadge/VTuberBadge"
import { useQuery } from "@tanstack/react-query"
import { searchChannels } from "@/lib/pocketbase/utils"
import { Channel } from "@/lib/pocketbase/pocketbase"
import { useEffect, useState } from "react"
import { useVTuberSearchParams } from "../../(hooks)/useVTuberSearchParams"

type SearchResultsProps = {
  searchParams: ReturnType<typeof useVTuberSearchParams>[0]
  toggleVTuberSelection: (channel?: Channel) => void
  selectedChannelIds: Array<string>
  addVtubers: (channels: Channel[]) => void
  removeVtubers: (channels: Channel[]) => void
}

export default function SearchResults({ searchParams, toggleVTuberSelection, selectedChannelIds, addVtubers, removeVtubers}: SearchResultsProps) {
  const enableSearch = searchParams.vtuber.length + searchParams.org.length + searchParams.group.length > 3

  const [page, setPage] = useState(1)
  useEffect(() => setPage(1), [searchParams])

  const { data: channels, isLoading } = useQuery({
    queryKey: ['searchChannels', searchParams, page],
    queryFn: async () => await searchChannels(page, searchParams.vtuber, searchParams.org, searchParams.group),
    enabled: enableSearch,
    staleTime: Infinity
  })

  if (!enableSearch) return <p className="text-page-white opacity-50 text-center text-lg">Waiting for input...</p>

  if (isLoading) return <p className="text-page-white text-center text-lg">Loading...</p>

  if (!channels || channels.totalItems === 0) return <p className="text-page-white text-center text-lg">No matching channels</p>

  const incrementPage = () => page < channels.totalPages && setPage(page + 1)
  const decrementPage = () => page > 1 && setPage(page - 1)

  const selectAll = () => addVtubers(channels.items)
  const deselectAll = () => removeVtubers(channels.items)

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="flex w-full justify-between">
        <TextLink onClick={deselectAll} className="text-page-white">Deselect All</TextLink>
        <div className="flex gap-4">
          <TextLink onClick={decrementPage} className="text-page-white">{"<"}</TextLink>
          <p className="text-page-white text-center text-lg">{channels.page} / {channels.totalPages}</p>
          <TextLink onClick={incrementPage} className="text-page-white">{">"}</TextLink>
        </div>
        <TextLink onClick={selectAll} className="text-page-white">Select All</TextLink>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {channels?.["items"].map((channel) => (
          <VTuberBadge
            key={channel.channel_id}
            channel={channel}
            onClick={toggleVTuberSelection}
            selected={selectedChannelIds.includes(channel.channel_id)}
          />
        ))}
      </div>
    </div>
  )
}
