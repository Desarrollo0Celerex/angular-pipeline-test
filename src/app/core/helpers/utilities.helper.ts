import {
    MULTIYEAR_INSURANCES,
    PAYMENT_PLANS,
    PAYMENT_SOURCE_TYPES,
} from '@core/constants/settings';
import { CONTENT_TYPES } from '@constants/global';
import { PERIODS } from '@constants/global';
import { CalculateFirstPaymentAmount } from '@core/interfaces/calculate-first-payment-amount.interface';
import { CalculatePaymentAmount } from '@core/interfaces/calculate-payment-amount.interface';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import * as moment from 'moment';
import { PaymentPlan } from '@interfaces/payment-plan.interface';

export class UtilitiesHelper {
    static specialSimbols: string[] = [
        '-',
        '[',
        ']',
        '/',
        '{',
        '}',
        '(',
        ')',
        '*',
        '+',
        '?',
        '.',
        '^',
        '$',
        '|',
    ];

    static calculateAge(birthdate: string | null): number | null {
        let age: number | null = null;
        if (birthdate !== null) {
            age = moment().diff(
                moment(birthdate).format('YYYY-MM-DD'),
                'years'
            );
        }
        return age;
    }

    static calculateNextPaymentDate(
        paymentDate: string,
        paymentPlanMonths: string,
        paymentDay: number
    ): string {
        let nextPaymentDate: string = moment(paymentDate)
            .add(paymentPlanMonths, 'months')
            .format('YYYY-MM-DD');
        const nextPaymentDay: number = parseInt(
            moment(nextPaymentDate).format('D')
        );
        const daysInMonth: number = moment(nextPaymentDate).daysInMonth();
        if (nextPaymentDay < daysInMonth) {
            const leftDays: number = paymentDay - nextPaymentDay;
            nextPaymentDate = moment(nextPaymentDate)
                .add(leftDays, 'days')
                .format('YYYY-MM-DD');
        }
        return nextPaymentDate;
    }

    static calculatePaymentAmount(data: CalculatePaymentAmount): number {
        console.log('paso 1');

        if (
            data.paymentSourceTypeId === PAYMENT_SOURCE_TYPES.POLICY &&
            data.tickets === 0 &&
            data.paymentPlanId != PAYMENT_PLANS.SINGLE_PAYMENT &&
            data.paymentPlanId != PAYMENT_PLANS.ANNUAL
        ) {
            if (!!data.firstReceiptAmount) {
                console.log('paso 2');
                return data.firstReceiptAmount;
            } else {
                console.log('paso 3');
                return this.calculateFirstPaymentAmount({
                    paymentPlanReceips: data.paymentPlanReceips,
                    netPay: data.netPay,
                    feePay: data.feePay,
                    coverPay: data.coverPay,
                    noTaxPay: data.noTaxPay,
                    extraPay: data.extraPay,
                    taxPay: data.taxPay,
                    discount: data.discount,
                });
            }
        } else {
            console.log('paso 4');
            if (!!data.subsequentReceiptsAmount) {
                console.log('paso 5');
                return data.subsequentReceiptsAmount;
            } else {
                console.log('paso 6');
                return data.pendingAmount / data.pendingReceipts;
            }
        }
    }

    static getPaymentPlanMonths(
        paymentPlanId: number,
        paymentPlans: PaymentPlan[]
    ): number {
        const foundPaymentPlan = paymentPlans.find(
            (paymentPlan) => paymentPlan.paymentPlanId == paymentPlanId
        );
        return foundPaymentPlan ? foundPaymentPlan.months : 0;
    }

    static getPaymentPlanReceipts(
        paymentPlanId: number,
        paymentPlans: PaymentPlan[]
    ): number {
        const foundPaymentPlan = paymentPlans.find(
            (paymentPlan) => paymentPlan.paymentPlanId == paymentPlanId
        );
        return foundPaymentPlan ? foundPaymentPlan.receipts : 0;
    }

    /**
     * Check if the content is history content
     * @param  contentType The type of content to evaluate
     * @return             True if it is, otherwise false;
     */
    static checkIsHistoryContent(contentType: number): boolean {
        let isHistoryContent: boolean;
        switch (contentType) {
            case CONTENT_TYPES.HISTORY_POLICY.ID:
            case CONTENT_TYPES.PAYMENT_HISTORY.ID:
            case CONTENT_TYPES.SINISTER_HISTORY.ID:
            case CONTENT_TYPES.POLICY_SINISTERS.ID:
            case CONTENT_TYPES.POLICY_ENDORSEMENTS_HISTORY.ID:
            case CONTENT_TYPES.POLICY_RENEWAL_HISTORY.ID:
                isHistoryContent = true;
                break;
            default:
                isHistoryContent = false;
        }
        return isHistoryContent;
    }

    static checkIsMultiyear(
        insuranceId: number,
        validityYears: number
    ): boolean {
        return MULTIYEAR_INSURANCES.includes(insuranceId) && validityYears > 1
            ? true
            : false;
    }

    static checkIsValidNumber(value: string, length: number): boolean {
        const regex = new RegExp(`^[0-9]{${length}}$`);
        return regex.test(value) ? true : false;
    }

    static checkIsValidString(value: string, length: number): boolean {
        const regex = new RegExp(`^[a-zA-Z]{${length}}$`);
        return regex.test(value) ? true : false;
    }

