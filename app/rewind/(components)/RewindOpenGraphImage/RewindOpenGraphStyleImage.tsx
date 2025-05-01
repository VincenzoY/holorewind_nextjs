import { Channel } from "@/lib/pocketbase/pocketbase"
import { fetchChannelByChannelIds } from "@/lib/pocketbase/utils"
import { RewindDataType } from "@/lib/rewind/rewind"

interface RewindOpenGraphStyleImageProps {
    rewind: RewindDataType
    channels: Record<string, Channel>
}

export default function RewindOpenGraphStyleImage({rewind, channels}: RewindOpenGraphStyleImageProps) {
    const { 
        year, 
        total_view_count: totalViews, 
        total_unique_videos_viewed: uniqueViews,
        total_channel_count: channelCount,
        channel_watch_time: watchTimePerChannel,
        channel_unique_views: uniqueViewsPerChannel,
    } = rewind
    const dataPerChannel: Array<{key: number, channel_id: string}> = (uniqueViewsPerChannel ?? watchTimePerChannel).slice(0, 10)

    return (
        <div tw="flex h-[785px] bg-[#121212] text-[#f4f6f8] w-[1500px] p-[2.6rem]">
            <div tw="flex w-full h-full">
                <div tw='flex flex-col justify-between'>
                    {
                        dataPerChannel.slice(0, 3).map((item) => {
                            const channel = channels[item.channel_id]

                            return (
                                <img 
                                    src={channel.photo}
                                    tw="w-52 rounded-md" alt={`Photo for ${channel.name}`}
                                    key={channel.channel_id}
                                />
                            )
                        })
                    }
                </div>
                <div tw='flex flex-col h-full w-[1176.8px] ml-8'>
                    <div tw="flex w-full justify-between items-end">
                        <h2 tw="text-9xl font-bold pr-2">HoloRewind</h2>
                        {year && <h4 tw="text-3xl font-bold">({year})</h4>}
                    </div>
                    
                    <div tw='h-3 w-full bg-[#3C3C3C] shrink-0'/>
                    <div tw="flex justify-between items-center">
                        <div tw="flex items-end">
                            <h3 tw="text-7xl font-bold text-[#F6CA77] pr-2">{uniqueViews}</h3> 
                            <h4 tw="text-5xl font-bold">videos</h4>
                        </div>
                        <div tw="flex items-end">
                            <h3 tw="text-7xl font-bold text-[#F6CA77] pr-2">{totalViews}</h3> 
                            <h4 tw="text-5xl font-bold">views</h4>
                        </div>
                        <div tw="flex items-end">
                            <h3 tw="text-7xl font-bold text-[#F6CA77] pr-2">{channelCount}</h3> 
                            <h4 tw="text-5xl font-bold">channels</h4>
                        </div>
                    </div>
                    <div tw='h-3 w-full bg-[#3C3C3C] shrink-0'/>
                    <div tw="grow flex flex-col">
                        <h3 tw="text-4xl font-bold">Top Channels</h3>
                        <div tw='flex'>
                            <ChannelsColumn channelData={dataPerChannel.filter((_, i) => i % 2 === 0)} channels={channels}/>
                            <ChannelsColumn channelData={dataPerChannel.filter((_, i) => i % 2 === 1)} channels={channels}/>
                        </div>
                    </div>
                    <p tw='text-3xl'>Find yours @ holorewind.com</p>
                </div>
            </div>
        </div>
    )
}

const ChannelsColumn = ({channelData, channels}: {channelData: Array<{key: number, channel_id: string}>, channels: Record<string, Channel>}) => {
    return (
        <div tw='flex flex-col w-1/2'>
            {channelData.slice(0, 10).map((item) => {
                const channel = channels[item.channel_id]
                return (
                    <div tw='text-3xl mb-2' style={{display: 'block', lineClamp: 1}} key={channel.channel_id}>{channel.name}</div>
                )
            })}
        </div>
    )
}