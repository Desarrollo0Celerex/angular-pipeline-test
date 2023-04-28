import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    genders: `${environment.apiUrl}/genders`
}

@Injectable()
export class GendersService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the genders from the API
     * @param  fields The fields to get
     * @return        The genders
     */
    getGenders(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.genders;
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
