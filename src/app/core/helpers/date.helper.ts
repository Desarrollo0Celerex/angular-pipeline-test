import * as moment from 'moment';

export class DateHelper {
    static getCurrentDate(): string {
        return moment().format('DD/MM/YYYY');
    }

    static getCurrentTime(): string {
        return moment().format('h:mm A');
    }
}
