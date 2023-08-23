import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactSourceType } from '@interfaces/contact-source-type.interface';
import { Stat } from '@interfaces/stat.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

const ROUTES = {
    contactSourceTypes: (contactSourceId: number) =>
        `${environment.apiUrl}/contact-sources/${contactSourceId}/contact-source-types`,
    contactSourceTypesStats: (workspaceId: string, contactSourceId: number) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/stats/contact-sources/${contactSourceId}/contact-source-types`,
};

@Injectable()
export class ContactSourceTypeService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    /**
     * Get the contact source types from the API
     * @param  fields Fields to get
     * @return        The contact source types
     */
    getContactSourceTypes(
        contactSourceId: number,
        fields: string = ''
    ): Observable<ContactSourceType[]> {
        const route: string = ROUTES.contactSourceTypes(contactSourceId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    getContactSourceTypesStats(
        contactSourceId: number,
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<Stat[]> {
        const route: string = ROUTES.contactSourceTypesStats(
            this._workspaceId,
            contactSourceId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }
}
