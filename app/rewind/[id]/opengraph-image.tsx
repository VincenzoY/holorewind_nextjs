import { ImageResponse } from 'next/og'
import RewindOpenGraphStyleImage from '../(components)/RewindOpenGraphImage/RewindOpenGraphStyleImage'
import { RewindDBEntry, fetchRecordFromCollectionById } from '@/lib/pocketbase/pocketbase'
import { PageProps } from './page'
 
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
  const rewindDBEntry = await fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id).catch(() => undefined)
  if(!rewindDBEntry) return null
  const { rewind } = rewindDBEntry

 
  return new ImageResponse(
    <RewindOpenGraphStyleImage rewind={rewind}/>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      debug: true,
    }
  )
}