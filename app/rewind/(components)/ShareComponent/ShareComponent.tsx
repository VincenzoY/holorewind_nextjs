"use client"

import { RewindContext } from '../../(context)/RewindContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { RewindDataType } from '@/lib/rewind/rewind';
import BlankFile from '@/components/RewindComponents/BlankFile/BlankFile';
import { toPng } from 'html-to-image'
import DownloadIcon from '@/components/Icons/DownloadIcon/DownloadIcon';
import { createRewind } from '@/lib/pocketbase/utils';
import LinkIcon from '@/components/Icons/LinkIcon/LinkIcon';
import { toast } from 'react-toastify';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import TwitterLogo from '@/components/Icons/TwitterIcon/TwitterIcon';

interface ShareComponentProps {
    rewindId?: string
}

export default function ShareComponent({ rewindId: rewindIdParam }: ShareComponentProps) {
    const rewindData = useContext(RewindContext) as RewindDataType
    const { uniqueViews } = rewindData.accumulatedVideoData
    const { channelCount } = rewindData.accumulatedChannelData
    // initial launch didn't include viewsPerChannel so must keep watchTimePerChannel for back compat
    const watchTimePerChannel = rewindData.specificChannelData.totalWatchTime
    const uniqueViewsPerChannel = rewindData.specificChannelData.uniqueViews
    const dataPerChannel = uniqueViewsPerChannel ?? watchTimePerChannel

    const fileRef = useRef(null)
    const [fileDataUrl, setFileDataUrl] = useState<string | undefined>(undefined)

    const [rewindId, setRewindId] = useState(rewindIdParam)
    const [_, setStorageRewindId] = useLocalStorage<string>("rewindId")

    useEffect(() => {
        const createImages = async () => {
            if(fileRef.current) {
                setFileDataUrl(await toPng(fileRef.current))
            }
        }
        
        createImages()
    }, [])

    const createRewindUrl = async () => {
        if (rewindId) { return getRewindUrl(rewindId) }

        const rewind = await createRewind(rewindData)
        setRewindId(rewind.id)
        setStorageRewindId(rewind.id)
        return getRewindUrl(rewind.id)
    }

    const shareLinkOnTwitter = async () => {
        const rewindUrl = await createRewindUrl()

        const twitterUrl = new URL("https://twitter.com/intent/tweet")
        twitterUrl.searchParams.append('text', 'This is who I was watching in Hololive this year. Find yours too!')
        twitterUrl.searchParams.append('hashtags', 'HoloRewind');
        twitterUrl.searchParams.append('url', rewindUrl);

        const newWindow = window.open(twitterUrl, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const followOnTwitter = () => {
        const newWindow = window.open('https://twitter.com/yuyu933933', '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <>
            <div className='flex flex-col gap-4 items-start justify-center min-h-dvh pt-16 pb-16'>
                <span className="border-t-4 border-b-4 border-ame-gold border-solid text-page-white p-2 text-2xl">
                    <b>Share your HoloRewind</b>
                </span>
                <div className="inline-grid gap-6 lg:grid-cols-2 grid-cols-1">
                    <div ref={fileRef}>
                        <BlankFile>
                            <div className='flex flex-col gap-2'>
                                <h2 className="text-2xl font-bold">HoloRewind</h2>
                                <div className='h-1 bg-[#3C3C3C]'/>
                                <div className='flex flex-col items-center'>
                                    <h2 className="text-xl font-bold"><b className="font-bold text-4xl text-ame-gold">{uniqueViews}</b> videos</h2>
                                    <h2 className="text-xl font-bold"><b className="font-bold text-4xl text-ame-gold">{channelCount}</b> channels</h2>
                                </div>
                                <div className='h-1 bg-[#3C3C3C]'/>
                                <div>
                                    <h3 className="text-md font-bold">Top Channels</h3>
                                    <div className='grid grid-rows-5 grid-cols-2 gap-x-4 mr-2 ml-2'>
                                        {dataPerChannel.slice(0, 10).map((item) => {
                                            return (
                                                <div className='truncate text-sm' key={item.channel.channel_id}>{item.channel.name}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='flex justify-around'>
                                    {
                                        dataPerChannel.slice(0, 3).map((item, index) => {
                                            return (
                                                <img 
                                                    src={item.channel.photo}
                                                    className="w-20 h-20 line-clamp-3 rounded-sm" alt={`Photo for ${item.channel.name}`}
                                                    key={item.channel.channel_id}
                                                />
                                            )
                                        })
                                    }
                                </div>
                                <p className='text-xs'>Find yours @ holorewind.com</p>
                            </div>
                        </BlankFile>
                    </div>
                    <div>
                        <div className='flex flex-col gap-4'>
                            {/* 
                            <ShareButton 
                                disabled={!fileDataUrl}
                                onClick={() => fileDataUrl && downloadImage(fileDataUrl)}
                            >
                                <DownloadIcon width={24} height={24}/> Download
                            </ShareButton>
                            */}
                            <ShareButton 
                                onClick={async () => await copyToClipboard(await createRewindUrl())}
                            >
                                <LinkIcon width={24} height={24}/> Create Shareable Link
                            </ShareButton>
                            <ShareButton 
                                onClick={shareLinkOnTwitter}
                            >
                                <TwitterLogo width={24} height={24}/> Share on Twitter
                            </ShareButton>
                            <ShareButton 
                                onClick={followOnTwitter}
                            >
                                Follow me on Twitter :D
                            </ShareButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ShareButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button 
            className='
                p-2 text-ame-gold rounded-sm transition-colors bg-[#3C3C3C] hover:bg-zinc-600 disabled:bg-zinc-800 disabled:cursor-wait disabled:opacity-75
                flex items-center justify-center text-xl gap-2 fill-ame-gold
            ' 
            {...props}
        />
    )
}

async function copyToClipboard(text: string) {
    await toast.promise(
        navigator.clipboard.writeText(text),
        {
            success: {
                render() {
                    return "Copied to Clipboard!"
                }
            },
            error: {
                render({data}: {data: any}) {
                    // When the promise reject, data will contains the error
                    return data.message
                }
            }
        }
    )
}

function getRewindUrl(rewindId: string) {
    return (
        process.env.NODE_ENV === "production" ? 
        `https://${window.location.host}/rewind/${rewindId}` :
        `http://${window.location.host}/rewind/${rewindId}`
    )
}

function downloadImage(data: string, filename = 'holorewind.png') {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}