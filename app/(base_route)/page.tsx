'use client'

import { useRef } from "react";
import Button from "@/components/GenericComponents/Button/Button";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"
import { RewindDataType } from "@/lib/rewind/rewindData/rewindData";
import NiceModal from "@ebay/nice-modal-react";
import GuideDrawer from "@/components/RewindComponents/Drawers/GuideDrawer/GuideDrawer";
import Link from "next/link";
import MainLogo from "@/components/Icons/MainLogo/MainLogo";
import TextLink from "@/components/GenericComponents/Link/Link"
import PrivacyPolicyDrawer from "@/components/RewindComponents/Drawers/PrivacyPolicyDrawer/PrivacyPolicyDrawer";
import { createRewind, RewindDataOptions } from "@/lib/rewind/rewind";

export default function Page() {
  const setRewindData = useSetRewindData()
  const router = useRouter()

  const fileUploadRef = useRef<HTMLInputElement>(null)

  const fileSuccessCallback = (rewindData: RewindDataType) => {
    setRewindData(rewindData)
    router.push("/rewind")
  }

  const options: RewindDataOptions = { year: 2024 }

  return (
    <div className="w-full flex items-center justify-center h-dvh relative">
      <div className="flex flex-col items-center gap-8 w-full">
          {/*<div className="bg-slate-300 w-[80%] max-w-[60rem] h-48"/>*/}
          {<MainLogo />}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div>
                  <Button onClick={() => fileUploadRef.current?.click()} className="w-[200px] md:w-auto">
                      Upload Watch History
                  </Button>
                  <input 
                    className="hidden" 
                    type="file" 
                    ref={fileUploadRef} 
                    onChange={(e) => handleFileChange(e.target.files, options, fileSuccessCallback)}
                  />
              </div>
              <div>
                  <Button onClick={() => NiceModal.show(GuideDrawer)} className="w-[200px] md:w-auto">
                      How does this work?
                  </Button>
              </div>
              <div>
                <Link href="https://holorewind.com/rewind/ib18pc2g61zvxqu">
                  <Button className="w-[200px] md:w-auto">
                    See an example
                  </Button>
                </Link>
              </div>
          </div>
      </div>
      <div className="fixed bottom-0 left-0 bg-page-white px-2 py-1 rounded-sm text-xs md:text-sm">
        By using this site you agree to our <TextLink href="#" onClick={() => NiceModal.show(PrivacyPolicyDrawer)}>Privacy Policy</TextLink>
      </div>
    </div>
  )
}

const useSetRewindData = () => {
  const [, setRewindId] = useLocalStorage<string>("rewindId")
  const [, setRewindData] = useLocalStorage("rewindData")

  const setRewindFunction = (rewindData: RewindDataType) => {
    setRewindId(undefined)
    setRewindData(rewindData)
  }

  return setRewindFunction
}

const handleFileChange = async (
  files: FileList | null,
  options: RewindDataOptions,
  successCallback: (rewindData: RewindDataType) => void
) => {
  if (!files || !files[0]) return

  const watchHistoryFile = files[0]

  const rewindData = await toast.promise(
    createRewind(watchHistoryFile, options),
    {
      pending: { render() { return "Loading..." } },
      success: { render() { return "Success!" } },
      error: { render({data}: {data: Error}) { return data.message }}
    }
  )

  successCallback(rewindData)
}
