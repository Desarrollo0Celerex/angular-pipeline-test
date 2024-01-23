import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { Observable } from 'rxjs';
import { SendPolicyNotification } from '../interfaces/send-policy-notification.interface';
import { environment } from '@env/environment';
import { Policy } from '../interfaces/policy.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { UpdatePolicyContact } from '@policy/interfaces/update-policy-contact.interface';
import { POLICY_ENDPOINTS } from '@policy/constants/endpoints';
import { CreatePolicyRequestBody } from '@policy/interfaces/create-policy-request-body.interface';

@Injectable()
export class PolicyService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    createPolicy(
        contactId: string,
        requestBody: CreatePolicyRequestBody
    ): Observable<string> {
        return this._apiHttp.post(
            POLICY_ENDPOINTS.contactPolicies(this._workspaceId, contactId),
            requestBody
        );
    }

    deleteIncompletePolicy(
        contactId: string,
        policyId: string
    ): Observable<void> {
        return this._apiHttp.delete(
            POLICY_ENDPOINTS.incompletePolicy(
                this._workspaceId,
                contactId,
                policyId
            )
        );
    }

    deleteActivePolicy(contactId: string, policyId: string): Observable<void> {
        return this._apiHttp.delete(
            POLICY_ENDPOINTS.activePolicy(
                this._workspaceId,
                contactId,
                policyId
            )
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
                POLICY_ENDPOINTS.contactPolicy(
                    this._workspaceId,
                    contactId,
                    policyId
                )
            );
    }

    sendPolicyNotification(
        requestBody: SendPolicyNotification
    ): Observable<string> {
        return this._apiHttp.post(
            POLICY_ENDPOINTS.policyNotification,
            requestBody
        );
    }

    updatePolicyContact(
        contactId: string,
        policyId: string,
        requestBody: UpdatePolicyContact
    ): Observable<void> {
        return this._apiHttp.put(
            POLICY_ENDPOINTS.policyContact(
                this._workspaceId,
                contactId,
                policyId
            ),
            requestBody
        );
    }
}
