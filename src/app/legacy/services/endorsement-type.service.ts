import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    endorsementTypes: `${environment.apiUrl}/endorsement-types`,
};

@Injectable()
export class EndorsementTypeService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the endorsement types from the API
     * @param  fields The fields to get
     * @return        The endorsement types
     */
    getEndorsementTypes(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.endorsementTypes;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
