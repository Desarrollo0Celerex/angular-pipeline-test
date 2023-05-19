import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { License } from '@interfaces/license.interface';

const routes: any = {
    licenses: environment.apiUrl + '/licenses',
};

@Injectable()
export class LicenseService {
    constructor(private _httpClient: HttpClient) {}

    getLicenses(fields: string = ''): Observable<License[]> {
        const route: string = routes.licenses;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        params = params.append('sortBy', 'licenseId');
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }
}
