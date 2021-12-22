import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Payment } from '@interfaces/payment.interface';
import { PaymentStat } from '@interfaces/payment-stat.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { Stat } from '@interfaces/stat.interface';
import { TotalPaymentsAmountData } from '@interfaces/total-payments-amount-data.interface';
import { UpdatePaymentDateDataSend } from '@interfaces/update-payment-date-data-send.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    payment: (workspaceId: string, paymentId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/' +paymentId,
    paymentDate: (workspaceId: string, paymentId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/' + paymentId + '/payment-date',
    payments: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments',
    paymentsReport: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/report',
    totalPayments: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/count',
    totalPaymentsAmount: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/total-amount',
    paymentsStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/payments',
    collectionStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/collection',
    insurancesPaymentsStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/insurances/payments',
}

@Injectable()
export class PaymentService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    downloadPaymentsReport(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = '', sortBy: string = '-createdAt') {
        const route: string = routes.paymentsReport(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if(!!sortBy) params = params.append('sortBy', sortBy);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    getInsurancesPaymentsStats(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<Stat[]> {
        const route: string = routes.insurancesPaymentsStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    /**
     * Get the payment from the API
     * @param  paymentId    The payment ID to update
     * @param  fields       The fields to get
     * @return              The payment data
     */
    getPayment(paymentId: string, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.payment(this._workspaceId, paymentId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => {
                if(fields.includes('lifeTime')) {
                    res.data = this._calculatePaymentLifeTime(res.data);
                }
                return res;
            })
        );
    }

     /**
      * Get the payments from the API
      * @param  page            The page number
      * @param  fields          The fields to get
      * @param  paymentStatusId    The filter to apply
      * @param  query           The search to do
      * @return                 The payments
      */
    getPayments(page: number = 1, fields: string = '', filters: string = '', query: string = '', sortBy: string = '-createdAt', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<HttpResponse> {
        const route: string = routes.payments(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!filters) params = params.append('filter', filters);
        if(!!query) params = params.append('search', query);if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if(fields.includes('lifeTime')) {
                    const payments: Payment[] = res.data.items.map( (payment: Payment) => {
                        return this._calculatePaymentLifeTime(payment);
                    })
                    res.data.items = payments;
                }
                return res;
            })
        )
    }

    /**
     * Get the payments stats
     * @return  The payments stats
     */
    getPaymentsStats(): Observable<PaymentStat[]> {
        const route: string = routes.paymentsStats(this._workspaceId);
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getCollectionStats(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<RangeStat[]> {
        const route: string = routes.collectionStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    /**
     * Get the total payments from the API
     * @param  paymentStatusId The filter to apply
     * @return              The total clients
     */
    getTotalPayments(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalPayments(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    /**
     * Get the total payments amount from the API
     * @param  paymentStatusId The filter to apply
     * @return              The total payments amount
     */
    getTotalPaymentsAmount(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<TotalPaymentsAmountData> {
        const route: string = routes.totalPaymentsAmount(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    updatePaymentDate(paymentId: string, requestBody: UpdatePaymentDateDataSend): Observable<void> {
        const route: string = routes.paymentDate(this._workspaceId, paymentId);
        return this._httpClient.put<void>(route, requestBody);
    }

    /**
     * Calculate the life time of the payment
     * @param  payment The payment to evaluate
     * @return        The payment with their life time value
     */
    private _calculatePaymentLifeTime(payment: Payment): Payment {
        const paymentAmountPaid: number = parseFloat(payment.paymentAmountPaid.toString());
        const pendingAmount: number = (!!payment.pendingAmount) ? parseFloat(payment.pendingAmount.toString()) : 0;
        const paymentAmount: number = (!!payment.paymentAmount) ? parseFloat(payment.paymentAmount.toString()) : 0;
        let percentage: number = 0;
        if(!(!!pendingAmount)) {
            percentage = 100
        } else {
            percentage = Math.round(paymentAmountPaid * 100 / paymentAmount);
        }
        payment.lifeTime = percentage;
        return payment;
    }
}
