'use client'

import { RewindDBEntry } from "@/lib/pocketbase/pocketbase"
import { useQuery } from "@tanstack/react-query"
import { notFound } from "next/navigation"
import RewindComponent from "../RewindComponent/RewindComponent"
import pb from "@/lib/pocketbase/pocketbase"

interface RewindComponentByIDProps {
  id: string
}

export default function RewindComponentByID({ id }: RewindComponentByIDProps) {
  const { isLoading, isError, data } = useQuery({ queryKey: ['fetchRecord', id], queryFn: () => pb.fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id) })

  if (isLoading) return <></>

  if (isError) return notFound()

  return <RewindComponent rewind={data.rewind} rewindId={id}/>
}