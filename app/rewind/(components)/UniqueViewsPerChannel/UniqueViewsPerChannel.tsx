import { RewindDataType } from "@/lib/rewind/rewind"
import { useContext } from "react"
import { RewindContext } from "../../(context)/RewindContext"
import ChannelDetailFile from "@/components/RewindComponents/ChannelDetails/ChannelDetailFile/ChannelDetailFile"
import ChannelDetailListFile from "@/components/RewindComponents/ChannelDetails/ChannelDetailFileList/ChannelDetailListFile"

interface UniqueViewsPerChannelProps {}

const UniqueViewsPerChannel: React.FC<UniqueViewsPerChannelProps> = () => {
    const rewindData = useContext(RewindContext) as RewindDataType

    const uniqueViewsPerChannel: Array<{ key: number, channel_id: string }> = rewindData.channel_unique_views

    if (!uniqueViewsPerChannel) return

    const SpecificFiles = uniqueViewsPerChannel.slice(0, 3).map((item, index) => {
        return (
            <ChannelDetailFile key={index} index={index} value={`Views: ${item.key}`} channelId={item.channel_id}/>
        )
    })

    return (
        <div className="flex flex-col gap-4 items-start justify-center min-h-dvh pt-16 pb-16">
            <span className="border-t-4 border-b-4 border-ame-gold border-solid text-page-white p-2 text-2xl">
                <b>Channel Unique Video Views</b>
            </span>

            <div className="flex flex-wrap gap-6 2xl:w-full lg:w-[750px] w-[360px]">
                {SpecificFiles}
                <ChannelDetailListFile title="Channel Unique Video Views" channelDetailList={uniqueViewsPerChannel} keyToDisplayString={keyToString} />
            </div>
        </div>
    )
}

const keyToString = (key: number) => {
    return `${key} unique videos viewed`
}

export default UniqueViewsPerChannel
