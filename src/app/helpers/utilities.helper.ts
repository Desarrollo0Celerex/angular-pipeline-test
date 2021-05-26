import { CONTENT_TYPES } from '@constants/global';

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
}
