'use client'

import OverallViewInfo from "../OverallViewInfo/OverallViewInfo"
import WatchTimePerVideo from "../WatchTimePerVideo/WatchTimePerVideo"
import WatchTimePerChannel from "../WatchTimePerChannel/WatchTimePerChannel"
import ViewsPerVideo from "../ViewsPerVideo/ViewsPerVideo"
import VideosByTime from "../VideosByTime/VideosByTime"
import ShareComponent from "../ShareComponent/ShareComponent"
import { RewindDataType } from "@/lib/rewind/rewindData/rewindData"
import { RewindContext } from "../../(context)/RewindContext"
import ViewsPerChannel from "../ViewsPerChannel/ViewsPerChannel"
import UniqueViewsPerChannel from "../UniqueViewsPerChannel/UniqueViewsPerChannel"

interface RewindComponent {
    rewind: RewindDataType
    rewindId?: string
}

export default function RewindComponent({ rewind, rewindId }: RewindComponent) {
    return (
        <RewindContext.Provider value={rewind}>
            <div className="
                flex flex-col items-center justify-center
            ">
                <OverallViewInfo />
                <WatchTimePerVideo />
                <WatchTimePerChannel />
                <ViewsPerVideo />
                <ViewsPerChannel />
                <UniqueViewsPerChannel />
                <VideosByTime />
                <ShareComponent rewindId={rewindId} />
            </div>
        </RewindContext.Provider>
    )
}