import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Stat } from '@interfaces/stat.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const ROUTES = {
    contactSources: `${environment.apiUrl}/contact-sources`,
    contactSourcesStats: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/stats/contact-sources`
}

@Injectable()
export class ContactSourceService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) { }

    /**
     * Get the contact sources from the API
     * @param  fields Fields to get
     * @return        The contact sources
     */
    getContactSources(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.contactSources;
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Get the contact sources stats from the API
     * @param  filters The filters to apply
     * @return         The contact sources stats
     */
    getContactSourcesStats(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<Stat[]> {
        const route: string = ROUTES.contactSourcesStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => { return res.data })
        );
    }
}
