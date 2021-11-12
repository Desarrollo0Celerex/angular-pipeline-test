import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { CreateSinister } from '@interfaces/create-sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterStat } from '@interfaces/sinister-stat.interface';
import { AuthService } from '@services/auth.service';

import * as moment from 'moment';

const routes: any = {
    sinister: (workspaceId: string, sinisterId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/sinisters/' +sinisterId,
    sinisters: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/sinisters',
    totalSinisters: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/sinisters/count',
    contactSinisters: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/sinisters',
    groupSinisters: (workspaceId: string, groupId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/groups/' + groupId + '/sinisters',
    policySinisters: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/sinisters',
    policySinister: (workspaceId: string, contactId: string, policyId: string, sinisterId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/sinisters/' + sinisterId,
    finalizeSinister: (workspaceId: string, contactId: string, policyId: string, sinisterId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/sinisters/' + sinisterId + '/finalize',
    reactivateSinister: (workspaceId: string, contactId: string, policyId: string, sinisterId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/sinisters/' + sinisterId + '/reactivate',
    sinisterLogs: (workspaceId: string, contactId: string, policyId: string, sinisterId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/sinisters/' + sinisterId + '/logs',
    sinistersStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/sinisters'
}

@Injectable()
export class SinisterService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    /**
     * Create a sinister from the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID
     * @param  requestBody The request body
     * @return             Notice of action done
     */
    createSinister(contactId: string, policyId: string, requestBody: CreateSinister): Observable<void> {
        const route: string = routes.policySinisters(this._workspaceId, contactId, policyId);
        return this._httpClient.post<void>(route, requestBody);
    }

    /**
     * Finalize a sinister from the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID
     * @param  sinisterId  The sinister ID
     * @param  requestBody The request body
     * @return             Notice of action done
     */
    finalizeSinister(contactId: string, policyId: string, sinisterId: string, requestBody: FormData): Observable<void> {
        const route: string = routes.finalizeSinister(this._workspaceId, contactId, policyId, sinisterId);
        return this._httpClient.post<void>(route, requestBody);
    }

    /**
     * Get the contact sinisters
     * @param  contactId The contact ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @param  filter    The filter to apply
     * @param  search    The search to do
     * @return           The contact sinisters
     */
    getContactSinisters(contactId: string, page: number = 1, fields: string = '', filters: number[] = [], query: string = ''): Observable<HttpResponse> {
        const route: string = routes.contactSinisters(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(filters.length > 0) params = params.append('filter', this._getFilter(filters));
        if(!!query) params = params.append('search', 'sinisterNumber:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => {
                if(fields.includes('lifeTime')) {
                    const sinisters: Sinister[] = res.data.items.map( (sinister: Sinister) => {
                        return this._calculatePolicyLifeTime(sinister);
                    })
                    res.data.items = sinisters;
                }
                return res;
            })
        )
    }

    /**
     * Get the group sinisters
     * @param  groupId The group ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @param  filter    The filter to apply
     * @param  search    The search to do
     * @return           The group sinisters
     */
    getGroupSinisters(groupId: string, page: number = 1, fields: string = '', filters: number[] = [], query: string = ''): Observable<HttpResponse> {
        const route: string = routes.groupSinisters(this._workspaceId, groupId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(filters.length > 0) params = params.append('filter', this._getFilter(filters));
        if(!!query) params = params.append('search', 'sinisterNumber:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => {
                if(fields.includes('lifeTime')) {
                    const sinisters: Sinister[] = res.data.items.map( (sinister: Sinister) => {
                        return this._calculatePolicyLifeTime(sinister);
                    })
                    res.data.items = sinisters;
                }
                return res;
            })
        )
    }

    /**
     * Get the policy sinister
     * @param  contactId  The contact ID
     * @param  policyId   The policy ID
     * @param  sinisterId The sinister ID
     * @param  fields     The fields to get
     * @return            The policy sinister
     */
    getPolicySinister(contactId: string, policyId: string, sinisterId: string, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.policySinister(this._workspaceId, contactId, policyId, sinisterId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Get the sinister logs
     * @param  contactId    The contact ID
     * @param  policyId     The policy ID
     * @param  sinisterId   The sinister ID
     * @param  page         The page to get
     * @param  fields       The fields to get
     * @return              The history policy
     */
    getSinisterLogs(contactId: string, policyId: string, sinisterId: string, page: number = 1, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.sinisterLogs(this._workspaceId, contactId, policyId, sinisterId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        params = params.append('sortBy', 'createdAt');
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Get the total sinoster from the API
     * @param  sinisterStatusId The filter to apply
     * @return                  The total clients
     */
    getTotalSinisters(sinisterStatusId: number = 0): Observable<HttpResponse> {
        const route: string = routes.totalSinisters(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!sinisterStatusId) params = params.append('filter', 'sinisterStatusId[=]' + sinisterStatusId);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getTotalWorkspaceSinisters(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalSinisters(this._workspaceId);
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
     * Get the sinisters from the API
     * @param  page            The page number
     * @param  fields          The fields to get
     * @param  sinisterStatusId    The filter to apply
     * @param  query           The search to do
     * @return                 The sinisters
     */
   getSinisters(page: number = 1, fields: string = '', sinisterStatusId: number = 0, query: string = ''): Observable<HttpResponse> {
       const route: string = routes.sinisters(this._workspaceId);
       let params: HttpParams = new HttpParams();
       params = params.append('page', page.toString());
       if(!!fields) params = params.append('fields', fields);
       if(!!sinisterStatusId) params = params.append('filter', 'sinisterStatusId[=]' + sinisterStatusId);
       if(!!query) params = params.append('search', 'sinisterNumber:' + query);
       params = params.append('sortBy', '-createdAt');
       return this._httpClient.get<HttpResponse>(route, { params }).pipe(
           map((res: HttpResponse) => {
               if(fields.includes('lifeTime')) {
                   const sinisters: Sinister[] = res.data.items.map( (sinister: Sinister) => {
                       return this._calculatePolicyLifeTime(sinister);
                   })
                   res.data.items = sinisters;
               }
               return res;
           })
       )
   }

   /**
    * Reactivate a sinister from the API
    * @param  contactId   The contact ID
    * @param  policyId    The policy ID
    * @param  sinisterId  The sinister ID
    * @param  requestBody The request body
    * @return             Notice of action done
    */
   reactivateSinister(contactId: string, policyId: string, sinisterId: string, requestBody: FormData): Observable<void> {
       const route: string = routes.reactivateSinister(this._workspaceId, contactId, policyId, sinisterId);
       return this._httpClient.post<void>(route, requestBody);
   }

   /**
    * Update the policy sinister
    * @param  sinisterData The sinister data
    * @param  requestBody  The sinister data to update
    * @return              Notification of action done
    */
   updatePolicySinister(sinisterData: SinisterDataSend, requestBody: CreateSinister ): Observable<void> {
       const route: string = routes.policySinister(this._workspaceId, sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId);
       return this._httpClient.put<void>(route, requestBody);
   }

   /**
    * Get the sinisters stats
    * @return         The sinisters stats
    */
   getSinistersStats(): Observable<SinisterStat[]> {
       const route: string = routes.sinistersStats(this._workspaceId);
       return this._httpClient.get<HttpResponse>(route).pipe(
           map((res: HttpResponse) => res.data )
       );
   }

   /**
    * Calculate the life time of the policy
    * @param  policy The policy to evaluate
    * @return        The policy with their life time value
    */
   private _calculatePolicyLifeTime(sinister: Sinister): Sinister {
       let percentage: number;
       const validityStartDate = moment(sinister.validityStartDate);
       const validityEndDate = moment(sinister.validityEndDate);
       const totalDays = validityEndDate.diff(validityStartDate, 'days');
       const daysPassed = moment().diff(validityStartDate, 'days');
       percentage = (daysPassed >= totalDays) ? 100 : Math.round(daysPassed * 100 / totalDays);
       sinister.lifeTime = percentage;
       return sinister;
   }

   /**
    * Get the filter to apply
    * @param  filters The filters to apply
    * @return         The filter
    */
   private _getFilter(filters: number[]): string {
       const filterIds: string[] = filters.map( (element: number) => {
           return 'sinisterStatusId[=]' + element;
       });
       return filterIds.join(',');
   }
}
