import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { SinisterEvidenceType } from '@interfaces/sinister-evidence-type.interface';

const ROUTES = {
    sinisterEvidenceTypes: () =>
        `${environment.apiUrl}/sinister-evidence-types`,
};

@Injectable()
export class SinisterEvidenceTypeService {
    constructor(private _httpClient: HttpClient) {}

    getSinisterEvidenceTypes(
        fields: string = ''
    ): Observable<SinisterEvidenceType[]> {
        const route: string = ROUTES.sinisterEvidenceTypes();
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }
}
