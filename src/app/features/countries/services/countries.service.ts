import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { Observable } from 'rxjs';
import { ApiHttp } from '@core/http/api.http';
import { environment } from '@env/environment';

const ENDPOINTS: any = {
    countries: `${environment.apiUrl}/countries`,
};

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    constructor(private _apiHttp: ApiHttp) {}

    getCountries(fields: string = ''): Observable<Country[]> {
        return this._apiHttp.param('fields', fields).get(ENDPOINTS.countries);
    }
}
