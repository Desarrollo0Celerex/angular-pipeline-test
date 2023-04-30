import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PAYMENT_ENDPOINTS } from '@configs/endpoints.config';
import { AuthService } from '@core/services/auth/auth.service';
import { ApiHttp } from '@core/http/api.http';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getTotalWorkspacePayments(
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        return this._apiHttp
            .param('filter', filters)
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .get(PAYMENT_ENDPOINTS.totalWorkspacePayments(this._workspaceId));
    }
}
