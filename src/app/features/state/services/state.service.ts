import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiHttp } from '@core/http/api.http';
import { environment } from '@env/environment';
import { State } from '@state/interfaces/state.interface';

const ENDPOINTS: any = {
    states: (countryId: number) =>
        `${environment.agenthos.apiUrl}/countries/${countryId}/states`,
};

@Injectable()
export class StateService {
    constructor(private _apiHttp: ApiHttp) {}

    getStates(countryId: number, fields: string = ''): Observable<State[]> {
        return this._apiHttp
            .param('fields', fields)
            .get(ENDPOINTS.states(countryId));
    }
}
