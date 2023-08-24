import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DEFAULT_PER_PAGE, EXTERNAL_POLICY_STATUS } from '@constants/global';
import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { UpdateExternalPolicyDataSend } from '@interfaces/update-external-policy-data-send.interface';
import { Policy } from '@core/interfaces/policy.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

const routes: any = {
    contactExternalPolicies: (workspaceId: string, contactId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/external-policies',
    contactExternalPolicy: (
        workspaceId: string,
        contactId: string,
        externalPolicyId: string
    ) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/external-policies/' +
        externalPolicyId,
    groupExternalPolicies: (workspaceId: string, groupId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/groups/' +
        groupId +
        '/external-policies',
    partnerExternalPolicies: (workspaceId: string, partnerId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/external-policies',
    totalWorkspaceExternalPolicies: (workspaceId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/external-policies/count',
    workspaceExternalPolicies: (workspaceId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/external-policies',
    workspaceExternalPolicyStats: (workspaceId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/external-policies/stats',
};

@Injectable()
export class ExternalPolicyService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    /**
     * Get the external policy
     * @param  contactId        The contact ID
     * @param  externalPolicyId The external policy ID
     * @param  fields           The fields
     * @return                  The external policy
     */
    getContactExternalPolicy(
        contactId: string,
        externalPolicyId: string,
        fields: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.contactExternalPolicy(
            this._workspaceId,
            contactId,
            externalPolicyId
        );
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                const policy: Policy = fields.includes('lifeTime')
                    ? this._calculatePolicyLifeTime(res.data)
                    : res.data;
                return { data: this._cleanObject(policy) };
            })
        );
    }

    /**
     * Get the contact external policies from the API
     * @param  contactId   The contact ID
     * @return             The policy data
     */
    getContactExternalPolicies(
        contactId: string,
        fields: string = '',
        filters: number[] = [],
        page: number = 1,
        perPage: number = DEFAULT_PER_PAGE
    ): Observable<HttpResponse> {
        const route: string = routes.contactExternalPolicies(
            this._workspaceId,
            contactId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if (!!fields) params = params.append('fields', fields);
        if (filters.length > 0)
            params = params.append('filter', this._getFilter(filters));
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if (fields.includes('lifeTime')) {
                    const policies: Policy[] = res.data.items.map(
                        (policy: Policy) => {
                            return this._calculatePolicyLifeTime(policy);
                        }
                    );
                    res.data.items = policies;
                }
                return res;
            })
        );
    }

    getExternalPolicyStats(
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ) {
        const route: string = routes.workspaceExternalPolicyStats(
            this._workspaceId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    /**
     * Get the group external policies from the API
     * @param  groupId   The group ID
     * @return             The policy data
     */
    getGroupExternalPolicies(
        groupId: string,
        fields: string = '',
        filters: number[] = [],
        page: number = 1,
        perPage: number = DEFAULT_PER_PAGE
    ): Observable<HttpResponse> {
        const route: string = routes.groupExternalPolicies(
            this._workspaceId,
            groupId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if (!!fields) params = params.append('fields', fields);
        if (filters.length > 0)
            params = params.append('filter', this._getFilter(filters));
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if (fields.includes('lifeTime')) {
                    const policies: Policy[] = res.data.items.map(
                        (policy: Policy) => {
                            return this._calculatePolicyLifeTime(policy);
                        }
                    );
                    res.data.items = policies;
                }
                return res;
            })
        );
    }

    /**
     * Get the partner external policies from the API
     * @param  partnerId   The partner ID
     * @return             The policy data
     */
    getPartnerExternalPolicies(
        partnerId: string,
        fields: string = '',
        filters: number[] = [],
        page: number = 1,
        perPage: number = DEFAULT_PER_PAGE
    ): Observable<HttpResponse> {
        const route: string = routes.partnerExternalPolicies(
            this._workspaceId,
            partnerId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if (!!fields) params = params.append('fields', fields);
        if (filters.length > 0)
            params = params.append('filter', this._getFilter(filters));
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if (fields.includes('lifeTime')) {
                    const policies: Policy[] = res.data.items.map(
                        (policy: Policy) => {
                            return this._calculatePolicyLifeTime(policy);
                        }
                    );
                    res.data.items = policies;
                }
                return res;
            })
        );
    }

    /**
     * Get the partner external policies from the API
     * @param  partnerId   The partner ID
     * @return             The policy data
     */
    getWorkspaceExternalPolicies(
        fields: string = '',
        filters: string = '',
        page: number = 1,
        perPage: number = DEFAULT_PER_PAGE,
        sortBy: string = '-createdAt',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.workspaceExternalPolicies(
            this._workspaceId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if (!!fields) params = params.append('fields', fields);
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if (fields.includes('lifeTime')) {
                    const policies: Policy[] = res.data.items.map(
                        (policy: Policy) => {
                            return this._calculatePolicyLifeTime(policy);
                        }
                    );
                    res.data.items = policies;
                }
                return res;
            })
        );
    }

    getTotalWorkspaceExternalPolicies(
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        const route: string = routes.totalWorkspaceExternalPolicies(
            this._workspaceId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    updateExternalPolicy(
        contactId: string,
        externalPolicyId: string,
        requestBody: UpdateExternalPolicyDataSend
    ): Observable<void> {
        const route: string = routes.contactExternalPolicy(
            this._workspaceId,
            contactId,
            externalPolicyId
        );
        return this._httpClient.put<void>(route, requestBody);
    }

    /**
     * Calculate the life time of the policy
     * @param  policy The policy to evaluate
     * @return        The policy with their life time value
     */
    private _calculatePolicyLifeTime(policy: Policy): Policy {
        let percentage: number;
        switch (policy.policyStatusId) {
            case EXTERNAL_POLICY_STATUS.CANCELLED:
                percentage = 100;
                break;

            default:
                const validityStartDate = moment(policy.validityStartDate);
                const validityEndDate = moment(policy.validityEndDate);
                const totalDays = validityEndDate.diff(
                    validityStartDate,
                    'days'
                );
                const daysPassed = moment().diff(validityStartDate, 'days');
                percentage =
                    daysPassed >= totalDays
                        ? 100
                        : Math.round((daysPassed * 100) / totalDays);
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
        for (let key in object) {
            object[key] = object[key] === null ? '' : object[key];
        }
        return object;
    }

    /**
     * Get the filter to apply
     * @param  filters The filters to apply
     * @return         The filter
     */
    private _getFilter(filters: number[]): string {
        const filterIds: string[] = filters.map((element: number) => {
            return 'externalPolicyStatusId[=]' + element;
        });
        return filterIds.join(',');
    }
}
