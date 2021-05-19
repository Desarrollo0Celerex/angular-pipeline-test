import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { CreateSinister } from '@interfaces/create-sinister.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { AuthService } from '@services/auth.service';

import * as moment from 'moment';

const routes: any = {
    sinister: (workspaceId: string, sinisterId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/sinisters/' +sinisterId,
    sinisters: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/sinisters',
    totalSinisters: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/sinisters/count',
    policySinisters: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/sinisters'
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
}
