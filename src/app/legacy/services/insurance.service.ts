import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { Insurance } from '@interfaces/insurance.interface';

const routes = {
    activeInsurances: (workspaceId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/insurances/active',
    categoryInsurances: (insuranceCategoryId: number) =>
        environment.agenthos.apiUrl +
        '/insurance-categories/' +
        insuranceCategoryId +
        '/insurances',
    licenseInsurances: (licenseId: number) =>
        environment.agenthos.apiUrl + '/licenses/' + licenseId + '/insurances',
    insurances: environment.agenthos.apiUrl + '/insurances',
    mostUsedInsurances: (workspaceId: string, contactTypeId: number) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contact-types/' +
        contactTypeId +
        '/insurances',
    subcategoryInsurances: (insuranceSubcategoryId: number) =>
        environment.agenthos.apiUrl +
        '/insurance-subcategories/' +
        insuranceSubcategoryId +
        '/insurances',
};

@Injectable()
export class InsuranceService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    /**
     * Get the insurances from the API
     * @param  fields              The fields to get
     * @return                     The insurances
     */
    getInsurances(
        fields: string = '',
        sortBy: string = 'name'
    ): Observable<HttpResponse> {
        const route = routes.insurances;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getLicenseInsurances(
        licenseId: number,
        fields: string = '',
        sortBy: string = ''
    ): Observable<HttpResponse> {
        const route = routes.licenseInsurances(licenseId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getMostUsedInsurances(
        contactTypeId: number,
        fields: string = ''
    ): Observable<HttpResponse> {
        const route = routes.mostUsedInsurances(
            this._workspaceId,
            contactTypeId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the category insurances from the API
     * @param  insuranceCategoryId The insurance category ID
     * @param  fields              The fields to get
     * @return                     The insurances
     */
    getCategoryInsurances(
        insuranceCategoryId: number,
        fields: string = '',
        sortBy: string = ''
    ): Observable<HttpResponse> {
        const route = routes.categoryInsurances(insuranceCategoryId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getSubcategoryInsurances(
        insuranceSubcategoryId: number,
        fields: string = '',
        sortBy: string = ''
    ): Observable<HttpResponse> {
        const route = routes.subcategoryInsurances(insuranceSubcategoryId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getTotalActiveInsurances(
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        const route = routes.activeInsurances(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }
}
