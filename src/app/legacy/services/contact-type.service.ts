import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ContactType } from '@interfaces/contact-type.interface';
import { ContactTypeStat } from '@interfaces/contact-type-stat.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features/auth/services/auth.service';

const ROUTES = {
    contactTypes: () => `${environment.apiUrl}/contact-types`,
    contactTypesStats: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/stats/contact-types`,
};

@Injectable()
export class ContactTypeService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    getContactTypes(filters: string = ''): Observable<ContactType[]> {
        const route: string = ROUTES.contactTypes();
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    /**
     * Get the contact types stats from the API
     * @param  filters The filters to apply
     * @return         The contact types stats
     */
    getContactTypesStats(filters: string = ''): Observable<ContactTypeStat[]> {
        const route: string = ROUTES.contactTypesStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }
}
