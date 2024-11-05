import ChannelDetailFile from "@/components/RewindComponents/ChannelDetails/ChannelDetailFile/ChannelDetailFile"
import ChannelDetailListFile from "@/components/RewindComponents/ChannelDetails/ChannelDetailFileList/ChannelDetailListFile"
import { RewindDataType } from "@/lib/rewind/rewind"
import { humanizeSeconds } from "@/lib/utils/utils"
import { useContext } from "react"
import { RewindContext } from "../../(context)/RewindContext"

interface WatchTimePerChannelProps {}

const WatchTimePerChannel: React.FC<WatchTimePerChannelProps> = () => {
    const rewindData = useContext(RewindContext) as RewindDataType

    const watchTimePerChannel = rewindData.specificChannelData.totalWatchTime

    const SpecificFiles = watchTimePerChannel.slice(0, 3).map((item, index) => {
        return (
            <ChannelDetailFile key={index} index={index} value={`Watch Time: ${keyToString(item.key)}`} channelDetails={item.channel}/>
        )
    })

    return (
        <div className="flex flex-col gap-4 items-start justify-center min-h-dvh pt-16 pb-16">
            <span className="border-t-4 border-b-4 border-ame-gold border-solid text-page-white p-2 text-2xl">
                <b>Channel Watch Time</b>
            </span>

            <div className="inline-grid gap-6 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1">
                {SpecificFiles}
                <ChannelDetailListFile title="Channel Watch Time" channelDetailList={watchTimePerChannel} keyToDisplayString={keyToString} />
            </div>
        </div>
    )
}

const keyToString = (key: number) => {
    return humanizeSeconds(key)
}

export default WatchTimePerChannel
