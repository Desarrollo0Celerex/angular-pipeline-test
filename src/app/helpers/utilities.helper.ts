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
                isHistoryContent = true;
                break;
            default:
                isHistoryContent = false;
        }
        return isHistoryContent;
    }
}
