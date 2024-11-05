import FakeParagraph from "@/components/RewindComponents/FakeParagraph/FakeParagraph";
import type { VideoWithChannel } from "@/lib/pocketbase/pocketbase";
import { humanizeSeconds } from "@/lib/utils/utils";

interface VideoDetailFileProps {
    index?: number
    value?: string
    videoDetails: VideoWithChannel
}

const getPlacementBorderColour = (index: number | undefined) => {
    if(index === 0) { return "border-[#ffd700]" }
    else if (index === 1) { return "border-[#C0C0C0]" }
    else if (index === 2) { return "border-[#CD7F32]" }
    else { return "border-[#111827]" }
}

export default function VideoDetailFile({
    index = undefined, 
    value = undefined,
    videoDetails,
}: VideoDetailFileProps) {
    const placementBorderColour = getPlacementBorderColour(index)

    return (
        <div className="aspect-[8.5/11] bg-page-white h-[29rem] p-[2.6rem] flex flex-col gap-2">
            <div>
                <div className={`border-2 ${placementBorderColour} border-solid p-1 rounded-sm inline-block float-right ml-2`}>
                    <a href={`https://www.youtube.com/channel/${videoDetails.channel.channel_id}`} target="_blank">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={videoDetails.channel.photo}
                            className="w-20 h-20 line-clamp-3" alt={`Photo for ${videoDetails.channel.name}`}
                        />
                    </a>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-1 line-clamp-3">{videoDetails.title}</h2>
                    {value && <h4 className="text-sm">{value}</h4>}
                    <h4 className="text-sm">Channel: {videoDetails.channel.name}</h4>
                    <h4 className="text-sm">Video Release Date: {new Date(videoDetails.available_at).toLocaleDateString('en-GB')}</h4>
                    <h4 className="text-sm">Video Duration: {humanizeSeconds(videoDetails.duration)}</h4>
                </div>
            </div>
            <div className="grow text-sm">
                <FakeParagraph />
            </div>
            <div >
                <a href={`https://www.youtube.com/watch?v=${videoDetails.video_id}`} target="_blank">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={`https://img.youtube.com/vi/${videoDetails.video_id}/maxresdefault.jpg`}
                        className="" alt={`Thumbnail for ${videoDetails.title}`}
                    />
                </a>
            </div>
        </div>
    )
}
