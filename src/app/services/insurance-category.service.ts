import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const routes: any = {
    insuranceCategories: environment.apiUrl + '/insurance-categories'
}

@Injectable()
export class InsuranceCategoryService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the insurance categories from the API
     * @param  fields  The fields to get
     * @return         The insurance categories
     */
    getInsuranceCategories(fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.insuranceCategories;
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }
}
