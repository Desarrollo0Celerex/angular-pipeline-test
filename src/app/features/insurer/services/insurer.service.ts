import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Insurer } from '../interfaces/insurer.interface';
import { ApiHttp } from '@core/http/api.http';
import { INSURER_ENDPOINTS } from '../constants/endpoints';

@Injectable()
export class InsurerService {
    constructor(private _apiHttp: ApiHttp) {}

    getCountryInsurers(
        countryId: number,
        fields: string = '',
        sortBy: string = 'name'
    ): Observable<Insurer[]> {
        return this._apiHttp
            .param('fields', fields)
            .param('sortBy', sortBy)
            .get(INSURER_ENDPOINTS.countryInsurers(countryId));
    }

    getInsurers(
        fields: string = '',
        sortBy: string = 'name'
    ): Observable<Insurer[]> {
        return this._apiHttp
            .param('fields', fields)
            .param('sortBy', sortBy)
            .get(INSURER_ENDPOINTS.insurers);
    }
}
