import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { POLICY_ENDPOINTS } from '@core/constants/endpoints';
import { ApiHttp } from '@core/http/api.http';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { Policy } from '@core/interfaces/policy.interface';

@Injectable({
    providedIn: 'root',
})
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
                POLICY_ENDPOINTS.contactPolicy(
                    this._workspaceId,
                    contactId,
                    policyId
                )
            );
    }

    getWorkspacePolicies(
        page: number = 1,
        perPage: number = 1,
        fields: string = '',
        filter: string = '',
        sortBy: string = '',
        search: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<HttpResponseItems> {
        return this._apiHttp
            .param('page', page.toString())
            .param('perPage', perPage.toString())
            .param('fields', fields)
            .param('filter', filter)
            .param('sortBy', sortBy)
            .param('search', search)
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .param('specialFilter', specialFilter)
            .get(POLICY_ENDPOINTS.workspacePolicies(this._workspaceId));
    }

    updatePolicyTitularContact(
        contactId: string,
        policyId: string,
        body: object
    ): Observable<void> {
        return this._apiHttp.put(
            POLICY_ENDPOINTS.policyTitularContact(
                this._workspaceId,
                contactId,
                policyId
            ),
            body
        );
    }
}
