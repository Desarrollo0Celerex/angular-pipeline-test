import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEFAULT_PER_PAGE } from '@constants/global';
import { environment } from '@env/environment';
import { CoverageStat } from '@interfaces/coverage-stat.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    clients: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/clients',
    totalClients: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/clients/count',
    totalClientsStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/clients/count',
    clientsStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/clients',
    coveragesStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/coverages'
}

@Injectable()
export class ClientService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Get the clients from the API
     * @param  page              The page number
     * @param  fields            The fields to get
     * @param  filters           The filter to apply
     * @param  query             The search to do
     * @return                   The clients
     */
   public getClients(page: number = 1, fields: string = '', filters: string = '', query: string = '', perPage: number = DEFAULT_PER_PAGE): Observable<HttpResponse> {
       const route: string = routes.clients(this._workspaceId);
       let params: HttpParams = new HttpParams();
       params = params.append('page', page.toString());
       params = params.append('perPage', perPage.toString());
       if(!!fields) params = params.append('fields', fields);
       if(!!filters) params = params.append('filter', filters);
       if(!!query) params = params.append('search', 'multiple:' + query);
       params = params.append('sortBy', '-createdAt');
       return this._httpClient.get<HttpResponse>(route, { params });
   }

   getCoveragesStats(): Observable<CoverageStat[]> {
       const route: string = routes.coveragesStats(this._workspaceId);
       return this._httpClient.get<HttpResponse>(route).pipe(
           map((res: HttpResponse) => { return res.data })
       );
   }

    /**
     * Get the total clients from the API
     * @param  clientStatusId The filter to apply
     * @return                The total clients
     */
    getTotalClients(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalClients(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getTotalClientsStats(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<StatRangeData[]> {
        const route: string = routes.totalClientsStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getClientsStats(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<StatRangeData[]> {
        const route: string = routes.clientsStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }
}
