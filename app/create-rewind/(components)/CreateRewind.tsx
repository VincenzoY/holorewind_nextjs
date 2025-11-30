'use client'

import { useSetRewindData } from "@/lib/hooks/useSetRewindData"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { RewindDataType } from "@/lib/rewind/rewindData/rewindData"
import NiceModal from "@ebay/nice-modal-react"
import GuideDrawer from "@/components/RewindComponents/Drawers/GuideDrawer/GuideDrawer"
import Link from "next/link"
import ButtonBlock from "@/components/ButtonBlock/ButtonBlock"
import { PrivacyPolicyFooter } from "@/components/RewindComponents/Drawers/PrivacyPolicyDrawer/PrivacyPolicyDrawer"
import { createRewind, RewindDataOptions } from "@/lib/rewind/rewind"
import FileDropZone from "./FileDropZone/FileDropZone"
import { getCurrentRewindYear } from "@/lib/utils/utils"

type CreateRewindProps = {
  filterId: string | null
}

export default function CreateRewind({ filterId }: CreateRewindProps) {
  const setRewindData = useSetRewindData()
  const router = useRouter()

  const fileSuccessCallback = (rewindData: RewindDataType) => {
    setRewindData(rewindData)
    router.push("/rewind")
  }

  const options: RewindDataOptions = {
    year: getCurrentRewindYear(),
    ...(filterId && { filter: filterId })
  }

  const handleFileSelect = (file: File) => {
    handleFileChange(file, options, fileSuccessCallback)
  }

  return (
    <div className="w-full flex items-center justify-center h-dvh relative">
      <div className="flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-3 gap-4 w-full max-w-4xl px-4">
          <div className="lg:col-span-3 lg:row-span-3">
            <FileDropZone onFileSelect={handleFileSelect} accept=".json" />
          </div>
          <ButtonBlock onClick={() => NiceModal.show(GuideDrawer)} className="w-full lg:col-span-2 font-bold">
              How does this work?
          </ButtonBlock>
          <Link href={filterId ? `/customize?filter=${filterId}` : "/customize"} className="lg:col-span-2 h-full">
            <ButtonBlock className="w-full h-full font-bold">
              Customize Filter
            </ButtonBlock>
          </Link>
          <Link href="https://holorewind.com/rewind/ib18pc2g61zvxqu" className="lg:col-span-2 h-full">
            <ButtonBlock className="w-full h-full font-bold">
              See an example
            </ButtonBlock>
          </Link>
      </div>
      <PrivacyPolicyFooter />
    </div>
  )
}

const handleFileChange = async (
  file: File,
  options: RewindDataOptions,
  successCallback: (rewindData: RewindDataType) => void
) => {
  const rewindData = await toast.promise(
    createRewind(file, options),
    {
      pending: { render() { return "Loading..." } },
      success: { render() { return "Success!" } },
      error: { render({data}: {data: Error}) { return data.message }}
    }
  )

  successCallback(rewindData)
}
