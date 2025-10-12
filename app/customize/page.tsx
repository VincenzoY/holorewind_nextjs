import CustomizeSearch from "./(components)/CustomizeSearch/CustomizeSearch"
import pb, { FiltersDBEntry } from "@/lib/pocketbase/pocketbase"

const getInitialFilterData = async (filterID: string) => {
  try {
    return await await pb.fetchRecordFromCollectionById<FiltersDBEntry>("filters", filterID)
  } catch {
    return null
  }
  
}

type SearchParams = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function Page({ searchParams }: SearchParams) {
  const { filter: filterID } = await searchParams
  const filter = filterID ? await getInitialFilterData(filterID) : null

  return <CustomizeSearch filter={filter} />
}
