import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    phoneCodes: `${environment.apiUrl}/phone-codes`
}

@Injectable()
export class PhoneCodeService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the phone codes from API
     * @param  fields Fields
     * @return        Phone codes
     */
    getPhoneCodes(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.phoneCodes;
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
