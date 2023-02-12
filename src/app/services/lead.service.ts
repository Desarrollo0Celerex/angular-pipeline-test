import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    leads: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/leads',
    totalLeads: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/leads/count',
    totalLeadsStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/leads/count',
    leadsGeneratedStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/leads/leads-generated'
}

@Injectable()
export class LeadService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

     /**
      * Get the leads from the API
      * @param  page            The page number
      * @param  fields          The fields to get
      * @param  leadStatusId    The filter to apply
      * @param  query           The search to do
      * @return                 The leads
      */
    getLeads(page: number = 1, fields: string = '', filters: string = '', query: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<HttpResponse> {
        const route: string = routes.leads(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!filters) params = params.append('filter', filters);
        if(!!query) params = params.append('search', 'contactName:' + query);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the total leads from the API
     * @param  leadStatusId The filter to apply
     * @return              The total clients
     */
    getTotalLeads(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalLeads(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getTotalLeadsStats(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<StatRangeData[]> {
        const route: string = routes.totalLeadsStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getLeadsGeneratedStats(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<StatRangeData[]> {
        const route: string = routes.leadsGeneratedStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }
}
