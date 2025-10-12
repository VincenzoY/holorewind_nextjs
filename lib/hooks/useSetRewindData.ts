import { useLocalStorage } from "@/lib/hooks/useLocalStorage"
import { RewindDataType } from "@/lib/rewind/rewindData/rewindData"

export const useSetRewindData = () => {
  const [, setRewindId] = useLocalStorage<string>("rewindId")
  const [, setRewindData] = useLocalStorage("rewindData")

  const setRewindFunction = (rewindData: RewindDataType) => {
    setRewindId(undefined)
    setRewindData(rewindData)
  }

  return setRewindFunction
}
