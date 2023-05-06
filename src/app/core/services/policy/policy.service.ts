import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { POLICY_ENDPOINTS } from '@configs/endpoints.config';
import { ApiHttp } from '@core/http/api.http';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { AuthService } from '@core/services/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class PolicyService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getWorkspacePayments(
        page: number = 1,
        perPage: number = 1,
        fields: string = '',
        filter: string = '',
        sortBy: string = '',
        search: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<HttpResponseItems> {
        return this._apiHttp
            .param('page', page.toString())
            .param('perPage', perPage.toString())
            .param('fields', fields)
            .param('filter', filter)
            .param('sortBy', sortBy)
            .param('search', search)
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .param('specialFilter', specialFilter)
            .get(POLICY_ENDPOINTS.workspacePolicies(this._workspaceId));
    }
}
