'use client'

import { useLocalStorage } from "@/lib/hooks/useLocalStorage"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { RewindDataType } from "@/lib/rewind/rewind"
import RewindComponent from "./(components)/RewindComponent/RewindComponent"

export default function Page() {
    const router = useRouter()

    const [rewindId] = useLocalStorage<string>("rewindId")
    const [localRewindData] = useLocalStorage<RewindDataType>("rewindData")
    const [mounted, setOnMount] = useState(false)

    useEffect(() => { 
        if (rewindId) { return router.replace(`/rewind/${rewindId}`)}
        if (!localRewindData) { return router.push("/") } 
    }, [rewindId, localRewindData, router])

    useEffect(() => { setOnMount(true) }, [])

    if(!mounted || !localRewindData) return <></>

    return <RewindComponent rewind={localRewindData} />
}