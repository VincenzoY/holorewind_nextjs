'use client'

import { ChangeEvent, useRef } from "react";
import Button from "@/components/GenericComponents/Button/Button";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"
import { fetchRecords } from "@/lib/fetchRecords/fetchRecords";
import { RewindDataType, generateRewind } from "@/lib/rewind/rewind";
import { formatWatchHistory } from "@/lib/watch_history/watch_history";
import NiceModal from "@ebay/nice-modal-react";
import GuideDrawer from "@/components/RewindComponents/Drawers/GuideDrawer/GuideDrawer";
import Link from "next/link";
import MainLogo from "@/components/Icons/MainLogo/MainLogo";
import { createRewindCreationStat } from "@/lib/pocketbase/utils";
import {default as TextLink} from "@/components/GenericComponents/Link/Link"
import PrivacyPolicyDrawer from "@/components/RewindComponents/Drawers/PrivacyPolicyDrawer/PrivacyPolicyDrawer";

export default function Page() {
  const [, setRewindId] = useLocalStorage<string>("rewindId")
  const [, setRewindData] = useLocalStorage("rewindData")
  const router = useRouter()

  const fileUploadRef = useRef<HTMLInputElement>(null)

  const fileSuccessCallback = (rewindData: RewindDataType) => {
    setRewindId(undefined)
    setRewindData(rewindData)
    router.push("/rewind")
  }

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
                  <input className="hidden" type="file" ref={fileUploadRef} onChange={(e) => handleFileChange(e, fileSuccessCallback)}/>
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
      <div className="absolute bottom-0 left-0 bg-page-white px-2 py-1 rounded-sm text-xs md:text-sm">
        By using this site you agree to our <TextLink href="#" onClick={() => NiceModal.show(PrivacyPolicyDrawer)}>Privacy Policy</TextLink>
      </div>
    </div>
  )
}

const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, successCallback: (rewindData: RewindDataType) => void) => {
  const files = e.target.files
  if (!files) return

  const response = toast.promise(
    getRewindData(files),
    {
      pending: {
        render() {
          return "Loading..."
        },
      },
      success: {
        render() {
          return "Success!"
        }
      },
      error: {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        render({data}: {data: any}) {
          // When the promise reject, data will contains the error
          return data.message
        }
      }
    }
  )

  try {
    successCallback(await response)
  } catch (e) {
    console.error(e)
  }
}

async function getRewindData(files: FileList): Promise<RewindDataType> {
    if (files.length == 0) { throw new Error(`No file found.`); }
  
    const file = files[0]
    const watchHistory = await file.text()
    const formattedWatchHistory = formatWatchHistory(watchHistory, 2024)
    const watchHistoryWithData = await fetchRecords(formattedWatchHistory)
    const rewindData = await generateRewind(watchHistoryWithData, 2024)

    await createRewindCreationStat()
        
    return rewindData
}