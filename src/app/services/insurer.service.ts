import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { InsurerStat } from '@interfaces/insurer-stat.interface';
import { AuthService } from '@services/auth.service';

const routes = {
    insurers: environment.apiUrl + '/insurers',
    insurersStats: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/stats/insurers`,
    activeInsurers: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/insurers/active`
}

@Injectable()
export class InsurerService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) { }

    /**
     * Get the insurers from the API
     * @param  fields              The fields to get
     * @return                     The insurers
     */
    getInsurers(fields: string = ''): Observable<HttpResponse> {
        const route = routes.insurers;
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Get the insurers stats
     * @return The insurers stats
     */
    getInsurersStats(): Observable<InsurerStat[]> {
        const route = routes.insurersStats(this._workspaceId);
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getTotalActiveInsurers(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route = routes.activeInsurers(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params}).pipe(
            map((res: HttpResponse) => { return res.data; })
        );
    }
}
