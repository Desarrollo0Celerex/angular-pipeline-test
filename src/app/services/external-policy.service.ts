import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DEFAULT_PER_PAGE, EXTERNAL_POLICY_STATUS } from '@constants/global';
import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Policy } from '@interfaces/policy.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    contactExternalPolicies: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/external-policies',
}

@Injectable()
export class ExternalPolicyService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    /**
     * Get the contact external policies from the API
     * @param  contactId   The contact ID
     * @return             The policy data
     */
    getContactExternalPolicies(contactId: string, fields: string = '', filters: number[] = [], page: number = 1, perPage: number = DEFAULT_PER_PAGE): Observable<HttpResponse> {
        const route: string = routes.contactExternalPolicies(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if(!!fields) params = params.append('fields', fields);
        if(filters.length > 0) params = params.append('filter', this._getFilter(filters));
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
     * Calculate the life time of the policy
     * @param  policy The policy to evaluate
     * @return        The policy with their life time value
     */
    private _calculatePolicyLifeTime(policy: Policy): Policy {
        let percentage: number;
        switch(policy.policyStatusId) {
            case EXTERNAL_POLICY_STATUS.CANCELLED:
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
     * Get the filter to apply
     * @param  filters The filters to apply
     * @return         The filter
     */
    private _getFilter(filters: number[]): string {
        const filterIds: string[] = filters.map( (element: number) => {
            return 'externalPolicyStatusId[=]' + element;
        });
        return filterIds.join(',');
    }
}
