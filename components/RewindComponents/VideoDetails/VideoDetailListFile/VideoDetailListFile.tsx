import type { VideoWithChannel } from "@/lib/pocketbase/pocketbase";

interface VideoDetailListFileProps {
    title?: string
    videoDetailList: Array<{
        key: number
        video: VideoWithChannel
    }>
    keyToDisplayString: (key: number) => string
}

export default function VideoDetailListFile({
    title = undefined,
    videoDetailList,
    keyToDisplayString
}: VideoDetailListFileProps) {

    return (
        <div className="aspect-[8.5/11] bg-[#f4f6f8] h-[29rem] p-[2.6rem] flex flex-col gap-1">
            {title && <h2 className="text-xl font-bold">{title}</h2>}
            <div className="flex flex-col overflow-hidden flex-wrap">
                {videoDetailList.map((videoDetails, index) => {
                    const key = videoDetails.key
                    const video = videoDetails.video
                    return (
                        <a className="text-xs w-full" href={`https://www.youtube.com/watch?v=${video.video_id}`} target="_blank" key={video.video_id}>
                            <div className="font-bold">{index + 1}. {video.title}</div>
                            <div>({keyToDisplayString(key)})</div>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}