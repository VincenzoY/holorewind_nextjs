import { Channel } from "@/lib/pocketbase/pocketbase"
import { RewindDataItem, RewindDataType } from "@/lib/rewind/rewind"

interface RewindOpenGraphStyleImageProps {
    rewind: RewindDataType
}

export default function RewindOpenGraphStyleImage({rewind}: RewindOpenGraphStyleImageProps) {
    const { year } = rewind
    const { uniqueViews, totalViews } = rewind.accumulatedVideoData
    const { channelCount } = rewind.accumulatedChannelData
    const watchTimePerChannel = rewind.specificChannelData.totalWatchTime
    const uniqueViewsPerChannel = rewind.specificChannelData.uniqueViews
    const dataPerChannel = (uniqueViewsPerChannel ?? watchTimePerChannel).slice(0, 10)

    return (
        <div tw="flex h-[785px] bg-[#121212] text-[#f4f6f8] w-[1500px] p-[2.6rem]">
            <div tw="flex w-full h-full">
                <div tw='flex flex-col justify-between'>
                    {
                        dataPerChannel.slice(0, 3).map((item) => {
                            return (
                                <img 
                                    src={item.channel.photo}
                                    tw="w-52 rounded-md" alt={`Photo for ${item.channel.name}`}
                                    key={item.channel.channel_id}
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
                            <ChannelsColumn channels={dataPerChannel.filter((_, i) => i % 2 === 0)}/>
                            <ChannelsColumn channels={dataPerChannel.filter((_, i) => i % 2 === 1)}/>
                        </div>
                    </div>
                    <p tw='text-3xl'>Find yours @ holorewind.com</p>
                </div>
            </div>
        </div>
    )
}

const ChannelsColumn = ({channels}: {channels: Array<RewindDataItem<{channel: Channel}>>}) => {
    return (
        <div tw='flex flex-col w-1/2'>
            {channels.slice(0, 10).map((item) => {
                return (
                    <div tw='text-3xl mb-2' style={{display: 'block', lineClamp: 1}} key={item.channel.channel_id}>{item.channel.name}</div>
                )
            })}
        </div>
    )
}