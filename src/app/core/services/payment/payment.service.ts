import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PAYMENT_ENDPOINTS } from '@configs/endpoints.config';
import { AuthService } from '@core/services/auth/auth.service';
import { ApiHttp } from '@core/http/api.http';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';

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

    getWorkspacePayments(
        page: number = 1,
        perPage: number = 1,
        fields: string = '',
        filter: string = '',
        sortBy: string = '',
        query: string = '',
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
            .param('query', query)
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .param('specialFilter', specialFilter)
            .get(PAYMENT_ENDPOINTS.workspacePayments(this._workspaceId));

        /* return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if (fields.includes('lifeTime')) {
                    const payments: Payment[] = res.data.items.map(
                        (payment: Payment) => {
                            return this._calculatePaymentLifeTime(payment);
                        }
                    );
                    res.data.items = payments;
                }
                return res;
            })
        ); */
    }
}
