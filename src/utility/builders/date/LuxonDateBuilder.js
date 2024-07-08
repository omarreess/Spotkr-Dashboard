import {DateTime} from "luxon";
import DateFactory from "../../factories/DateFactory";
const appConfig = "UTC"
class LuxonDateBuilder {
    __timezone;

    constructor(date = DateTime.local(), timezone = null) {
        this.__timezone = timezone || appConfig;
        this.date = DateTime.fromJSDate(date.toJSDate()).setZone(appConfig);
    }

    setIsoDate(isoDate, timeZone = null) {
        timeZone = timeZone || this.__timezone;

        this.date = DateTime.fromISO(isoDate, {zone: timeZone});
        return this;
    }

    format(format) {
        return this.date.setZone(DateTime.local().zoneName).toFormat(format);
    }

    diffForHumans() {
        return this.date.setZone(DateTime.local().zoneName).toRelative()
    }

    currentIsoDate() {
        const now = DateTime.now()

        return  now.setZone('UTC').toISO({ includeOffset: false, suppressMilliseconds: false });
    }

    dateTimeFormatted() {
        return this.format(DateFactory.DEFAULT_DATE_TIME_FORMAT)
    }
}

export default LuxonDateBuilder