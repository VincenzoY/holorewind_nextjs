"use client"

import FakeParagraph from "@/components/RewindComponents/FakeParagraph/FakeParagraph";
import { fetchChannelByChannelIds, fetchVideoByVideoIds } from "@/lib/pocketbase/utils";
import { humanizeSeconds } from "@/lib/utils/utils";
import { useQuery } from "@tanstack/react-query";

interface VideoDetailFileProps {
    index?: number
    value?: string
    videoId: string
}

const getPlacementBorderColour = (index: number | undefined) => {
    if(index === 0) { return "border-[#ffd700]" }
    else if (index === 1) { return "border-[#C0C0C0]" }
    else if (index === 2) { return "border-[#CD7F32]" }
    else { return "border-[#111827]" }
}

export default function VideoDetailFile({
    index = undefined, 
    value = undefined,
    videoId,
}: VideoDetailFileProps) {
    const placementBorderColour = getPlacementBorderColour(index)

    const { data: video } = useQuery({ 
        queryKey: ['fetchVideo', videoId], 
        queryFn: async () => (await fetchVideoByVideoIds([videoId]))[videoId]
    })

    const { data: channel } = useQuery({
        queryKey: ['fetchChannel', video?.channel_id],
        queryFn: async () => video ? (await fetchChannelByChannelIds([video?.channel_id]))[video?.channel_id] : undefined,
        // The query will not execute until the userId exists
        enabled: !!video,
    })

    if (!video || !channel) return


    return (
        <div className="aspect-[8.5/11] bg-page-white w-[22.4rem] h-[29rem] p-[2.6rem] flex flex-col gap-2">
            <div>
                <div className={`border-2 ${placementBorderColour} border-solid p-1 rounded-sm inline-block float-right ml-2`}>
                    <a href={`https://www.youtube.com/channel/${channel.channel_id}`} target="_blank">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={`https://holodex.net/statics/channelImg/${channel.channel_id}/100.png`}
                            className="w-20 h-20 line-clamp-3" alt={`Photo for ${channel.name}`}
                        />
                    </a>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-1 line-clamp-3">{video.title}</h2>
                    {value && <h4 className="text-sm">{value}</h4>}
                    <h4 className="text-sm">Channel: {channel.name}</h4>
                    <h4 className="text-sm">Video Release Date: {new Date(video.available_at).toLocaleDateString('en-GB')}</h4>
                    <h4 className="text-sm">Video Duration: {humanizeSeconds(video.duration)}</h4>
                </div>
            </div>
            <div className="grow text-sm">
                <FakeParagraph />
            </div>
            <div >
                <a href={`https://www.youtube.com/watch?v=${video.video_id}`} target="_blank">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={`https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`}
                        className="" alt={`Thumbnail for ${video.title}`}
                    />
                </a>
            </div>
        </div>
    )
}
