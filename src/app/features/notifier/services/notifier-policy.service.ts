import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { AuthService } from '@features-legacy/auth/services/auth.service';

export enum NOTIFICATION_CHANNELS {
    EMAIL = 1,
    WHATSAPP = 2,
}

export enum NOTIFICATION_TYPES {
    POLICY_ISSUED = 'POLICY_ISSUED',
    OTHER = 'OTHER',
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

@Injectable()
export class NotifierPolicyService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    sendNotification(
        notificationType: NOTIFICATION_TYPES,
        contactId: string,
        policyId: string,
        email: string
    ): Observable<void> {
        const endpoint = environment.agenthosNotifier.apiUrl;
        let requestBody: NotificationRequestBody;
        switch (notificationType) {
            case NOTIFICATION_TYPES.POLICY_ISSUED:
                requestBody = {
                    workspaceId: this._workspaceId,
                    contactId,
                    policyId,
                    notificationChannels: [
                        {
                            channelId: NOTIFICATION_CHANNELS.EMAIL,
                            notificationTypeId:
                                NOTIFICATION_TYPES.POLICY_ISSUED,
                            contact: email,
                        },
                    ],
                };
                return this._sendNotification(endpoint, requestBody);
        }
        return of();
    }

    private _sendNotification(
        endpoint: string,
        requestBody: NotificationRequestBody
    ): Observable<void> {
        return this._apiHttp.post(endpoint, requestBody);
    }
}
