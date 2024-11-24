import { getPeriodFromYear } from "../utils/utils"

type DateFilter = {startTime: string | undefined, endTime: string | undefined}

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
    channelId?: string
}

export function formatWatchHistory(watchHistory: string, year: number) {
    const [startTime, endTime] = getPeriodFromYear(year)

    let watchHistoryJSON: Array<WatchHistoryEntry> = []
    try {
		watchHistoryJSON = JSON.parse(watchHistory);
		if(!Array.isArray(watchHistoryJSON)) { throw new Error(); }
	} catch {
		throw new Error (`File Data is in an unexpected format. Try redownloading the file.`)
	}

    const videoRegex = /https:\/\/(www|music).youtube.com\/watch\?v(=|\\u003d)(.+)/
    const channelRegex = /https:\/\/www.youtube.com\/channel\/(.+)/
    const filteredData: FormattedWatchHistory= {}

    const startTimeDate = startTime && Date.parse(startTime)
    const endTimeDate = endTime && Date.parse(endTime)

    watchHistoryJSON.forEach((watch_record, index) => {
        const videoMatch = watch_record["titleUrl"]?.match(videoRegex);
        const time = watch_record["time"];
        
        if (!videoMatch || !time) { return; }
        
        if((startTimeDate && Date.parse(time) < startTimeDate) || (endTimeDate && Date.parse(time) > endTimeDate)) { return; }

        const videoId = videoMatch[3]
        const channelLink = watch_record["subtitles"]?.[0]?.["name"]
        const channelMatch = channelLink?.match(channelRegex) || undefined
        const channelId = channelMatch && channelMatch[1]

        filteredData[videoId] ||= {
            watchHistory: [],
            channelId: channelId
        }

        const approxEndWatchTime = watchHistoryJSON[index - 1]?.["time"] || new Date(Date.now()).toISOString()

        filteredData[videoId]["watchHistory"].push([time, approxEndWatchTime])
        filteredData[videoId]["channelId"] ||= channelId
    })
    
    return filteredData
}