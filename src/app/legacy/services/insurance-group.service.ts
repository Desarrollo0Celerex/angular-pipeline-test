import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const routes: any = {
    insuranceGroupByInsurance: (insuranceId: number) =>
        environment.apiUrl +
        '/insurances/' +
        insuranceId +
        '/insurance-group-id',
};

@Injectable()
export class InsuranceGroupService {
    constructor(private _httpClient: HttpClient) {}

    getInsuranceGroupIdByInsuranceId(insuranceId: number): Observable<number> {
        const route: string = routes.insuranceGroupByInsurance(insuranceId);
        return this._httpClient
            .get<HttpResponse>(route)
            .pipe(map((res: HttpResponse) => res.data));
    }
}
