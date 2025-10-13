import { withLoggedInSession } from "@/lib/pocketbase/server/login"
import pb, { FiltersDBEntry } from "@/lib/pocketbase/pocketbase"
import { RewindFilterDataType } from "@/lib/rewind/filterWatchHistory/filterWatchHistory"

export async function POST(request: Request) {
  const body = await request.json()

  const { channelIds, includedData } = body as {
    channelIds: string[]
    includedData: RewindFilterDataType["included_data"]
  }

  // Validate included_data exists and is the correct type
  if (!includedData || !["all", "music", "video"].includes(includedData)) {
    return Response.json(
      { error: "included_data must be one of: 'all', 'music', or 'video'" },
      { status: 400 }
    )
  }

  // Validate channelIds exists, is an array, and has at least one value
  if (!channelIds || !Array.isArray(channelIds) || channelIds.length === 0) {
    return Response.json(
      { error: "Must choose at least once channel" },
      { status: 400 }
    )
  }

  const filterRecord = await withLoggedInSession(async () => {
    return await pb.createRecordInCollection<FiltersDBEntry>("filters", {
      filter_data: {
        included_data: includedData,
        orgs: [],
        channel_ids: channelIds,
      }
    })
  })

  return Response.json({ id: filterRecord.id })
}
