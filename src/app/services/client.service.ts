import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    clients: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/clients',
    totalClients: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/clients/count',
    clientsStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/clients'
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
   public getClients(page: number = 1, fields: string = '', filters: string = '', query: string = ''): Observable<HttpResponse> {
       const route: string = routes.clients(this._workspaceId);
       let params: HttpParams = new HttpParams();
       params = params.append('page', page.toString());
       if(!!fields) params = params.append('fields', fields);
       if(!!filters) params = params.append('filter', filters);
       if(!!query) params = params.append('search', 'contactName:' + query);
       params = params.append('sortBy', '-createdAt');
       return this._httpClient.get<HttpResponse>(route, { params });
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

    getClientsGeneratedStats(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<RangeStat[]> {
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
