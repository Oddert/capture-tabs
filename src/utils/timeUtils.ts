import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Displays a string describing time since an event in readable format, e.g. "40 seconds ago", "3 days ago", "last year".
 * @param unixTime The timestamp in the past as a Unix formatted time code.
 * @returns The formatted string.
 */
export const displayTimeFrom = (unixTime: number) => {
    const now = dayjs();
    const thePast = dayjs(unixTime);
    const nowMs = now.valueOf();
    const thePastMs = thePast.valueOf();
    const secondsDiff = Math.floor((nowMs - thePastMs) / 1000);
    if (secondsDiff > 60) {
        return thePast.from(now, false);
    } else if (secondsDiff === 0) {
        return 'just now';
    }
    return `${String(secondsDiff)} seconds ago`;
};
