'use client'

import VideoDetailFile from "@/components/RewindComponents/VideoDetails/VideoDetailFile/VideoDetailFile"
import { RewindDataType } from "@/lib/rewind/rewindData/rewindData"
import { useContext, useEffect, useRef } from "react"
import { RewindContext } from "../../(context)/RewindContext"
import { Channel, VideoWithChannel } from "@/lib/pocketbase/pocketbase"
import BlankFile from "@/components/RewindComponents/BlankFile/BlankFile"
import Chart from 'chart.js/auto'
import { MONTHS } from "@/lib/utils/dateConstants"

interface ViewsPerVideoProps {}

interface EarliestVideo {
    video_id: string, 
    earliest_view: string
}

type ViewsByMonth = Array<number>

const VideosByTime: React.FC<ViewsPerVideoProps> = () => {
    const rewindData = useContext(RewindContext) as RewindDataType
    const earliestVideo: EarliestVideo = rewindData.earliest_video || {}
    const viewsByMonth: ViewsByMonth = rewindData.views_by_month

    const graphRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const chart = new Chart(
            // @ts-expect-error current is right type
            graphRef.current,
            {
                type: 'bar',
                data: {
                    labels: MONTHS.map((month) => month.slice(0, 3)),
                    datasets: [{
                        data: viewsByMonth,
                        backgroundColor: "#3C3C3C"
                    }]
                },
                options: {
                    indexAxis: 'y',
                    plugins: {
                        legend: false,
                    },
                    responsive: true,
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    }
                }
              }
        );

        return () => {
            chart.destroy()
        }
    }, [viewsByMonth])


    return (
        <div className="flex flex-col gap-4 items-start justify-center min-h-dvh pt-16 pb-16">
            <span className="border-t-4 border-b-4 border-ame-gold border-solid text-page-white p-2 text-2xl">
                <b>Videos By Time</b>
            </span>

            <div className="flex flex-wrap gap-6 2xl:w-full lg:w-[750px] w-[360px]">
                {earliestVideo && <VideoDetailFile value={`First video watched this year (${new Date(earliestVideo.earliest_view).toLocaleDateString('en-GB')})`} videoId={earliestVideo.video_id}/>}
                <BlankFile>
                    <h2 className="text-xl font-bold">Views By Month</h2>
                    <canvas ref={graphRef} style={{height: '100%', width: '100%'}}/>
                </BlankFile>
            </div>
        </div>
    )
}

export default VideosByTime
