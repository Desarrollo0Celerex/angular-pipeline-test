import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Payment } from '@interfaces/payment.interface';
import { PaymentStat } from '@interfaces/payment-stat.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { Stat } from '@interfaces/stat.interface';
import { TotalPaymentsAmountData } from '@interfaces/total-payments-amount-data.interface';
import { UpdatePaymentDateDataSend } from '@interfaces/update-payment-date-data-send.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    payment: (workspaceId: string, paymentId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/' +paymentId,
    paymentDate: (workspaceId: string, paymentId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/' + paymentId + '/payment-date',
    paymentPreauthorizations: (workspaceId: string, paymentId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/' + paymentId + '/preauthorizations',
    payments: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments',
    contactPayments: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/payments',
    workspacePaymentsReport: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/report',
    totalContactPayments: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/payments/count',
    totalGroupPayments: (workspaceId: string, groupId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/groups/' + groupId + '/payments/count',
    totalPartnerPayments: (workspaceId: string, partnerId: number) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners/' + partnerId + '/payments/count',
    reportContactPendingPayments: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/payments/report',
    reportGroupPendingPayments: (workspaceId: string, groupId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/groups/' + groupId + '/payments/report',
    reportPartnerPendingPayments: (workspaceId: string, partnerId: number) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners/' + partnerId + '/payments/report',
    totalPayments: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/count',
    totalPaymentsAmount: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/total-amount',
    totalWorkspaceReceipts: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/receipts/count',
    paymentsStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/payments',
    collectionStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/collection',
    insurancesPaymentsStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/insurances/payments',
    workspacePendingPaymentStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/stats',
}

@Injectable()
export class PaymentService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    downloadReportPayments(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = '', sortBy: string = '-createdAt', specialFilter: string = '', formatType: number) {
        const route: string = routes.workspacePaymentsReport(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if(!!formatType) params = params.append('formatType', formatType);
        if(!!sortBy) params = params.append('sortBy', sortBy);
        if(!!specialFilter) params = params.append('specialFilter', specialFilter);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    downloadReportContactPendingPayments(contactId: string, filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = '', formatType: number, sortBy: string = '-createdAt') {
        const route: string = routes.reportContactPendingPayments(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if(!!formatType) params = params.append('formatType', formatType);
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

    downloadReportGroupPendingPayments(groupId: string, filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = '', formatType: number, sortBy: string = '-createdAt') {
        const route: string = routes.reportGroupPendingPayments(this._workspaceId, groupId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if(!!formatType) params = params.append('formatType', formatType);
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

    downloadReportPartnerPendingPayments(partnerId: number, filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = '', formatType: number, sortBy: string = '-createdAt') {
        const route: string = routes.reportPartnerPendingPayments(this._workspaceId, partnerId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if(!!formatType) params = params.append('formatType', formatType);
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

    getContactPayments(contactId: string, page: number = 1, fields: string = '', filters: string = '', query: string = '', sortBy: string = '-createdAt', rangeField: string = '', rangeStart: string = '', rangeEnd: string = '', specialFilter: string = ''): Observable<HttpResponse> {
        const route: string = routes.contactPayments(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!filters) params = params.append('filter', filters);
        if(!!query) params = params.append('search', query);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if(!!specialFilter) params = params.append('specialFilter', specialFilter);
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

    getPayments(page: number = 1, fields: string = '', filters: string = '', query: string = '', sortBy: string = '-createdAt', rangeField: string = '', rangeStart: string = '', rangeEnd: string = '', specialFilter: string = ''): Observable<HttpResponse> {
        const route: string = routes.payments(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!filters) params = params.append('filter', filters);
        if(!!query) params = params.append('search', query);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if(!!specialFilter) params = params.append('specialFilter', specialFilter);
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

    getPendingPaymentStats(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = '', specialFilter: string = '') {
        const route: string = routes.workspacePendingPaymentStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if(!!specialFilter) params = params.append('specialFilter', specialFilter);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getCollectionStats(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<StatRangeData[]> {
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

    getTotalContactPayments(contactId: string, filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalContactPayments(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getTotalGroupPayments(groupId: string, filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalGroupPayments(this._workspaceId, groupId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getTotalPartnerPayments(partnerId: number, filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalPartnerPayments(this._workspaceId, partnerId);
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

    getTotalWorkspaceReceipts(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalWorkspaceReceipts(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    preauthorizePayment(paymentId: string): Observable<void> {
        const route: string = routes.paymentPreauthorizations(this._workspaceId, paymentId);
        return this._httpClient.put<void>(route, null);
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