    static days360(startDate: string, endDate: string) {
        let d1 = new Date(startDate);
        let d2 = new Date(endDate);
        let d1_y = d1.getFullYear();
        let d2_y = d2.getFullYear();
        let dy = 0;
        let d1_m = d1.getMonth();
        let d2_m = d2.getMonth();
        let dm = 0;
        let d1_d = d1.getDate();
        let d2_d = d2.getDate();
        let dd = 0;
        if (d1_d == 31) d1_d = 30;
        if (d2_d == 31) {
            if (d1_d < 30) {
                if (d2_m == 11) {
                    d2_y = d2_y + 1;
                    d2_m = 0;
                    d2_d = 1;
                } else {
                    d2_m = d2_m + 1;
                    d2_d = 1;
                }
            } else {
                d2_d = 30;
            }
        }
        dy = d2_y - d1_y;
        dm = d2_m - d1_m;
        dd = d2_d - d1_d;
        const result = dy * 360 + dm * 30 + dd;
        return parseFloat(result.toString());
    }

    static generateBirthdateBasedOnRfc(rfc: string): string | null {
        const name = rfc.substring(0, 4);
        const birthdate = rfc.substring(4, 10);
        const isValidString = UtilitiesHelper.checkIsValidString(name, 4);
        const isValidNumber = UtilitiesHelper.checkIsValidNumber(birthdate, 6);

        if (!isValidString || !isValidNumber) {
            return null;
        }
        const shortYear = parseInt(birthdate.substring(0, 2));
        const yearAux = shortYear <= 20 ? '20' : '19';
        return moment(yearAux + birthdate, 'YYYYMMDD').format('YYYY-MM-DD');
    }

    static generateWhatsappLink(phone: string, message: string): string {
        return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
            message
        )}`;
    }

    static executeWhatsappLink(whatsappLink: string): void {
        const link = document.createElement('a');
        link.target = '_blank';
        link.href = whatsappLink;
        link.click();
        link.remove();
    }

    static toLowerCaseFirst(value: string): string {
        return (value && value[0].toLowerCase() + value.slice(1)) || value;
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
        return arrDate.length === 3 ? parseInt(arrDate[0]) : 0;
    }

    /**
     * Get the original format of the date
     * @param  date The date to format
     * @return      The formatted date
     */
    static getOriginalDateFormat(date: string): string {
        const arrDate: string[] = date.split('/');
        return arrDate[2] + '-' + arrDate[1] + '-' + arrDate[0];
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
    static generateHttpFilter(
        filterName: string,
        filters: number[] | (number | string)[]
    ) {
        const filterIds: string[] = filters.map((element: number | string) => {
            return filterName + '[=]' + element;
        });
        return filterIds.join(',');
    }

    static generateHttpSpecialFilter(filterName: string, filters: number[]) {
        const specialFilter: string =
            filterName + '[=]' + filters.join(',') + ';';
        return specialFilter;
    }

    static generateRange(
        statsPeriodData: StatsPeriodData
    ): ComparisonRangeData {
        const startDateAux: any = moment(
            statsPeriodData.startDate,
            'DD/MM/YYYY'
        );
        const endDateAux: any = moment(statsPeriodData.endDate, 'DD/MM/YYYY');
        const comparedPeriodRangeStart: string = (
            statsPeriodData.periodId == PERIODS.LAST_YEAR
                ? startDateAux.subtract(1, 'years')
                : startDateAux.subtract(1, 'months')
        ).format('DD/MM/YYYY');
        const comparedPeriodRangeEnd: string = (
            statsPeriodData.periodId == PERIODS.LAST_YEAR
                ? endDateAux.subtract(1, 'years')
                : endDateAux.subtract(1, 'months')
        ).format('DD/MM/YYYY');
        const range: ComparisonRangeData = {
            selectedRangeStart: statsPeriodData.startDate,
            selectedRangeEnd: statsPeriodData.endDate,
            comparedRangeStart: comparedPeriodRangeStart,
            comparedRangeEnd: comparedPeriodRangeEnd,
        };
        return range;
    }

    /**
     * Remove the commas from a quantity
     * @param  quantity The quantity to format
     * @return          The formatted quantity
     */
    static removeCommasFromQuantity(quantity: string): string {
        quantity = quantity.toString();
        if (ValidatorsHelper.isValidAmounSpanish(quantity)) {
            quantity = this._replaceAll('.', '&', quantity);
            quantity = this._replaceAll(',', '.', quantity);
            quantity = this._replaceAll('&', ',', quantity);
        }
        return this._replaceAll(',', '', quantity);
    }

    static generateKey(length: number = 5): string {
        const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength: number = characters.length;
        let key: string = '';
        for (let i = 0; i < length; i++) {
            key += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return key;
    }

    static executeLink(link: string): void {
        const a = document.createElement('a');
        a.target = '_blank';
        a.href = link;
        a.click();
        a.remove();
    }

    static calculateFirstPaymentAmount(
        data: CalculateFirstPaymentAmount
    ): number {
        let sumPayments: number =
            (parseFloat(data.netPay.toString()) -
                parseFloat(data.discount.toString())) /
                data.paymentPlanReceips +
            parseFloat(data.feePay.toString()) / data.paymentPlanReceips +
            parseFloat(data.noTaxPay.toString()) / data.paymentPlanReceips +
            parseFloat(data.extraPay.toString()) / data.paymentPlanReceips +
            parseFloat(data.coverPay.toString());
        const taxes: number = data.taxPay != 0 ? sumPayments * 0.16 : 0;
        const firstPaymentAmount = sumPayments + taxes;
        return firstPaymentAmount;
    }

    private static _replaceAll(
        search: string,
        replace: string,
        cad: string
    ): string {
        if (this.specialSimbols.includes(search)) {
            search = '\\' + search;
        }
        const searchRegExp = new RegExp(search, 'g');
        return cad.replace(searchRegExp, replace);
    }
}
