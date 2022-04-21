import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Payment } from '@interfaces/payment.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { UpdateReceiptPaidDataSend } from '@interfaces/update-receipt-paid-data-send.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    receiptsPaid: (workspaceId: string, paymentId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/'+paymentId+'/receipts-paid',
    receiptsPaidAux: (workspaceId: string, contactId: string, policyId: string, paymentId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/payments/'+paymentId+'/receipts-paid',
    receiptPaid: (workspaceId: string, paymentId: string, receiptPaidId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/'+paymentId+'/receipts-paid/'+receiptPaidId,
    receiptPaidAux: (workspaceId: string, receiptPaidId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/receipts-paid/'+receiptPaidId,
    totalReceiptsPaid: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/receipts-paid/count',
    appliedPaymentsStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/applied-payments',
    receiptsPaidStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/receipts-paid',
    workspaceReceiptsPaid: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/receipts-paid',
    workspaceReceiptsAppliedStats: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/receipts-paid/stats',
}

@Injectable()
export class ReceiptPaidService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    /**
     * Create the payment in the API
     * @param  requestBody The request body
     * @return             Notice of actiion done
     */
    createReceiptPaid(contactId: string, policyId: string, paymentId: string, requestBody: FormData): Observable<void> {
        const route: string = routes.receiptsPaidAux(this._workspaceId, contactId, policyId, paymentId);
        return this._httpClient.post<void>(route, requestBody);
    }

    /**
     * delete the receipt paid fron the DB
     * @param  paymentId     The payment ID
     * @param  receiptPaidId The receipt paid ID to delete
     * @return               Notice of action done
     */
    deleteReceiptPaid(paymentId: string, receiptPaidId: string): Observable<void> {
        const route: string = routes.receiptPaid(this._workspaceId, paymentId, receiptPaidId);
        return this._httpClient.delete<void>(route);
    }

    getReceiptPaid(receiptPaidId: string, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.receiptPaidAux(this._workspaceId, receiptPaidId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Get the receipts paid
     * @param  paymentId  The payment ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @return           The history payment
     */
    getReceiptsPaid(paymentId: string, page: number = 1, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.receiptsPaid(this._workspaceId, paymentId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    getWorkspaceReceiptsPaid(page: number = 1, fields: string = '', filters: string = '', query: string = '', sortBy: string = '-createdAt', rangeField: string = '', rangeStart: string = '', rangeEnd: string = '', specialFilter: string = ''): Observable<HttpResponse> {
        const route: string = routes.workspaceReceiptsPaid(this._workspaceId);
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

    getAppliedPaymentsStats(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<RangeStat[]> {
        const route: string = routes.appliedPaymentsStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getReceiptsAppliedStats(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = '', specialFilter: string = '') {
        const route: string = routes.workspaceReceiptsAppliedStats(this._workspaceId);
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

    getReceiptsPaidStats(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<RangeStat[]> {
        const route: string = routes.receiptsPaidStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getTotalReceiptsPaid(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalReceiptsPaid(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    updateReceiptPaid(receiptPaidId: string, requestBody: UpdateReceiptPaidDataSend): Observable<void> {
        const route: string = routes.receiptPaidAux(this._workspaceId, receiptPaidId);
        return this._httpClient.put<void>(route, requestBody);
    }

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
