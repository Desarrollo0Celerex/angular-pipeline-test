import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const routes = {
    insurers: environment.apiUrl + '/insurers'
}

@Injectable()
export class InsurerService {

    constructor(private _httpClient: HttpClient) { }

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
}
