import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { SendNotificationRequestBody } from '@notifier/interfaces/send-notification-request-body';
import { SendNotificationResponse } from '@notifier/interfaces/send-notification-response';

export enum NOTIFICATION_CHANNELS {
    EMAIL = 1,
    WHATSAPP = 2,
}

export enum NOTIFICATION_TYPES {
    POLICY_ISSUED = 1,
    OTHER = 100,
}

interface NotificationChannel {
    channelId: NOTIFICATION_CHANNELS;
    notificationTypeId: NOTIFICATION_TYPES;
    contact: string;
}

interface NotificationRequestBody {
    workspaceId?: string;
    contactId?: string;
    policyId?: string;
    notificationChannels?: NotificationChannel[];
}

interface NotificationData {
    contactId?: string;
    policyId?: string;
    email?: string;
    phoneCode?: string;
    phoneNumber?: string;
}

@Injectable()
export class NotifierService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    sendNotification(
        requestBody: SendNotificationRequestBody
    ): Observable<SendNotificationResponse[]> {
        const endpoint = environment.agenthosNotifier.apiUrl;
        requestBody.workspaceId = this._workspaceId;
        return this._apiHttp.post(endpoint, requestBody);
    }

    sendNotificationLegacy(
        notificationType: NOTIFICATION_TYPES,
        data: NotificationData
    ): Observable<void | null> {
        let requestBody: NotificationRequestBody;

        switch (notificationType) {
            case NOTIFICATION_TYPES.POLICY_ISSUED:
                const notificationChannels = this._generateNotificationChannels(
                    NOTIFICATION_TYPES.POLICY_ISSUED,
                    data
                );
                requestBody = {
                    workspaceId: this._workspaceId,
                    contactId: data.contactId,
                    policyId: data.policyId,
                    notificationChannels,
                };
                return this._sendNotification(requestBody!);

            default:
                return of(null);
        }
    }

    private _generateNotificationChannels(
        notificationType: NOTIFICATION_TYPES,
        data: NotificationData
    ): NotificationChannel[] {
        let notificationChannels: NotificationChannel[] = [];
        if (data.email) {
            notificationChannels.push({
                channelId: NOTIFICATION_CHANNELS.EMAIL,
                notificationTypeId: notificationType,
                contact: data.email,
            });
        }
        if (data.phoneCode && data.phoneNumber) {
            notificationChannels.push({
                channelId: NOTIFICATION_CHANNELS.WHATSAPP,
                notificationTypeId: notificationType,
                contact: data.phoneCode + data.phoneNumber,
            });
        }
        return notificationChannels;
    }

    private _sendNotification(
        requestBody: NotificationRequestBody
    ): Observable<void> {
        const endpoint = environment.agenthosNotifier.apiUrl;
        requestBody.workspaceId = this._workspaceId;
        return this._apiHttp.post(endpoint, requestBody);
    }
}
