import moment from 'moment';

export class DateHelper {
    static getCurrentDate(): string {
        return moment().format('DD/MM/YYYY');
    }

    static getCurrentTime(): string {
        return moment().format('h:mm A');
    }

    static getDifferenceBetweenTwoDates(
        date1: string,
        date2: string,
        format: string
    ): number {
        const momentDate1: any = moment(date1, 'DD/MM/YYYY');
        const momentDate2: any = moment(date2, 'DD/MM/YYYY');
        const days: number = momentDate2.diff(momentDate1, format);
        return days;
    }
}
