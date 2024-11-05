import { RewindDBEntry, fetchRecordFromCollectionById } from "@/lib/pocketbase/pocketbase";
import { cache } from "react";

export const getRewindDataById = cache(async (id: string): Promise<RewindDBEntry> => {
    return (await fetchRecordFromCollectionById<RewindDBEntry>("rewind", id))
})