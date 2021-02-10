import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const routes: any = {
    insurancesInsuranceType: (insuranceId: number) => environment.apiUrl + '/insurances/' + insuranceId + '/insuranceTypes'
}

@Injectable()
export class InsuranceTypeService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the insurance types from the API
     * @param  insuranceId The insurance ID
     * @return             The insurance types
     */
    getInsuranceTypes(insuranceId: number, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.insurancesInsuranceType(insuranceId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }
}
