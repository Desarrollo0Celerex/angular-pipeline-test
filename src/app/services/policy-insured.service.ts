import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AuthService } from '@services/auth.service';

const ROUTES = {
    policyInsureds: (workspaceId: string, contactId: string, policyId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insureds`,
    policyInsured: (workspaceId: string, contactId: string, policyId: string, policyInsuredId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insureds/${policyInsuredId}`
}

@Injectable()
export class PolicyInsuredService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) { }

    createPolicyInsured(contactId: string, policyId: string, requestBodies: FormData[]): Observable<void> {
        const route: string = ROUTES.policyInsureds(this._workspaceId, contactId, policyId);
        return from(requestBodies).pipe(
            concatMap(requestBody => <Observable<void>> this._httpClient.post<void>(route, requestBody) )
        )
    }

    deletePolicyInsured(contactId: string, policyId: string, policyInsuredId: string): Observable<void> {
        const route: string = ROUTES.policyInsured(this._workspaceId, contactId, policyId, policyInsuredId);
        return this._httpClient.delete<void>(route);
    }

    updatePolicyInsureds(contactId: string, policyId: string, requestBodies: FormData[]): Observable<void> {
        return from(requestBodies).pipe(
            concatMap((requestBody: FormData) => {
                const policyInsuredId: string = requestBody.get('policyInsuredId')!.toString();
                const route: string = ROUTES.policyInsured(this._workspaceId, contactId, policyId, policyInsuredId);
                return <Observable<void>> this._httpClient.post<void>(route, requestBody);
            })
        )
    }
}
