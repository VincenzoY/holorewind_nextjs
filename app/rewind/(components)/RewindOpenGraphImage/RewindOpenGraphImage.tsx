import Logo from "@/components/Icons/Logo/Logo"
import MainLogo from "@/components/Icons/MainLogo/MainLogo"
import { RewindDataType } from "@/lib/rewind/rewind"

interface RewindOpenGraphImageProps {
    rewind: RewindDataType
}

export default function RewindOpenGraphImage({rewind}: RewindOpenGraphImageProps) {
    const { uniqueViews, totalViews } = rewind.accumulatedVideoData
    const { channelCount } = rewind.accumulatedChannelData
    const watchTimePerChannel = rewind.specificChannelData.totalWatchTime

    return (
        <div className="aspect-[1.91/1] bg-[#121212] text-page-white w-[1500px] p-[2.6rem]">
            <div className="flex w-full h-full gap-8">
                <div className='flex flex-col justify-between'>
                    {
                        watchTimePerChannel.slice(0, 3).map((item) => {
                            return (
                                <img 
                                    src={item.channel.photo}
                                    className="w-52 rounded-md" alt={`Photo for ${item.channel.name}`}
                                    key={item.channel.channel_id}
                                />
                            )
                        })
                    }
                </div>
                <div className='flex flex-col gap-4 w-full h-full'>
                    <div className="flex justify-between">
                        <h2 className="text-9xl font-bold">HoloRewind</h2>
                        <Logo />
                    </div>
                    <div className='h-3 w-full bg-slate-500 shrink-0'/>
                    <div className="flex justify-between items-center">
                        <h2 className="text-5xl font-bold"><b className="font-bold text-7xl text-ame-gold">{uniqueViews}</b> videos</h2>
                        <h2 className="text-5xl font-bold"><b className="font-bold text-7xl text-ame-gold">{totalViews}</b> views</h2> 
                        <h2 className="text-5xl font-bold"><b className="font-bold text-7xl text-ame-gold">{channelCount}</b> channels</h2> 
                    </div>
                    <div className='h-3 w-full bg-slate-500 shrink-0'/>
                    <div className="grow flex flex-col gap-4">
                        <h3 className="text-5xl font-bold">Top Channels</h3>
                        <div className='grid grid-rows-5 grid-cols-2 gap-x-8 gap-y-2 mr-8 ml-8'>
                            {watchTimePerChannel.slice(0, 10).map((item) => {
                                return (
                                    <div className='truncate text-3xl' key={item.channel.channel_id}>{item.channel.name}</div>
                                )
                            })}
                        </div>
                    </div>
                    <p className='text-2xl'>Find yours @ holorewind.com</p>
                </div>
            </div>
        </div>
    )
}