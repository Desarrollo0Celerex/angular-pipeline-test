import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { Observable } from 'rxjs';
import { SendPolicyNotification } from '../interfaces/send-policy-notification.interface';
import { environment } from '@env/environment';
import { Policy } from '../interfaces/policy.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { UpdatePolicyContact } from '@policies/interfaces/update-policy-contact.interface';

const ENDPOINTS = {
    contactPolicy: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}`,
    policyContact: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/titular-contact`,
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

    updatePolicyContact(
        contactId: string,
        policyId: string,
        requestBody: UpdatePolicyContact
    ): Observable<void> {
        return this._apiHttp.put(
            ENDPOINTS.policyContact(this._workspaceId, contactId, policyId),
            requestBody
        );
    }
}
