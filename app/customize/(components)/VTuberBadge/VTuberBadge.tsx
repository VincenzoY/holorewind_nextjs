import Shimmer from "@/components/GenericComponents/Shimmer/Shimmer"
import { Channel } from "@/lib/pocketbase/pocketbase"
import { fetchChannelByChannelIds } from "@/lib/pocketbase/utils"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

interface VTuberBadgeProps {
    channelId: string
    selected?: boolean
}

const VTuberBadge: React.FC<VTuberBadgeProps> = ({channelId}) => {
    const { data: channel } = useQuery({
        queryKey: ['fetchChannel', channelId],
        queryFn: async () => (await fetchChannelByChannelIds([channelId]))[channelId],
    })

    const [selected, setSelected] = useState(false)

    const selectedClassNames = selected ? 
        "border-ame-gold bg-opacity-80" : 
        "border-slate-100 bg-opacity-40"

    return (
        <div 
            className={`
                flex gap-2 items-center
                bg-slate-100 border-4 border-solid 
                select-none
                ${selectedClassNames}
                hover:bg-slate-200 hover:bg-opacity-60
                active:bg-slate-400 active:scale-95
                transition-all duration-300
                p-2 rounded-lg
            `}
            onClick={() => setSelected(!selected)}
        >
            <ChannelImage channel={channel}/>
            <ChannelName channel={channel}/>
        </div>
    )
}

const ChannelImage = ({ channel }: {channel?: Channel}) => {
    const sharedClassNames = "w-12 h-12 rounded-sm flex-none"

    if (!channel) {
        return <div className={sharedClassNames}><Shimmer /></div>
    }

    return (
        <img src={channel.photo} className={`${sharedClassNames} line-clamp-1`} alt={`Photo for ${channel?.name}`}/>
    )
}

const ChannelName = ({ channel }: {channel?: Channel}) => {
    return (
        <div className="w-40">
            {channel ? 
            <h3 className="text-md font-bold">{channel.name}</h3> :
            <ShimmerText />}
        </div>
    )
}

const ShimmerText = () => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="h-4 w-full"><Shimmer /></div>
            <div className="h-4 w-[60%]"><Shimmer /></div>
        </div>
    )
}

export default VTuberBadge