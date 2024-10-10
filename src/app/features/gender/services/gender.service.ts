import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { GENDER_ENDPOINTS } from '@gender/constants/endpoints';
import { Gender } from '@gender/interfaces/gender.interface';
import { Observable } from 'rxjs';

@Injectable()
export class GenderService {
    constructor(private _apiHttp: ApiHttp) {}

    getGenders(fields: string = ''): Observable<Gender[]> {
        return this._apiHttp
            .param('fields', fields)
            .get(GENDER_ENDPOINTS.genders);
    }
}
