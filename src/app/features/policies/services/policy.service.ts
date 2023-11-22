import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { Observable } from 'rxjs';
import { SendPolicyNotification } from '../interfaces/send-policy-notification.interface';
import { environment } from '@env/environment';
import { Policy } from '../interfaces/policy.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { UpdatePolicyContact } from '@policies/interfaces/update-policy-contact.interface';

const ENDPOINTS = {
    activePolicy: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/active`,
    contactPolicy: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}`,
    incompletePolicy: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/incomplete`,
    policyContact: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/titular-contact`,
    policyNotification: `${environment.agenthosNotifications.apiUrl}/policies`,
};

@Injectable()
export class PolicyService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    deleteIncompletePolicy(
        contactId: string,
        policyId: string
    ): Observable<void> {
        return this._apiHttp.delete(
            ENDPOINTS.incompletePolicy(this._workspaceId, contactId, policyId)
        );
    }

    deleteActivePolicy(contactId: string, policyId: string): Observable<void> {
        return this._apiHttp.delete(
            ENDPOINTS.activePolicy(this._workspaceId, contactId, policyId)
        );
    }

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
