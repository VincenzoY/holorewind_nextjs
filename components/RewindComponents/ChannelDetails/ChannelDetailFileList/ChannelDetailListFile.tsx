import { fetchChannelByChannelIds } from "@/lib/pocketbase/utils";
import { useQuery } from "@tanstack/react-query";

interface ChannelDetailListFileProps {
    title: string
    channelDetailList: Array<{
        key: number
        channel_id: string
    }>
    keyToDisplayString: (key: number) => string
}

export default function ChannelDetailListFile({
    title,
    channelDetailList,
    keyToDisplayString
}: ChannelDetailListFileProps) {

    return (
        <div className="aspect-[8.5/11] bg-[#f4f6f8] w-[22.4rem] h-[29rem] p-[2.6rem] flex flex-col gap-1">
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="flex flex-col overflow-hidden flex-wrap">
                {channelDetailList.map((channelDetails, index) => {
                    const key = channelDetails.key
                    const channelId = channelDetails.channel_id

                    const { data: channel } = useQuery({ 
                        queryKey: ['fetchChannel', channelId], 
                        queryFn: async () => (await fetchChannelByChannelIds([channelId]))[channelId]
                    })

                    if (!channel) return
                    
                    return (
                        <a className="text-xs w-full" href={`https://www.youtube.com/channel/${channel.channel_id}`}  target="_blank" key={channel.channel_id}>
                            <div className="font-bold">{index + 1}. {channel.name}</div>
                            <div>({keyToDisplayString(key)})</div>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}