import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { Observable } from 'rxjs';
import { INSURED_RELATION_ENDPOINTS } from '../constants/endpoints';
import { InsuredRelation } from '../interfaces/insured-relation.interface';

@Injectable()
export class InsuredRelationService {
    constructor(private _apiHttp: ApiHttp) {}

    getInsuredRelations(fields: string = ''): Observable<InsuredRelation[]> {
        return this._apiHttp
            .param('fields', fields)
            .get(INSURED_RELATION_ENDPOINTS.genders);
    }
}
