import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const routes: any = {
    insuranceSubcategories: environment.apiUrl + '/insurance-subcategories',
};

@Injectable()
export class InsuranceSubcategoryService {
    constructor(private _httpClient: HttpClient) {}

    getInsuranceSubcategories(fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.insuranceSubcategories;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
