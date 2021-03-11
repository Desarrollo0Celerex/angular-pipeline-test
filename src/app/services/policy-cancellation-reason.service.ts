import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    policyCancellationReasons: `${environment.apiUrl}/policy-cancellation-reasons`
}

@Injectable()
export class PolicyCancellationReasonService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the roles from API
     * @param  fields Fields
     * @return        Roles
     */
    getPolicyCancellationReasons(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.policyCancellationReasons;
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }
}
