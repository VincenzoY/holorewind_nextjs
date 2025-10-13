import Shimmer from "@/components/GenericComponents/Shimmer/Shimmer"
import { Channel } from "@/lib/pocketbase/pocketbase"

interface VTuberBadgeProps {
    channel?: Channel
    selected?: boolean
    onClick?: (channel?: Channel) => void
}

const VTuberBadge: React.FC<VTuberBadgeProps> = ({channel, selected, onClick}) => {
    const selectedClassNames = selected ? 
        "border-ame-gold bg-opacity-80" : 
        "border-gray-500 bg-opacity-40"

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
            onClick={() => onClick?.(channel)}
        >
            <ChannelImage channel={channel}/>
            <div className="w-40">
                <ChannelName channel={channel}/>
            </div>
           
        </div>
    )
}

const ChannelImage = ({ channel }: {channel?: Channel}) => {
    const sharedClassNames = "w-12 h-12 rounded-sm flex-none"

    if (!channel) {
        return <div className={sharedClassNames}><Shimmer /></div>
    }

    return (
        <img src={`https://holodex.net/statics/channelImg/${channel.channel_id}/50.png`} className={`${sharedClassNames} line-clamp-1`} alt={`Photo for ${channel?.name}`}/>
    )
}

const ChannelName = ({ channel }: {channel?: Channel}) => {
    if(!channel) return <ShimmerText />

    return (
        <div className="flex flex-col">
            <h3 className="text-md font-bold line-clamp-1">{channel.name}</h3>
            <p className="text-xs font-bold line-clamp-1">{channel.org}</p>
            <p className="text-xs font-bold line-clamp-1">{channel.group}</p>
        </div>
    )
}

const ShimmerText = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className="h-4 w-full"><Shimmer /></div>
            <div className="h-4 w-[60%]"><Shimmer /></div>
        </div>
    )
}

export default VTuberBadge