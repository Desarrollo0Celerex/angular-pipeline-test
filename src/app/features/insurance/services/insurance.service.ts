import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Insurance } from '../interfaces/insurance.interface';
import { ApiHttp } from '@core/http/api.http';
import { INSURANCE_ENDPOINTS } from '../constants/endpoints';
import { InsuranceCategory } from '@insurance/interfaces/insurance-category.interface';

@Injectable()
export class InsuranceService {
    constructor(private _apiHttp: ApiHttp) {}

    getCategoryInsurances(
        insuranceCategoryId: number,
        fields: string = '',
        sortBy: string = ''
    ): Observable<Insurance[]> {
        return this._apiHttp
            .param('fields', fields)
            .param('sortBy', sortBy)
            .get(INSURANCE_ENDPOINTS.categoryInsurances(insuranceCategoryId));
    }

    getInsuranceCategories(
        fields: string = '',
        sortBy: string = ''
    ): Observable<InsuranceCategory[]> {
        return this._apiHttp
            .param('fields', fields)
            .param('sortBy', sortBy)
            .get(INSURANCE_ENDPOINTS.insuranceCategories);
    }

    getInsurances(
        fields: string = '',
        sortBy: string = 'name'
    ): Observable<Insurance[]> {
        return this._apiHttp
            .param('fields', fields)
            .param('sortBy', sortBy)
            .get(INSURANCE_ENDPOINTS.insurances);
    }
}
