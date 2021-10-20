import { CONTENT_TYPES } from '@constants/global';
import { PERIODS } from '@constants/global';
import { RangeData } from '@interfaces/range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import * as moment from 'moment';

export class UtilitiesHelper {

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
                isHistoryContent = true;
                break;
            default:
                isHistoryContent = false;
        }
        return isHistoryContent;
    }

    /**
     * Get a number with only two decimals
     * @param  quantity The quantity to format
     * @return          The formatted quantity
     */
    static getQuantityWithOnlyTwoDecimals(quantity: number): number {
        return Math.floor(quantity * 100) / 100;
    }

    /**
     * Remove the commas from a quantity
     * @param  quantity The quantity to format
     * @return          The formatted quantity
     */
    static removeCommasFromQuantity(quantity: string): string {
        return quantity.replace(',', '');
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
     * Get the current date
     * @return The current date
     */
    static getCurrentYear(): number {
        const currentDate: Date = new Date();
        return currentDate.getFullYear();
    }

    /**
     * Generate a Http filter
     * @param  filterName The filter name
     * @param  filters    The filters to apply
     * @return            The HTTP Filter
     */
    static generateHttpFilter(filterName: string, filters: number[]) {
        const filterIds: string[] = filters.map( (element: number) => {
            return filterName + '[=]' + element;
        });
        return filterIds.join(',');
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

    static getRangeDays(startDate: string, endDate: string): number {
        const startDateAux: any = moment(startDate, 'DD/MM/YYYY');
        const endDateAux: any = moment(endDate, 'DD/MM/YYYY');
        const days: number = endDateAux.diff(startDateAux, 'days') + 1;
        return days;
    }
}
