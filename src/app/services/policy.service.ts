import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { RenewContactPolicyDataSend } from '@interfaces/renew-contact-policy-data-send.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    contactPolicies: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies',
    contactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId,
    updateContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/update',
    uploadContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/upload',
    completeContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/complete',
    endorseContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/endorse',
    cancelContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/cancel',
    renewContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/renew',
    deleteContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/delete',
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
     * Cancel the policy in the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID to complete
     * @param  requestBody The cancellation data
     * @return             Notice of action done
     */
    cancelPolicy(contactId: string, policyId: string, requestBody: FormData): Observable<void> {
        const route: string = routes.cancelContactPolicy(this._workspaceId, contactId, policyId);
        return this._httpClient.post<void>(route, requestBody);
    }

    /**
     * Complete the policy data in the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID to complete
     * @param  requestBody The policy data
     * @return             Notice of action done
     */
    completePolicy(contactId: string, policyId: string, requestBody: FormData): Observable<void> {
        const route: string = routes.completeContactPolicy(this._workspaceId, contactId, policyId);
        return this._httpClient.post<void>(route, requestBody);
    }

    /**
     * Delete the contact policy in the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID to delete
     * @return             Notice of action done
     */
    deleteContactPolicy(contactId: string, policyId: string): Observable<void> {
        const route: string = routes.deleteContactPolicy(this._workspaceId, contactId, policyId);
        return this._httpClient.post<void>(route, null);
    }

    /**
     * Endorse the policy in the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID to endorse
     * @param  requestBody The endorsement data
     * @return             Notice of action done
     */
    endorseContactPolicy(contactId: string, policyId: string, requestBody: FormData): Observable<void> {
        const route: string = routes.endorseContactPolicy(this._workspaceId, contactId, policyId);
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
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map( (res: HttpResponse) => {
                return { data: this._cleanObject(res.data) };
            })
        );
    }

    /**
     * Get the contact policies
     * @param  contactId The contact ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @param  filter    The filter to apply
     * @param  search    The search to do
     * @return           The contact policies
     */
    getContactPolicies(contactId: string, page: number = 1, fields: string = '', filters: number[] = [], query: string = ''): Observable<HttpResponse> {
        const route: string = routes.contactPolicies(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(filters.length > 0) params = params.append('filter', this._getFilter(filters));
        if(!!query) params = params.append('search', 'policyNumber:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Renew the policy in the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID
     * @return             The renewed policy ID
     */
    renewContactPolicy(contactId: string, policyId: string, requestBody: RenewContactPolicyDataSend): Observable<HttpResponse> {
        const route: string = routes.renewContactPolicy(this._workspaceId, contactId, policyId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }

    /**
     * Update the policy data in the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID to update
     * @param  requestBody The policy data
     * @return             Notice of action done
     */
    updateContactPolicy(contactId: string, policyId: string, requestBody: FormData): Observable<void> {
        const route: string = routes.updateContactPolicy(this._workspaceId, contactId, policyId);
        return this._httpClient.post<void>(route, requestBody);
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

    /**
     * Clean object
     * @param  object Object to clean
     * @return        Cleaned object
     */
    private _cleanObject(object: any): any {
        for(let key in object) {
            object[key] = (object[key] === null) ? '' : object[key];
        }
        return object;
    }

    /**
     * Get the filter to apply
     * @param  filters The filters to apply
     * @return         The filter
     */
    private _getFilter(filters: number[]): string {
        const filterIds: string[] = filters.map( (element: number) => {
            return 'policyStatusId[=]' + element;
        });
        return filterIds.join(',');
    }
}
