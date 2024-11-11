import VideoDetailFile from "@/components/RewindComponents/VideoDetails/VideoDetailFile/VideoDetailFile"
import VideoDetailListFile from "@/components/RewindComponents/VideoDetails/VideoDetailListFile/VideoDetailListFile"
import { RewindDataType } from "@/lib/rewind/rewind"
import { useContext } from "react"
import { RewindContext } from "../../(context)/RewindContext"

interface ViewsPerVideoProps {}

const ViewsPerVideo: React.FC<ViewsPerVideoProps> = () => {
    const rewindData = useContext(RewindContext) as RewindDataType

    const viewsPerVideo = rewindData.specificVideoData.views

    const SpecificFiles = viewsPerVideo.slice(0, 3).map((item, index) => {
        return (
            <VideoDetailFile key={index} index={index} value={`Views: ${item.key}`} videoDetails={item.video}/>
        )
    })

    return (
        <div className="flex flex-col gap-4 items-start justify-center min-h-dvh pt-16 pb-16">
            <span className="border-t-4 border-b-4 border-ame-gold border-solid text-page-white p-2 text-2xl">
                <b>Video Views</b>
            </span>

            <div className="flex flex-wrap gap-6 2xl:w-full lg:w-[750px] w-[360px]">
                {SpecificFiles}
                <VideoDetailListFile title="Video Views" videoDetailList={viewsPerVideo} keyToDisplayString={keyToString} />
            </div>
        </div>
    )
}

const keyToString = (key: number) => {
    return `${key} views`
}

export default ViewsPerVideo
