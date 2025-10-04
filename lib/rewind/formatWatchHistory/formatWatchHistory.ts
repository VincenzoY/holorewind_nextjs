import { getPeriodFromYear } from "../../utils/utils"
import { getTypeFilterFunction } from "../filterWatchHistory/filterWatchHistory"
import { RewindDataOptions } from "../rewind"

export interface WatchHistoryEntry {
    "header": "YouTube" | "YouTube Music",
    "title": string,
    "titleUrl"?: string,
    "subtitles"?: Array<{
        "name": string,
        "url": string
    }>,
    "time": string,
    "products": Array<string>,
    "activityControls": Array<string>
}

export interface FormattedWatchHistory {
    [videoId: string]: FormattedWatchHistoryEntry
}

export interface FormattedWatchHistoryEntry {
    watchHistory: Array<[string, string]>
}

export async function formatWatchHistory(watchHistory: string, options: RewindDataOptions) {
    const { year, filter } = options

    const [startTime, endTime] = getPeriodFromYear(year)

    const typeFilterFunction = await getTypeFilterFunction(filter)

    let watchHistoryJSON: Array<WatchHistoryEntry> = []
    try {
		watchHistoryJSON = JSON.parse(watchHistory);
		if(!Array.isArray(watchHistoryJSON)) { throw new Error(); }
	} catch {
		throw new Error (`File Data is in an unexpected format. Try redownloading the file.`)
	}

    const videoRegex = /https:\/\/(www|music).youtube.com\/watch\?v(=|\\u003d)(.+)/
    const filteredData: FormattedWatchHistory= {}

    const startTimeDate = startTime && Date.parse(startTime)
    const endTimeDate = endTime && Date.parse(endTime)

    watchHistoryJSON.forEach((watch_record, index) => {
        const videoMatch = watch_record["titleUrl"]?.match(videoRegex);
        const time = watch_record["time"];
        
        if (!videoMatch || !time) { return; }
        
        if((startTimeDate && Date.parse(time) < startTimeDate) || (endTimeDate && Date.parse(time) > endTimeDate)) { return; }

        const type = watch_record.header
        const videoId = videoMatch[3]

        if (!typeFilterFunction(type)) return

        filteredData[videoId] ||= { watchHistory: [] }

        const approxEndWatchTime = watchHistoryJSON[index - 1]?.["time"] || new Date(Date.now()).toISOString()

        filteredData[videoId]["watchHistory"].push([time, approxEndWatchTime])
    })
    
    return filteredData
}