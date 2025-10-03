import { RewindDBEntry } from "@/lib/pocketbase/pocketbase";
import { cache } from "react";
import clientPocketbase from "@/lib/pocketbase/client/pocketbase_client";

export const getRewindDataById = cache(async (id: string): Promise<RewindDBEntry> => {
    return (await clientPocketbase.fetchRecordFromCollectionById<RewindDBEntry>("rewind", id))
})