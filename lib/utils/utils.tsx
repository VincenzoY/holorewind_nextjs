import humanizeDuration from "humanize-duration";

export const humanizeSeconds = (duration: number) => humanizeDuration(duration * 1000)

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getPeriodFromYear = (year: number) => {
    return [
        new Date(year, 0, 1, 0, 0, 0).toISOString(), 
        new Date(year, 11, 31, 23, 59, 59).toISOString()
    ]
}
