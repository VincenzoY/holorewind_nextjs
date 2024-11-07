"use client"

import { RewindContext } from '../../(context)/RewindContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { RewindDataType } from '@/lib/rewind/rewind';
import BlankFile from '@/components/RewindComponents/BlankFile/BlankFile';
import { toPng } from 'html-to-image'
import DownloadIcon from '@/components/Icons/DownloadIcon/DownloadIcon';
import { createRewind } from '@/lib/pocketbase/utils';
import RewindOpenGraphImage from '../RewindOpenGraphImage/RewindOpenGraphImage';
import LinkIcon from '@/components/Icons/LinkIcon/LinkIcon';
import { toast } from 'react-toastify';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import Logo from '@/components/Icons/Logo/Logo';

interface ShareComponentProps {
    rewindId?: string
}

export default function ShareComponent({ rewindId: rewindIdParam }: ShareComponentProps) {
    const rewindData = useContext(RewindContext) as RewindDataType
    const { uniqueViews } = rewindData.accumulatedVideoData
    const { channelCount } = rewindData.accumulatedChannelData
    const watchTimePerChannel = rewindData.specificChannelData.totalWatchTime

    const fileRef = useRef(null)
    const opengraphRef = useRef(null)
    const [fileDataUrl, setFileDataUrl] = useState<string | undefined>(undefined)
    const [opengraphDataUrl, setOpengraphDataUrl] = useState<string | undefined>(undefined)

    const [rewindId, setRewindId] = useState(rewindIdParam)
    const [_, setStorageRewindId] = useLocalStorage<string>("rewindId")

    useEffect(() => {
        const createImages = async () => {
            if(fileRef.current) {
                setFileDataUrl(await toPng(fileRef.current))
            }

            if(opengraphRef.current) {
                setOpengraphDataUrl(await toPng(opengraphRef.current))
            }
        }
        
        createImages()
    }, [])

    const createRewindLink = async () => {
        if (!opengraphDataUrl) return;

        if (!rewindId) {
            const rewind = await createRewind(rewindData, opengraphDataUrl)
            setRewindId(rewind.id)
            setStorageRewindId(rewind.id)
            return await copyToClipboard(getRewindUrl(rewind.id))
        }

        await copyToClipboard(getRewindUrl(rewindId))
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
                                <div className='flex justify-between items-center'>
                                    <h2 className="text-2xl font-bold">HoloRewind</h2>
                                    <Logo className="w-16"/>
                                </div>
                                <div className='h-1 bg-slate-800'/>
                                <div className='flex flex-col items-center'>
                                    <h2 className="text-xl font-bold"><b className="font-bold text-4xl text-ame-gold">{uniqueViews}</b> videos</h2>
                                    <h2 className="text-xl font-bold"><b className="font-bold text-4xl text-ame-gold">{channelCount}</b> channels</h2>
                                </div>
                                <div className='h-1 bg-slate-800'/>
                                <div>
                                    <h3 className="text-md font-bold">Top Channels</h3>
                                    <div className='grid grid-rows-5 grid-cols-2 gap-x-4 mr-2 ml-2'>
                                        {watchTimePerChannel.slice(0, 10).map((item) => {
                                            return (
                                                <div className='truncate text-sm' key={item.channel.channel_id}>{item.channel.name}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='flex justify-around'>
                                    {
                                        watchTimePerChannel.slice(0, 3).map((item, index) => {
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
                            <button 
                                className='p-2 bg-slate-300 rounded-sm hover:bg-slate-400 transition-colors disabled:bg-slate-500 disabled:cursor-wait' 
                                disabled={!fileDataUrl}
                                onClick={() => fileDataUrl && downloadImage(fileDataUrl)}
                            >
                                <div className='flex items-center justify-center text-xl gap-2'>
                                    <DownloadIcon width={24} height={24}/> Download
                                </div>
                            </button>
                            <button 
                                className='p-2 bg-slate-300 rounded-sm hover:bg-slate-400 transition-colors disabled:bg-slate-500 disabled:cursor-wait' 
                                disabled={!fileDataUrl}
                                onClick={createRewindLink}
                            >
                                <div className='flex items-center justify-center text-xl gap-2'>
                                    <LinkIcon width={24} height={24}/> Create Shareable Link
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute left-[-2000px]'>
                <div ref={opengraphRef}>
                    <RewindOpenGraphImage rewind={rewindData}/>
                </div>
            </div>
        </>
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