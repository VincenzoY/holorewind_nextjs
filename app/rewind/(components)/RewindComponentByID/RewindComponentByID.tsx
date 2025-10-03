'use client'

import { RewindDBEntry } from "@/lib/pocketbase/pocketbase"
import { useQuery } from "@tanstack/react-query"
import { notFound } from "next/navigation"
import RewindComponent from "../RewindComponent/RewindComponent"
import clientPocketbase from "@/lib/pocketbase/client/pocketbase_client"

interface RewindComponentByIDProps {
  id: string
}

export default function RewindComponentByID({ id }: RewindComponentByIDProps) {
  const { isLoading, isError, data } = useQuery({ queryKey: ['fetchRecord', id], queryFn: () => clientPocketbase.fetchRecordFromCollectionById<RewindDBEntry>("rewinds", id) })

  if (isLoading) return <span>Loading</span>

  if (isError) return notFound()

  return <RewindComponent rewind={data.rewind} rewindId={id}/>
}