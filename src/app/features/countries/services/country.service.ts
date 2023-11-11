import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttp } from '@core/http/api.http';
import { environment } from '@env/environment';
import { Country } from '@countries/interfaces/country.interface';

const ENDPOINTS: any = {
    countries: `${environment.agenthos.apiUrl}/countries`,
};

@Injectable()
export class CountryService {
    constructor(private _apiHttp: ApiHttp) {}

    getCountries(fields: string = ''): Observable<Country[]> {
        return this._apiHttp.param('fields', fields).get(ENDPOINTS.countries);
    }
}
