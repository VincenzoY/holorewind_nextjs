import { RewindDBEntry, fetchRecordFromCollectionById } from "@/lib/pocketbase/pocketbase"
import { Metadata } from "next/types"
import RewindComponentByID from "../(components)/RewindComponentByID/RewindComponentByID"
import { notFound } from "next/navigation"

export interface PageProps {
    params: {
        id: string
    }
}

export async function generateMetadata(
    { params: {id} }: PageProps
): Promise<Metadata> {
    const rewindDBEntry = await fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id)
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
    return <RewindComponentByID id={id}/>
}

