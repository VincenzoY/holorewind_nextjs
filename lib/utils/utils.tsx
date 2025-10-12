import humanizeDuration from "humanize-duration";

export const humanizeSeconds = (duration: number) => humanizeDuration(duration * 1000)

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getPeriodFromYear = (year: number) => {
    return [
        new Date(year, 0, 1, 0, 0, 0).toISOString(), 
        new Date(year, 11, 31, 23, 59, 59).toISOString()
    ]
}

export const getCurrentRewindYear = () => {
    const now = new Date()
    const currentMonth = now.getMonth() // 0-indexed (0 = January)

    // If current month is before November (month 10), use previous year
    // Otherwise use current year
    if (currentMonth < 9) {
        return now.getFullYear() - 1
    }

    return now.getFullYear()
}