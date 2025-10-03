import { RewindDBEntry } from "@/lib/pocketbase/pocketbase"
import { Metadata } from "next/types"
import RewindComponentByID from "../(components)/RewindComponentByID/RewindComponentByID"
import { notFound } from "next/navigation"
import clientPocketbase from "@/lib/pocketbase/client/pocketbase_client"

export interface PageProps {
    params: {
        id: string
    }
}

export async function generateMetadata(
    { params: {id} }: PageProps
): Promise<Metadata> {
    const { rewind: { year } } = await clientPocketbase.fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id).catch(notFound)
   
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

