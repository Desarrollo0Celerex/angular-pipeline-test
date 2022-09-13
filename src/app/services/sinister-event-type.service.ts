import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { SinisterEventType } from '@interfaces/sinister-event-type.interface';

const ROUTES = {
    sinisterEventTypes: (insuranceGroupId: number) => `${environment.apiUrl}/insurance-groups/${insuranceGroupId}/sinister-event-types`
}

@Injectable()
export class SinisterEventTypeService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the sinister event types from the API
     * @param  fields      The fields to get
     * @return             The sinister event types
     */
    getSinisterEventTypes(insuranceGroupId: number, fields: string = ''): Observable<SinisterEventType[]> {
        const route: string = ROUTES.sinisterEventTypes(insuranceGroupId);
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }
}
