import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const routes: any = {
    insuranceCategories: environment.agenthos.apiUrl + '/insurance-categories',
};

@Injectable()
export class InsuranceCategoryService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the insurance categories from the API
     * @param  fields  The fields to get
     * @return         The insurance categories
     */
    getInsuranceCategories(
        fields: string = '',
        sortBy: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.insuranceCategories;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
