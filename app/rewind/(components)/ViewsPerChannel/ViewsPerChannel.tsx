import { RewindDataType } from "@/lib/rewind/rewindData/rewindData"
import { useContext } from "react"
import { RewindContext } from "../../(context)/RewindContext"
import ChannelDetailFile from "@/components/RewindComponents/ChannelDetails/ChannelDetailFile/ChannelDetailFile"
import ChannelDetailListFile from "@/components/RewindComponents/ChannelDetails/ChannelDetailFileList/ChannelDetailListFile"

interface ViewsPerChannelProps {}

const ViewsPerChannel: React.FC<ViewsPerChannelProps> = () => {
    const rewindData = useContext(RewindContext) as RewindDataType

    const viewsPerChannel: Array<{ key: number, channel_id: string }> = rewindData.channel_views

    if (!viewsPerChannel) return

    const SpecificFiles = viewsPerChannel.slice(0, 3).map((item, index) => {
        return (
            <ChannelDetailFile key={index} index={index} value={`Views: ${item.key}`} channelId={item.channel_id}/>
        )
    })

    return (
        <div className="flex flex-col gap-4 items-start justify-center min-h-dvh pt-16 pb-16">
            <span className="border-t-4 border-b-4 border-ame-gold border-solid text-page-white p-2 text-2xl">
                <b>Channel Views</b>
            </span>

            <div className="flex flex-wrap gap-6 2xl:w-full lg:w-[750px] w-[360px]">
                {SpecificFiles}
                <ChannelDetailListFile title="Channel Views" channelDetailList={viewsPerChannel} keyToDisplayString={keyToString} />
            </div>
        </div>
    )
}

const keyToString = (key: number) => {
    return `${key} views`
}

export default ViewsPerChannel
