import { RewindDataType, generateRewind } from "./rewindData/rewindData";
import { formatWatchHistory } from "./formatWatchHistory/formatWatchHistory";
import { fetchRecords } from "./fetchRecords/fetchRecords";
import { createRewindCreationStat } from "@/lib/pocketbase/utils";
import { RewindFilterType } from "./filterRewind/filterRewind";

export interface RewindDataOptions {
  year: number
  filter?: RewindFilterType
}

export async function getRewindData(files: FileList, options: RewindDataOptions): Promise<RewindDataType> {
  if (files.length == 0) { throw new Error(`No file found.`); }

  const file = files[0]
  const watchHistory = await file.text()
  const formattedWatchHistory = await formatWatchHistory(watchHistory, options)
  const watchHistoryWithData = await fetchRecords(formattedWatchHistory)
  const rewindData = await generateRewind(watchHistoryWithData, options)

  await createRewindCreationStat()
      
  return rewindData
}