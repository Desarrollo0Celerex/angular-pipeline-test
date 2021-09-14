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
    insurersStats: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/stats/insurers`
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
}
