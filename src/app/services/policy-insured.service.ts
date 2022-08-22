import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AuthService } from '@services/auth.service';

const ROUTES = {
    policyInsureds: (workspaceId: string, contactId: string, policyId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insureds`,
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
}
