import { CONTENT_TYPES } from '@constants/global';
import { PERIODS } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import * as moment from 'moment';

export class UtilitiesHelper {

    static calculateNextPaymentDate(paymentDate: string, paymentPlanMonths: string, paymentDay: number): string {
        let nextPaymentDate: string = moment(paymentDate).add(paymentPlanMonths, 'months').format('YYYY-MM-DD');
        const nextPaymentDay: number = parseInt(moment(nextPaymentDate).format('D'));
        const daysInMonth: number = moment(nextPaymentDate).daysInMonth();
        if(nextPaymentDay < daysInMonth) {
            const leftDays: number = paymentDay - nextPaymentDay;
            nextPaymentDate = moment(nextPaymentDate).add(leftDays, 'days').format('YYYY-MM-DD');
        }
        return nextPaymentDate;
    }

    /**
     * Check if the content is history content
     * @param  contentType The type of content to evaluate
     * @return             True if it is, otherwise false;
     */
    static checkIsHistoryContent(contentType: number): boolean {
        let isHistoryContent: boolean;
        switch(contentType) {
            case CONTENT_TYPES.HISTORY_POLICY.ID:
            case CONTENT_TYPES.PAYMENT_HISTORY.ID:
            case CONTENT_TYPES.SINISTER_HISTORY.ID:
            case CONTENT_TYPES.POLICY_SINISTERS.ID:
            case CONTENT_TYPES.POLICY_ENDORSEMENTS_HISTORY.ID:
                isHistoryContent = true;
                break;
            default:
                isHistoryContent = false;
        }
        return isHistoryContent;
    }

    /**
     * Get the current date
     * @return The current date
     */
    static getCurrentYear(): number {
        const currentDate: Date = new Date();
        return currentDate.getFullYear();
    }

    static getYearFromDate(date: string): number {
        const arrDate: string[] = date.split('-');
        return (arrDate.length === 3) ? parseInt(arrDate[0]) : 0;
    }

    /**
     * Get the original format of the date
     * @param  date The date to format
     * @return      The formatted date
     */
    static getOriginalDateFormat(date: string): string {
        const arrDate: string[] = date.split('/');
        return arrDate[2]+'-'+arrDate[1]+'-'+arrDate[0];
    }

    /**
     * Get a number with only two decimals
     * @param  quantity The quantity to format
     * @return          The formatted quantity
     */
    static getQuantityWithOnlyTwoDecimals(quantity: number): number {
        return Math.floor(quantity * 100) / 100;
    }

    static getRangeDays(startDate: string, endDate: string): number {
        const startDateAux: any = moment(startDate, 'DD/MM/YYYY');
        const endDateAux: any = moment(endDate, 'DD/MM/YYYY');
        const days: number = endDateAux.diff(startDateAux, 'days') + 1;
        return days;
    }

    /**
     * Generate a Http filter
     * @param  filterName The filter name
     * @param  filters    The filters to apply
     * @return            The HTTP Filter
     */
    static generateHttpFilter(filterName: string, filters: number[] | (number | string)[]) {
        const filterIds: string[] = filters.map( (element: number | string) => {
            return filterName + '[=]' + element;
        });
        return filterIds.join(',');
    }

    static generateHttpSpecialFilter(filterName: string, filters: number[]) {
        const specialFilter: string = filterName+'[=]'+filters.join(',')+';';
        return specialFilter;
    }

    static generateRange(statsPeriodData: StatsPeriodData): RangeData {
        const startDateAux: any = moment(statsPeriodData.startDate, 'DD/MM/YYYY');
        const endDateAux: any = moment(statsPeriodData.endDate, 'DD/MM/YYYY');
        const comparedPeriodRangeStart: string = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ? startDateAux.subtract(1, 'years') : startDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
        const comparedPeriodRangeEnd: string = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ?  endDateAux.subtract(1, 'years') : endDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
        const range: RangeData = {
            selectedRangeStart: statsPeriodData.startDate,
            selectedRangeEnd: statsPeriodData.endDate,
            comparedRangeStart: comparedPeriodRangeStart,
            comparedRangeEnd: comparedPeriodRangeEnd
        }
        return range;
    }

    /**
     * Remove the commas from a quantity
     * @param  quantity The quantity to format
     * @return          The formatted quantity
     */
    static removeCommasFromQuantity(quantity: string): string {
        quantity = quantity.toString();
        if(ValidatorsHelper.isValidAmounSpanish(quantity)) {
            quantity = quantity.replace('.', '&');
            quantity = quantity.replace(',', '.');
            quantity = quantity.replace('&', ',');
        }
        return quantity.replace(',', '');
    }

    static generateKey(length: number = 5): string {
        const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength: number = characters.length;
        let key: string = '';
        for ( let i = 0; i < length; i++ ) {
          key += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return key;
    }

}
