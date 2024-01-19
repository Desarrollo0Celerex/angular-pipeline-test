import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { INSURANCE_TYPE_ENDPOINTS } from '@insurance-type/constants/endpoints';
import { InsuranceType } from '@insurance-type/interfaces/insurance-type.interface';
import { Observable } from 'rxjs';

@Injectable()
export class InsuranceTypeService {
    constructor(private _apiHttp: ApiHttp) {}

    getInsuranceTypes(
        insuranceId: number,
        fields: string = ''
    ): Observable<InsuranceType[]> {
        return this._apiHttp
            .param('fields', fields)
            .get(INSURANCE_TYPE_ENDPOINTS.insuranceInsuranceTypes(insuranceId));
    }
}
