import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const routes = {
    insurances: environment.apiUrl + '/insurances',
    categoryInsurances: (insuranceCategoryId: number) => environment.apiUrl + '/insurance-categories/' + insuranceCategoryId + '/insurances'
}

@Injectable()
export class InsuranceService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the insurances from the API
     * @param  fields              The fields to get
     * @return                     The insurances
     */
    getInsurances(fields: string = ''): Observable<HttpResponse> {
        const route = routes.insurances;
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Get the category insurances from the API
     * @param  insuranceCategoryId The insurance category ID
     * @param  fields              The fields to get
     * @return                     The insurances
     */
    getCategoryInsurances(insuranceCategoryId: number, fields: string = ''): Observable<HttpResponse> {
        const route = routes.categoryInsurances(insuranceCategoryId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }
}
