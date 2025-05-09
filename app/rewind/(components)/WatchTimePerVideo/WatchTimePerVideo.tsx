import VideoDetailFile from "@/components/RewindComponents/VideoDetails/VideoDetailFile/VideoDetailFile"
import VideoDetailListFile from "@/components/RewindComponents/VideoDetails/VideoDetailListFile/VideoDetailListFile"
import { humanizeSeconds } from "@/lib/utils/utils"
import { useContext } from "react"
import { RewindContext } from "../../(context)/RewindContext"
import { RewindDataType } from "@/lib/rewind/rewindData/rewindData"

interface WatchTimePerVideoProps {}

const WatchTimePerVideo: React.FC<WatchTimePerVideoProps> = () => {
    const rewindData = useContext(RewindContext) as RewindDataType

    const videoWatchTime: Array<{ key: number, video_id: string }> = rewindData.video_watch_time

    const SpecificFiles = videoWatchTime.slice(0, 3).map((item, index) => {
        return (
            <VideoDetailFile key={index} index={index} value={`Watch Time: ${keyToString(item.key)}`} videoId={item.video_id}/>
        )
    })

    return (
        <div className="flex flex-col gap-4 min-h-dvh pt-16 pb-16">
            <div className="flex flex-col gap-4 items-start justify-center">
                <span className="border-t-4 border-b-4 border-ame-gold border-solid text-page-white p-2 text-2xl">
                    <b>Approx Video Watch Time *</b>
                </span>

                <div className="flex flex-wrap gap-6 2xl:w-full lg:w-[750px] w-[360px]">
                    {SpecificFiles}
                    <VideoDetailListFile title="Video Watch Time" videoDetailList={videoWatchTime} keyToDisplayString={keyToString} />
                </div>
            </div>
            <p className="text-page-white text-md font-bold">* See `Help` / `?` Drawer</p>
        </div>
    )
}

const keyToString = (key: number) => humanizeSeconds(key)

export default WatchTimePerVideo
