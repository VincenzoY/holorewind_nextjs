import { RewindDBEntry, fetchRecordFromCollectionById } from "@/lib/pocketbase/pocketbase"
import { notFound } from "next/navigation"
import { getRewindPhotoUrl } from "@/lib/pocketbase/utils"
import RewindComponent from "../(components)/RewindComponent/RewindComponent"
import { Metadata } from "next/types"

interface PageProps {
    params: {
        id: string
    }
}

export async function generateMetadata(
    { params: {id} }: PageProps
): Promise<Metadata> {
   
    const rewindDBEntry = await fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id).catch(notFound)
    const { rewind, photo } = rewindDBEntry

    const year = rewind.year
   
    const photoUrl = getRewindPhotoUrl(rewindDBEntry, photo)
   
    return {
      openGraph: {
        title: `My ${year + " " || ""}HoloLive EN Rewind`,
        description: "This is who I was watching this year. Find yours too!",
        images: [photoUrl],
      },
    }
}

export default async function Page({ params: { id } }: PageProps) {
    const { rewind } = await fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id, { requestKey: null }).catch(notFound)

    return <RewindComponent rewind={rewind} rewindId={id}/>
}

