"use client"

import Button from "@/components/GenericComponents/Button/Button"
import IconButton from "@/components/GenericComponents/IconButton/IconButton"
import BarsIcon from "@/components/Icons/BarsIcon/BarsIcon"
import CircleInfoIcon from "@/components/Icons/CircleInfoIcon/CircleInfoIcon"
import CircleQuestionIcon from "@/components/Icons/CircleQuestionIcon/CircleQuestionIcon"
import Logo from "@/components/Icons/Logo/Logo"
import CreditsDrawer from "@/components/RewindComponents/Drawers/CreditsDrawer/CreditsDrawer"
import HelpDrawer from "@/components/RewindComponents/Drawers/HelpDrawer/HelpDrawer"
import NavDrawer from "@/components/RewindComponents/Drawers/NavDrawer/NavDrawer"
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"
import NiceModal from "@ebay/nice-modal-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const useHasRewindData = () => {
  const [rewindId] = useLocalStorage<string>("rewindId")
  const [rewindData] = useLocalStorage("rewindData")

  return !!rewindId || !!rewindData
}

export default function Navigation() {
    const hasRewindData = useHasRewindData()

     const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <header className="fixed top-0 left-0 right-0 z-10">
            <nav className="flex w-full max-w-8xl items-center justify-between p-6 lg:px-8">
                <div>
                    <div className="flex lg:hidden">
                        <button type="button" 
                            className="inline-flex items-center justify-center" 
                            onClick={() => NiceModal.show(NavDrawer)}
                        >
                            <BarsIcon width={24} height={24} className="fill-ame-gold"/>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
                        <Link href="/" className="w-24">
                            <Logo />
                        </Link>
                        {isClient && hasRewindData && <Link href="/rewind">
                            <Button>
                                My Rewind
                            </Button>
                        </Link>}
                    </div>
                </div>
                <div>
                    <div className="hidden lg:flex gap-x-6">
                        <IconButton size="sm" onClick={() => NiceModal.show(HelpDrawer)}>
                            <CircleQuestionIcon width={24} height={24} className="fill-page-white"/>
                        </IconButton>
                        <IconButton size="sm" onClick={() => NiceModal.show(CreditsDrawer)}>
                            <CircleInfoIcon width={24} height={24} className="fill-page-white"/>
                        </IconButton>
                    </div>
                </div>
            </nav>
        </header>
    )
}