import { RewindDataType } from "@/lib/rewind/rewind"

interface RewindOpenGraphStyleImageProps {
    rewind: RewindDataType
}

export default function RewindOpenGraphStyleImage({rewind}: RewindOpenGraphStyleImageProps) {
    const { uniqueViews, totalViews } = rewind.accumulatedVideoData
    const { channelCount } = rewind.accumulatedChannelData
    const watchTimePerChannel = rewind.specificChannelData.totalWatchTime

    return (
        <div 
            style={{
                display: 'flex',
                height: '785px',
                width: '1500px',
                backgroundColor: '#121212',
                color: '#f4f6f8',
                padding: '2.6rem'
            }}
        >
            <div 
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    gap: '2rem'
                }}
            >
                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    {
                        watchTimePerChannel.slice(0, 3).map((item) => {
                            return (
                                <img 
                                    src={item.channel.photo}
                                    alt={`Photo for ${item.channel.name}`}
                                    key={item.channel.channel_id}
                                    style={{
                                        width: '13rem',
                                        borderRadius: '0.375rem'
                                    }}
                                />
                            )
                        })
                    }
                </div>
                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        flexGrow: '1',
                        height: '100%'
                    }}
                >
                    <h2 
                        style={{
                            fontSize: '8rem',
                            lineHeight: '1',
                            fontWeight: '700'
                        }}
                    >
                        HoloRewind
                    </h2>
                    <div 
                        style={{
                            height: '0.75rem',
                            width: '100%',
                            backgroundColor: '#64748b',
                            flexShrink: '0'
                        }}
                    />
                    <div 
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <h2 
                            style={{
                                fontSize: '3rem',
                                lineHeight: '1',
                                fontWeight: '700'
                            }}
                        >
                            <b
                                style={{
                                    fontSize: '4.5rem',
                                    lineHeight: '1',
                                    fontWeight: '700',
                                    color: '#f6ca77'
                                }}
                            
                            >
                                {uniqueViews}
                            </b> videos
                        </h2>
                        <h2 
                            style={{
                                fontSize: '3rem',
                                lineHeight: '1',
                                fontWeight: '700'
                            }}
                        >
                            <b
                                style={{
                                    fontSize: '4.5rem',
                                    lineHeight: '1',
                                    fontWeight: '700',
                                    color: '#f6ca77'
                                }}
                            
                            >
                                {totalViews}
                            </b> views
                        </h2> 
                        <h2 
                            style={{
                                fontSize: '3rem',
                                lineHeight: '1',
                                fontWeight: '700'
                            }}
                        >
                            <b
                                style={{
                                    fontSize: '4.5rem',
                                    lineHeight: '1',
                                    fontWeight: '700',
                                    color: '#f6ca77'
                                }}
                            
                            >
                                {channelCount}
                            </b> channels
                        </h2> 
                    </div>
                    <div 
                        style={{
                            height: '0.75rem',
                            width: '100%',
                            backgroundColor: '#64748b',
                            flexShrink: '0'
                        }}
                    />
                    <div
                        style={{
                            flexGrow: '1',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '3rem',
                                lineHeight: '1',
                                fontWeight: '700'
                            }}
                        >
                            Top Channels
                        </h3>
                        {/*
                        <div 
                            className='grid grid-rows-5 grid-cols-2 gap-x-8 gap-y-2 mr-8 ml-8'
                        >
                            {watchTimePerChannel.slice(0, 10).map((item) => {
                                return (
                                    <div className='truncate text-3xl' key={item.channel.channel_id}>{item.channel.name}</div>
                                )
                            })}
                        </div>
                        */}
                    </div>
                    <p
                        style={{
                            fontSize: '1.5rem',
                            lineHeight: '2rem'
                        }}
                    >
                        Find yours @ holorewind.com
                    </p>
                </div>
            </div>
        </div>
    )
}