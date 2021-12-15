import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEFAULT_PER_PAGE, POLICY_STATUS } from '@constants/global';
import { environment } from '@env/environment';
import { CreatePolicyData } from '@interfaces/create-policy-data.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Policy } from '@interfaces/policy.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { RenewContactPolicyDataSend } from '@interfaces/renew-contact-policy-data-send.interface';
import { UpdatePolicyStatusDataSend } from '@interfaces/update-policy-status-data-send.interface';
import { Stat } from '@interfaces/stat.interface';
import { AuthService } from '@services/auth.service';

import * as moment from 'moment';

const routes: any = {
    contactPolicies: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies',
    contactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId,
    updateContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/update',
    uploadContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/upload',
    completeContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/complete',
    endorseContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/endorse',
    cancelContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/cancel',
    renewContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/renew',
    deleteIncompletePolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/incomplete',
    deleteActivePolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/active',
    reissueContactPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/reissue',
    contactHistoryPolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/history',
    policies: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/policies',
    policySinisters: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/sinisters',
    totalContactPolicies: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/count',
    updateCompletePolicy: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/update-complete',
    updatePolicyStatus: (workspaceId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/policies/' + policyId + '/policy-status',
    totalWorkspacePolicies: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/policies/count',
    policyTracker: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/tracker',
    groupPolicies: (workspaceId: string, groupId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/groups/' + groupId + '/policies',
    partnerPolicies: (workspaceId: string, partnerId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners/' + partnerId + '/policies',
    workspacePoliciesRenews: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/policies/renews',
    renewalsReport: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/policies/renews/report',
    totalWorkspacePoliciesToRenew: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/policies/renews/count',
    policiesStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/policies',
    insurancesPoliciesStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/insurances/policies',
    policiesRenewsStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/policies/renews',
    cancelledPoliciesStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/policies/cancelled',
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
     * Create a policy in the API
     * @param  contactId   The contact ID
     * @param  requestBody The policy details
     * @return             The created policy ID
     */
    createPolicy(contactId: string, requestBody: CreatePolicyData): Observable<HttpResponse> {
        const route: string = routes.contactPolicies(this._workspaceId, contactId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }

    /**
     * Delete the contact policy in the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID to delete
     * @return             Notice of action done
     */
    deleteIncompletePolicy(contactId: string, policyId: string): Observable<void> {
        const route: string = routes.deleteIncompletePolicy(this._workspaceId, contactId, policyId);
        return this._httpClient.delete<void>(route);
    }

    /**
     * Delete the contact complete policy in the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID to delete
     * @return             Notice of action done
     */
    deleteActivePolicy(contactId: string, policyId: string): Observable<void> {
        const route: string = routes.deleteActivePolicy(this._workspaceId, contactId, policyId);
        return this._httpClient.delete<void>(route);
    }

    /**
     * Download a policy from the storage
     * @param  policyUrl The policy url
     * @return           The policy file
     */
    downloadPolicy(policyUrl: string): Observable<any> {
        return this._httpClient.get(policyUrl, {responseType: 'blob'});
    }

    downloadRenewalsReport(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = '', sortBy: string = '-createdAt') {
        const route: string = routes.renewalsReport(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if(!!sortBy) params = params.append('sortBy', sortBy);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params
        };
        return this._httpClient.get(route, fileParams).toPromise();
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

    getCancelledPoliciesStats(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<RangeStat[]> {
        const route: string = routes.cancelledPoliciesStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
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
                const policy: Policy = (fields.includes('lifeTime')) ? this._calculatePolicyLifeTime(res.data) : res.data;
                return { data: this._cleanObject(policy) };
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
     * @param  perPage   The items per page
     * @return           The contact policies
     */
    getContactPolicies(contactId: string, page: number = 1, fields: string = '', filters: number[] = [], query: string = '', perPage: number = DEFAULT_PER_PAGE): Observable<HttpResponse> {
        const route: string = routes.contactPolicies(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if(!!fields) params = params.append('fields', fields);
        if(filters.length > 0) params = params.append('filter', this._getFilter(filters));
        if(!!query) params = params.append('search', 'policyNumber:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => {
                if(fields.includes('lifeTime')) {
                    const policies: Policy[] = res.data.items.map( (policy: Policy) => {
                        return this._calculatePolicyLifeTime(policy);
                    })
                    res.data.items = policies;
                }
                return res;
            })
        )
    }

    /**
     * Get the history policy
     * @param  contactId The contact ID
     * @param  policyId  The policy ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @return           The history policy
     */
    getContactHistoryPolicy(contactId: string, policyId: string, page: number = 1, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.contactHistoryPolicy(this._workspaceId, contactId, policyId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        params = params.append('sortBy', 'createdAt');
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Get the contact policies
     * @param  contactId The contact ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @param  filter    The filter to apply
     * @param  search    The search to do
     * @param  perPage   The items per page
     * @return           The contact policies
     */
    getGroupPolicies(groupId: string, page: number = 1, fields: string = '', filters: number[] = [], query: string = '', perPage: number = DEFAULT_PER_PAGE): Observable<HttpResponse> {
        const route: string = routes.groupPolicies(this._workspaceId, groupId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if(!!fields) params = params.append('fields', fields);
        if(filters.length > 0) params = params.append('filter', this._getFilter(filters));
        if(!!query) params = params.append('search', 'policyNumber:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => {
                if(fields.includes('lifeTime')) {
                    const policies: Policy[] = res.data.items.map( (policy: Policy) => {
                        return this._calculatePolicyLifeTime(policy);
                    })
                    res.data.items = policies;
                }
                return res;
            })
        )
    }

    getInsurancesPoliciesStats(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<Stat[]> {
        const route: string = routes.insurancesPoliciesStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    /**
     * Get the contact policies
     * @param  contactId The contact ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @param  filter    The filter to apply
     * @param  search    The search to do
     * @param  perPage   The items per page
     * @return           The contact policies
     */
    getPartnerPolicies(partnerId: string, page: number = 1, fields: string = '', filters: number[] = [], query: string = '', perPage: number = DEFAULT_PER_PAGE): Observable<HttpResponse> {
        const route: string = routes.partnerPolicies(this._workspaceId, partnerId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if(!!fields) params = params.append('fields', fields);
        if(filters.length > 0) params = params.append('filter', this._getFilter(filters));
        if(!!query) params = params.append('search', 'policyNumber:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => {
                if(fields.includes('lifeTime')) {
                    const policies: Policy[] = res.data.items.map( (policy: Policy) => {
                        return this._calculatePolicyLifeTime(policy);
                    })
                    res.data.items = policies;
                }
                return res;
            })
        )
    }

    getPendingRenovationsStats(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<RangeStat[]> {
        const route: string = routes.policiesRenewsStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    /**
     * Get the policies
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @param  filter    The filter to apply
     * @param  search    The search to do
     * @return           The policies
     */
    getPolicies(page: number = 1, fields: string = '', filters: string = '', query: string = '', sortBy: string = '-createdAt', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<HttpResponse> {
        const route: string = routes.policies(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!filters) params = params.append('filter', filters);
        if(!!query) params = params.append('search', 'policyNumber:' + query);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => {
                if(fields.includes('lifeTime')) {
                    const policies: Policy[] = res.data.items.map( (policy: Policy) => {
                        return this._calculatePolicyLifeTime(policy);
                    })
                    res.data.items = policies;
                }
                return res;
            })
        )
    }

    getPoliciesStats(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<RangeStat[]> {
        const route: string = routes.policiesStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    /**
     * Get the history policy
     * @param  contactId The contact ID
     * @param  policyId  The policy ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @return           The history policy
     */
    getPolicySinisters(contactId: string, policyId: string, page: number = 1, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.policySinisters(this._workspaceId, contactId, policyId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        params = params.append('sortBy', 'createdAt');
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Get the policies to renew
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @param  filter    The filter to apply
     * @param  search    The search to do
     * @return           The policies
     */
    getPoliciesToRenew(page: number = 1, fields: string = '', filters: string = '', query: string = '', sortBy: string = '-createdAt', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<HttpResponse> {
        const route: string = routes.workspacePoliciesRenews(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!filters) params = params.append('filter', filters);
        if(!!query) params = params.append('search', 'policyNumber:' + query);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => {
                if(fields.includes('lifeTime')) {
                    const policies: Policy[] = res.data.items.map( (policy: Policy) => {
                        return this._calculatePolicyLifeTime(policy);
                    })
                    res.data.items = policies;
                }
                return res;
            })
        )
    }


    /**
     * Get the history policy
     * @param  contactId The contact ID
     * @param  policyId  The policy ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @return           The history policy
     */
    getPolicyTracker(contactId: string, policyId: string, page: number = 1, fields: string = '', filters: string = ''): Observable<HttpResponse> {
        const route: string = routes.policyTracker(this._workspaceId, contactId, policyId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!filters) params = params.append('filter', filters);
        params = params.append('sortBy', 'validityStartDate');
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Get the total contact policies
     * @param  contactId The contact ID
     * @param  filters   The filters to apply
     * @return           The total contact policies
     */
    getTotalContactPolicies(contactId: string, filters: number[] = []): Observable<HttpResponse> {
        const route: string = routes.totalContactPolicies(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        if(filters.length > 0) params = params.append('filter', this._getFilter(filters));
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    getTotalWorkspacePolicies(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalWorkspacePolicies(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getTotalWorkspacePoliciesToRenew(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalWorkspacePoliciesToRenew(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    /**
     * Reissue the policy in the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID
     * @return             The reissued policy ID
     */
    reissueContactPolicy(contactId: string, policyId: string, requestBody: RenewContactPolicyDataSend): Observable<HttpResponse> {
        const route: string = routes.reissueContactPolicy(this._workspaceId, contactId, policyId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
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
     * Update the complete policy data in the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID to update
     * @param  requestBody The policy data
     * @return             Notice of action done
     */
    updateCompletePolicy(contactId: string, policyId: string, requestBody: FormData): Observable<void> {
        const route: string = routes.updateCompletePolicy(this._workspaceId, contactId, policyId);
        return this._httpClient.post<void>(route, requestBody);
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

    updatePolicyStatus(policyId: string, requestBody: UpdatePolicyStatusDataSend): Observable<void> {
        const route: string = routes.updatePolicyStatus(this._workspaceId, policyId);
        return this._httpClient.put<void>(route, requestBody);
    }

    /**
     * Calculate the life time of the policy
     * @param  policy The policy to evaluate
     * @return        The policy with their life time value
     */
    private _calculatePolicyLifeTime(policy: Policy): Policy {
        let percentage: number;
        switch(policy.policyStatusId) {
            case POLICY_STATUS.CANCELLED:
                percentage = 100;
            break;

            default:
                const validityStartDate = moment(policy.validityStartDate);
                const validityEndDate = moment(policy.validityEndDate);
                const totalDays = validityEndDate.diff(validityStartDate, 'days');
                const daysPassed = moment().diff(validityStartDate, 'days');
                percentage = (daysPassed >= totalDays) ? 100 : Math.round(daysPassed * 100 / totalDays);
        }
        policy.lifeTime = percentage;
        return policy;
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
