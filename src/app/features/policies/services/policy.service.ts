import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { Observable } from 'rxjs';
import { SendPolicyNotification } from '../interfaces/send-policy-notification.interface';
import { environment } from '@env/environment';
import { Policy } from '../interfaces/policy.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

const ENDPOINTS = {
    contactPolicy: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}`,
    policyNotification: `${environment.agenthosNotifier.apiUrl}/policies`,
};

@Injectable()
export class PolicyService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getContactPolicy(
        contactId: string,
        policyId: string,
        fields: string = ''
    ): Observable<Policy> {
        return this._apiHttp
            .param('fields', fields)
            .get(
                ENDPOINTS.contactPolicy(this._workspaceId, contactId, policyId)
            );
    }

    sendPolicyNotification(
        requestBody: SendPolicyNotification
    ): Observable<string> {
        return this._apiHttp.post(ENDPOINTS.policyNotification, requestBody);
    }
}
