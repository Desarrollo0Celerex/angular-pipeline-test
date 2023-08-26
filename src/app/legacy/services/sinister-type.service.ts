import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    sinisterTypes: (insuranceId: number) =>
        `${environment.agenthos.apiUrl}/insurances/${insuranceId}/sinister-types`,
};

@Injectable()
export class SinisterTypeService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the sinister types from the API
     * @param  insuranceId The insurance ID
     * @param  fields      The fields to get
     * @return             The sinister types
     */
    getSinisterTypes(
        insuranceId: number,
        fields: string = ''
    ): Observable<HttpResponse> {
        const route: string = ROUTES.sinisterTypes(insuranceId);
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
