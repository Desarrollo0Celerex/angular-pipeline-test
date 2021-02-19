import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { AuthService } from '@services/auth.service';

const routes: any = {
    uploadContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/upload'
}

@Injectable()
export class PolicyService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Upload the policy
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID to update
     * @param  requestBody The policy data
     * @return             Notice of action done
     */
    uploadContactPolicy(contactId: string, policyId: string, requestBody: FormData): Observable<void> {
        const route: string = routes.uploadContactPolicy(this._workspaceId, contactId, policyId);
        return this._httpClient.post<void>(route, requestBody);
    }
}
