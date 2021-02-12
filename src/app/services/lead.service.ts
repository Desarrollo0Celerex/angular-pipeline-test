import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    leads: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/leads',
    totalLeads: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/leads/count'
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
     * @param  filter The filter to apply
     * @param  fields The fields to get
     * @return        The leads
     */
    public getLeads(filter: number = 0, page: number = 1, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.leads(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        params = params.append('filter', 'leadStatusId[=]' + filter);
        params = params.append('page', page+'');
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the total leads from the API
     * @return The total leads
     */
    getTotalLeads(leadStatusId: number = 0): Observable<HttpResponse> {
        const route: string = routes.totalLeads(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('filter', 'leadStatusId[=]' + leadStatusId);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
