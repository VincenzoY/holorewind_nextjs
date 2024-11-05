import { humanizeSeconds } from '@/lib/utils/utils';
import { RewindContext } from '../../(context)/RewindContext';
import { useContext } from 'react';
import { RewindDataType } from '@/lib/rewind/rewind';

interface OverallViewInfoProps {}

export default function OverallViewInfo({}: OverallViewInfoProps) {
    const rewindData = useContext(RewindContext) as RewindDataType

    const year = rewindData.year
    const { totalViews, uniqueViews, totalWatchTime } = rewindData.accumulatedVideoData
    const { channelCount } = rewindData.accumulatedChannelData

    return (
        <div className='min-h-dvh flex items-center align-center'>
            <div 
                className="
                    max-w-md md:max-w-2xl
                    text-page-white text-2xl md:text-4xl
                    border-t-4 border-b-4 border-ame-gold border-solid 
                    p-2 pb-8 pt-6
                    m-4
                "
            >
                <h1>
                    This year ({year}), you watched<b className="font-bold text-4xl md:text-6xl"> {uniqueViews} </b>
                    unique videos from<b className="font-bold text-4xl md:text-6xl"> {channelCount}</b> different channels.
                </h1>
                <br />
                <h1>
                    In total, you watched<b className="font-bold text-4xl md:text-6xl"> {totalViews} </b>
                    videos (That&apos;s {humanizeSeconds(totalWatchTime)} of watch time).
                </h1>
            </div>
        </div>
    )
}

