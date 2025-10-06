import { RewindDataType, generateRewind } from "./rewindData/rewindData";
import { formatWatchHistory } from "./formatWatchHistory/formatWatchHistory";
import { fetchRecords } from "./fetchRecords/fetchRecords";
import { createRewindCreationStat } from "@/lib/pocketbase/utils";
import { filterWatchHistory, RewindFilterID } from "./filterWatchHistory/filterWatchHistory";

export interface RewindDataOptions {
  year: number
  filter?: RewindFilterID
}

export async function createRewind(file: File, options: RewindDataOptions): Promise<RewindDataType> {
  const watchHistory = await file.text()

  const { filter } = options

  const formattedWatchHistory = await formatWatchHistory(watchHistory, options)
  const watchHistoryWithData = await fetchRecords(formattedWatchHistory)
  const filteredWatchHistoryWithData = await filterWatchHistory(watchHistoryWithData, filter)
  const rewindData = await generateRewind(filteredWatchHistoryWithData, options)

  await createRewindCreationStat()
      
  return rewindData
}