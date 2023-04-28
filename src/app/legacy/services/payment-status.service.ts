import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PAYMENT_STATUS } from '@constants/global';
import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PaymentStatus } from '@interfaces/payment-status.interface';
import { PaymentStatusStat } from '@interfaces/payment-status-stat.interface';
import { AuthService } from '@core/services/auth.service';

const ROUTES = {
    paymentStatus: `${environment.apiUrl}/payment-status`,
    paymentStatusStats: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/stats/payment-status`,
};

@Injectable()
export class PaymentStatusService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    /**
     * Get the payment status from the API
     * @param  fields The fields to get
     * @return        The payment status
     */
    getPaymentStatus(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.paymentStatus;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                const response: HttpResponse = {
                    data: this._removePaidPaymentStatus(res.data),
                };
                return response;
            })
        );
    }

    /**
     * Remove the paid payment status
     * @param  paymentStatus The payment status to filter
     * @return               The filtered payment status
     */
    private _removePaidPaymentStatus(
        paymentStatus: PaymentStatus[]
    ): PaymentStatus[] {
        return paymentStatus.filter(
            (element: PaymentStatus) =>
                element.paymentStatusId !== PAYMENT_STATUS.PAID &&
                element.paymentStatusId !== PAYMENT_STATUS.STANDBY
        );
    }

    /**
     * Get the payment status stats
     * @param  filters The filters to apply
     * @return         The payment status stats
     */
    getPaymentStatusStats(
        filters: string = ''
    ): Observable<PaymentStatusStat[]> {
        const route: string = ROUTES.paymentStatusStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }
}
