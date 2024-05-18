import { NOTIFICATION_TYPES } from '@notifier/services/notifier.service';

export interface SendNotificationModalData {
    modalData: {
        title: string;
        description: string;
        buttonLabel: string;
    };
    notificationTypeId: NOTIFICATION_TYPES;
    notificationData: {
        contactId?: string;
        policyId?: string;
        paymentId?: string;
        receiptPaidId?: string;
    };
}
