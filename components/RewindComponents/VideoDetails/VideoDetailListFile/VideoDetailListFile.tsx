"use client"

import { fetchVideoByVideoIds } from "@/lib/pocketbase/utils";
import { useQuery } from "@tanstack/react-query";

interface VideoDetailListFileProps {
    title?: string
    videoDetailList: Array<{
        key: number
        video_id: string
    }>
    keyToDisplayString: (key: number) => string
}

export default function VideoDetailListFile({
    title = undefined,
    videoDetailList,
    keyToDisplayString
}: VideoDetailListFileProps) {
    return (
        <div className="aspect-[8.5/11] bg-[#f4f6f8] w-[22.4rem] h-[29rem] p-[2.6rem] flex flex-col gap-1">
            {title && <h2 className="text-xl font-bold">{title}</h2>}
            <div className="flex flex-col overflow-hidden flex-wrap">
                {videoDetailList.map((videoDetails, index) => {
                    const key = videoDetails.key
                    const video_id = videoDetails.video_id

                    const { data: video } = useQuery({ 
                        queryKey: ['fetchVideo', video_id], 
                        queryFn: async () => (await fetchVideoByVideoIds([video_id]))[video_id]
                    })

                    if (!video) return
                    
                    return (
                        <a className="text-xs w-full" href={`https://www.youtube.com/watch?v=${video_id}`} target="_blank" key={video_id}>
                            <div className="font-bold">{index + 1}. {video.title}</div>
                            <div>({keyToDisplayString(key)})</div>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}