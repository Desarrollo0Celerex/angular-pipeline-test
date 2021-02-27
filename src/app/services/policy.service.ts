import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CompletePolicyDataSend } from '@interfaces/complete-policy-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    contactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId,
    uploadContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/upload',
    completeContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/complete',
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
     * Complete the policy data in the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID to complete
     * @param  requestBody The policy data
     * @return             Notice of action done
     */
    completePolicy(contactId: string, policyId: string, requestBody: CompletePolicyDataSend): Observable<void> {
        const route: string = routes.completeContactPolicy(this._workspaceId, contactId, policyId);
        return this._httpClient.post<void>(route, requestBody);
    }

    /**
     * Get the contact policy from the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID to update
     * @return             The policy data
     */
    getContactPolicy(contactId: string, policyId: string, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.contactPolicy(this._workspaceId, contactId, policyId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Upload the contact policy in the API
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
