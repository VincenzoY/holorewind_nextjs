import { RewindDBEntry, fetchRecordFromCollectionById } from "@/lib/pocketbase/pocketbase"
import { notFound } from "next/navigation"
import RewindComponent from "../(components)/RewindComponent/RewindComponent"
import { Metadata } from "next/types"

export interface PageProps {
    params: {
        id: string
    }
}

export async function generateMetadata(
    { params: {id} }: PageProps
): Promise<Metadata> {
   
    const rewindDBEntry = await fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id).catch(notFound)
    const { rewind } = rewindDBEntry

    const year = rewind.year
   
    return {
      openGraph: {
        title: `My ${year + " " || ""}HoloLive Rewind`,
        description: "This is who I was watching this year. Find yours too!",
      },
    }
}

export default async function Page({ params: { id } }: PageProps) {
    const { rewind } = await fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id, { requestKey: null }).catch(notFound)

    return <RewindComponent rewind={rewind} rewindId={id}/>
}

