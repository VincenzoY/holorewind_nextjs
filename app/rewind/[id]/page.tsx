import { RewindDBEntry } from "@/lib/pocketbase/pocketbase"
import { Metadata } from "next/types"
import RewindComponentByID from "../(components)/RewindComponentByID/RewindComponentByID"
import { notFound } from "next/navigation"
import pb from "@/lib/pocketbase/pocketbase"

export interface PageProps {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const { id } = await params
    const { rewind: { year } } = await pb.fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id).catch(notFound)
   
    return {
      openGraph: {
        title: `My ${year + " " || ""}HoloRewind`,
        description: "This is the VTubers I was watching this year. Find yours too!",
      },
    }
}

export default async function Page({ params }: PageProps) {
    const { id } = await params
    return <RewindComponentByID id={id}/>
}

