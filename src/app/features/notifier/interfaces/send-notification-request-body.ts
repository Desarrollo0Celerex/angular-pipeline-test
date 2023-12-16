import { NotificationChannel } from './notification-channel';

export interface SendNotificationRequestBody {
    workspaceId?: string;
    contactId?: string;
    policyId?: string;
    notificationChannels: NotificationChannel[];
}
