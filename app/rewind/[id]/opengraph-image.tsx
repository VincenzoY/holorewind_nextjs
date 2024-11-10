import { ImageResponse } from 'next/og'
import RewindOpenGraphStyleImage from '../(components)/RewindOpenGraphImage/RewindOpenGraphStyleImage'
import { RewindDBEntry, fetchRecordFromCollectionById } from '@/lib/pocketbase/pocketbase'
import { PageProps } from './page'
import { fontRobotoBold, fontRobotoRegular } from '@/app/fonts/fonts'
import { notFound } from 'next/navigation'
 
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
  const { rewind } = await fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id).catch(notFound)
 
  return new ImageResponse(
    <div style={{fontFamily: 'Roboto', display: 'flex'}}>
      <RewindOpenGraphStyleImage rewind={rewind}/>
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