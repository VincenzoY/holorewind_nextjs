import FakeParagraph from "@/components/RewindComponents/FakeParagraph/FakeParagraph";
import { fetchChannelByChannelIds } from "@/lib/pocketbase/utils";
import { useQuery } from "@tanstack/react-query";

interface ChannelDetailFileProps {
    index: number | undefined
    value: string | undefined
    channelId: string
}

const getPlacementBorderColour = (index: number | undefined) => {
    if(index === 0) { return "border-[#ffd700]" }
    else if (index === 1) { return "border-[#C0C0C0]" }
    else if (index === 2) { return "border-[#CD7F32]" }
    else { return "border-[#111827]" }
}

export default function ChannelDetailFile({
    index = undefined, 
    value = undefined,
    channelId,
}: ChannelDetailFileProps) {
    const placementBorderColour = getPlacementBorderColour(index)

    const { data: channel } = useQuery({
        queryKey: ['fetchChannel', channelId],
        queryFn: async () => (await fetchChannelByChannelIds([channelId]))[channelId],
    })

    if (!channel) return

    return (
        <div className="aspect-[8.5/11] bg-[#f4f6f8] w-[22.4rem] h-[29rem] p-[2.6rem] flex flex-col gap-2 rounded-sm">
            <div>
                <div className={`border-2 ${placementBorderColour} border-solid p-1 rounded-sm inline-block float-right ml-2`}>
                    <a href={`https://www.youtube.com/channel/${channel.channel_id}`} target="_blank">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={`https://holodex.net/statics/channelImg/${channel.channel_id}/200.png`}
                            className="w-20 h-20 line-clamp-3" alt={`Photo for ${channel.name}`}
                        />
                    </a>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-1">{channel.name}</h2>
                    {value && <h4 className="text-sm">{value}</h4>}
                    <h4 className="text-sm">Group: {channel.group}</h4>
                </div>
            </div>
            <div className="grow text-sm">
                <FakeParagraph key={channel.channel_id}/>
            </div>
        </div>
    )
}

