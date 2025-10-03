import { ImageResponse } from 'next/og'
import RewindOpenGraphStyleImage from '../(components)/RewindOpenGraphImage/RewindOpenGraphStyleImage'
import { RewindDBEntry } from '@/lib/pocketbase/pocketbase'
import { PageProps } from './page'
import { notFound } from 'next/navigation'
import pb from '@/lib/pocketbase/pocketbase'
import { fetchChannelByChannelIds } from '@/lib/pocketbase/utils'
 
export const runtime = 'edge'

// Image metadata
export const alt = 'HoloRewind Image'
export const size = {
  width: 1500,
  height: 785,
}

export const contentType = 'image/png'

// Image generation
export default async function Image(
  { params: {id} }: PageProps
) {
  const { rewind } = await pb.fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id).catch(notFound)
  const dataPerChannel: Array<{key: number, channel_id: string}> = rewind.channel_unique_views ?? rewind.channel_watch_time
  const channels = await fetchChannelByChannelIds(dataPerChannel.map(item => item.channel_id))

  const fontRobotoRegular = fetch(
    new URL('/app/fonts/Roboto-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const fontRobotoBold = fetch(
    new URL('./fonts/Roboto-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
 
  return new ImageResponse(
    <div style={{fontFamily: 'Roboto', display: 'flex'}}>
      <RewindOpenGraphStyleImage rewind={rewind} channels={channels} />
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Roboto',
          data: await fontRobotoRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Roboto',
          data: await fontRobotoBold,
          weight: 700,
          style: 'normal',
        }
      ]
    }
  )
}