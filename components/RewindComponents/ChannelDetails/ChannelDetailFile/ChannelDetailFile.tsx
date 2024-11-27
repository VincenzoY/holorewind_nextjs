import FakeParagraph from "@/components/RewindComponents/FakeParagraph/FakeParagraph";
import type { Channel } from "@/lib/pocketbase/pocketbase";
import { humanizeSeconds } from "@/lib/utils/utils";

interface ChannelDetailFileProps {
    index: number | undefined
    value: string | undefined
    channelDetails: Channel
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
    channelDetails,
}: ChannelDetailFileProps) {
    const placementBorderColour = getPlacementBorderColour(index)

    return (
        <div className="aspect-[8.5/11] bg-[#f4f6f8] w-[22.4rem] h-[29rem] p-[2.6rem] flex flex-col gap-2">
            <div>
                <div className={`border-2 ${placementBorderColour} border-solid p-1 rounded-sm inline-block float-right ml-2`}>
                    <a href={`https://www.youtube.com/channel/${channelDetails.channel_id}`} target="_blank">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={channelDetails.photo}
                            className="w-20 h-20 line-clamp-3" alt={`Photo for ${channelDetails.name}`}
                        />
                    </a>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-1">{channelDetails.name}</h2>
                    {value && <h4 className="text-sm">{value}</h4>}
                    <h4 className="text-sm">Group: {channelDetails.group}</h4>
                </div>
            </div>
            <div className="grow text-sm">
                <FakeParagraph key={channelDetails.channel_id}/>
            </div>
        </div>
    )
}

