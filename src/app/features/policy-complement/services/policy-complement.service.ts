import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PolicyComplement } from '@policy-complement/interfaces/policy-complement.interface';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { map } from 'rxjs/operators';

const ENDPOINTS = {
    policyComplement: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        policyComplementId: string
    ) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/complements/${policyComplementId}`,
    policyComplements: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/complements`,
    policyComplementsTotal: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/complements/total`,
};

@Injectable()
export class PolicyComplementService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    deletePolicyComplement(
        contactId: string,
        policyId: string,
        policyComplementId: string
    ): Observable<void> {
        return this._apiHttp.delete(
            ENDPOINTS.policyComplement(
                this._workspaceId,
                contactId,
                policyId,
                policyComplementId
            )
        );
    }

    getPolicyComplements(
        contactId: string,
        policyId: string,
        fields: string = '',
        sortBy: string = '-createdAt'
    ): Observable<PolicyComplement[]> {
        return this._apiHttp
            .param('fields', fields)
            .param('sortBy', sortBy)
            .get(
                ENDPOINTS.policyComplements(
                    this._workspaceId,
                    contactId,
                    policyId
                )
            )
            .pipe(
                map((res: HttpResponseItems) => {
                    return res.items;
                })
            );
    }

    uploadPolicyComplement(
        contactId: string,
        policyId: string,
        requestBody: FormData
    ): Observable<PolicyComplement> {
        return this._apiHttp.post(
            ENDPOINTS.policyComplements(this._workspaceId, contactId, policyId),
            requestBody
        );
    }
}
