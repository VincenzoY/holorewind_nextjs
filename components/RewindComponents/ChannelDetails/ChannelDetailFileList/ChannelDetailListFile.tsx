import type { Channel } from "@/lib/pocketbase/pocketbase";

interface VideoDetailListFileProps {
    title: string
    channelDetailList: Array<{
        key: number
        channel: Channel
    }>
    keyToDisplayString: (key: number) => string
}

export default function VideoDetailListFile({
    title,
    channelDetailList,
    keyToDisplayString
}: VideoDetailListFileProps) {

    return (
        <div className="aspect-[8.5/11] bg-[#f4f6f8] h-[29rem] p-[2.6rem] flex flex-col gap-1">
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="flex flex-col overflow-hidden flex-wrap">
                {channelDetailList.map((channelDetails, index) => {
                    const key = channelDetails.key
                    const channel = channelDetails.channel
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