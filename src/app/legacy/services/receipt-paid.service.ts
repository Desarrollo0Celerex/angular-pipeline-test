import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { AuthService } from '@core/services/auth/auth.service';

const routes: any = {
    receiptsPaid: (workspaceId: string, paymentId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/payments/' +
        paymentId +
        '/receipts-paid',
    paymentReceiptsPaid: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        paymentId: string
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/payments/' +
        paymentId +
        '/receipts-paid',
    paymentReceiptPaid: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        paymentId: string,
        receiptPaidId: string
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/payments/' +
        paymentId +
        '/receipts-paid/' +
        receiptPaidId,
    receiptPaid: (
        workspaceId: string,
        paymentId: string,
        receiptPaidId: string
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/payments/' +
        paymentId +
        '/receipts-paid/' +
        receiptPaidId,
    receiptPaidAux: (workspaceId: string, receiptPaidId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/receipts-paid/' +
        receiptPaidId,
    totalContactReceiptsPaid: (workspaceId: string, contactId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/receipts-paid/count',
    totalGroupReceiptsPaid: (workspaceId: string, groupId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/groups/' +
        groupId +
        '/receipts-paid/count',
    totalPartnerReceiptsPaid: (workspaceId: string, partnerId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/receipts-paid/count',
    totalWorkspaceReceiptsPaid: (workspaceId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/receipts-paid/count',
    appliedPaymentsStats: (workspaceId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/stats/applied-payments',
    receiptsPaidStats: (workspaceId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/stats/receipts-paid',
    contactReceiptsPaid: (workspaceId: string, contactId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/receipts-paid',
    workspaceReceiptsPaid: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/receipts-paid',
    workspaceReceiptsAppliedStats: (workspaceId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/receipts-paid/stats',
    workspaceReceiptsPaidReport: (workspaceId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/receipts-paid/report',
    reportContactAppliedPayments: (workspaceId: string, contactId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/receipts-paid/report',
    reportPartnerAppliedPayments: (workspaceId: string, partnerId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/receipts-paid/report',
    reportGroupAppliedPayments: (workspaceId: string, groupId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/groups/' +
        groupId +
        '/receipts-paid/report',
};

@Injectable()
export class ReceiptPaidService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    /**
     * Create the payment in the API
     * @param  requestBody The request body
     * @return             Notice of actiion done
     */
    createReceiptPaid(
        contactId: string,
        policyId: string,
        paymentId: string,
        requestBody: FormData
    ): Observable<void> {
        const route: string = routes.paymentReceiptsPaid(
            this._workspaceId,
            contactId,
            policyId,
            paymentId
        );
        return this._httpClient.post<void>(route, requestBody);
    }

    /**
     * delete the receipt paid fron the DB
     * @param  paymentId     The payment ID
     * @param  receiptPaidId The receipt paid ID to delete
     * @return               Notice of action done
     */
    deleteReceiptPaid(
        paymentId: string,
        receiptPaidId: string
    ): Observable<void> {
        const route: string = routes.receiptPaid(
            this._workspaceId,
            paymentId,
            receiptPaidId
        );
        return this._httpClient.delete<void>(route);
    }

    downloadReportContactAppliedPayments(
        contactId: string,
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        formatType: number,
        sortBy: string = '-createdAt'
    ) {
        const route: string = routes.reportContactAppliedPayments(
            this._workspaceId,
            contactId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!formatType) params = params.append('formatType', formatType);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params,
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    downloadReportGroupAppliedPayments(
        groupId: string,
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        formatType: number,
        sortBy: string = '-createdAt'
    ) {
        const route: string = routes.reportGroupAppliedPayments(
            this._workspaceId,
            groupId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!formatType) params = params.append('formatType', formatType);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params,
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    downloadReportPartnerAppliedPayments(
        partnerId: number,
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        formatType: number,
        sortBy: string = '-createdAt'
    ) {
        const route: string = routes.reportPartnerAppliedPayments(
            this._workspaceId,
            partnerId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!formatType) params = params.append('formatType', formatType);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params,
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    downloadReportReceiptsPaid(
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        sortBy: string = '-createdAt',
        specialFilter: string = '',
        formatType: number
    ) {
        const route: string = routes.workspaceReceiptsPaidReport(
            this._workspaceId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!formatType) params = params.append('formatType', formatType);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params,
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    getReceiptPaid(
        receiptPaidId: string,
        fields: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.receiptPaidAux(
            this._workspaceId,
            receiptPaidId
        );
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the receipts paid
     * @param  paymentId  The payment ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @return           The history payment
     */
    getReceiptsPaid(
        paymentId: string,
        page: number = 1,
        fields: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.receiptsPaid(this._workspaceId, paymentId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if (!!fields) params = params.append('fields', fields);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getContactReceiptsPaid(
        contactId: string,
        page: number = 1,
        fields: string = '',
        filters: string = '',
        query: string = '',
        sortBy: string = '-createdAt',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.contactReceiptsPaid(
            this._workspaceId,
            contactId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if (!!fields) params = params.append('fields', fields);
        if (!!filters) params = params.append('filter', filters);
        if (!!query) params = params.append('search', query);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
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
        );
    }

    getPolicyReceiptsPaid(
        contactId: string,
        policyId: string,
        paymentId: string,
        page: number = 1,
        fields: string = '',
        filters: string = '',
        query: string = '',
        sortBy: string = '-createdAt'
    ): Observable<HttpResponse> {
        const route: string = routes.paymentReceiptsPaid(
            this._workspaceId,
            contactId,
            policyId,
            paymentId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if (!!fields) params = params.append('fields', fields);
        if (!!filters) params = params.append('filter', filters);
        if (!!query) params = params.append('search', query);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
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
        );
    }

    getWorkspaceReceiptsPaid(
        page: number = 1,
        fields: string = '',
        filters: string = '',
        query: string = '',
        sortBy: string = '-createdAt',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.workspaceReceiptsPaid(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if (!!fields) params = params.append('fields', fields);
        if (!!filters) params = params.append('filter', filters);
        if (!!query) params = params.append('search', query);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
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
        );
    }

    getAppliedPaymentsStats(
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<StatRangeData[]> {
        const route: string = routes.appliedPaymentsStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    getTotalContactReceiptsPaid(
        contactId: string,
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        const route: string = routes.totalContactReceiptsPaid(
            this._workspaceId,
            contactId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    getReceiptsAppliedStats(
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ) {
        const route: string = routes.workspaceReceiptsAppliedStats(
            this._workspaceId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    getReceiptsPaidStats(
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<StatRangeData[]> {
        const route: string = routes.receiptsPaidStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    getTotalGroupReceiptsPaid(
        groupId: string,
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        const route: string = routes.totalGroupReceiptsPaid(
            this._workspaceId,
            groupId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    getTotalPartnerReceiptsPaid(
        partnerId: number,
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        const route: string = routes.totalPartnerReceiptsPaid(
            this._workspaceId,
            partnerId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    getTotalWorkspaceReceiptsPaid(
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        const route: string = routes.totalWorkspaceReceiptsPaid(
            this._workspaceId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    updateReceiptPaid(
        contactId: string,
        policyId: string,
        paymentId: string,
        receiptPaidId: string,
        requestBody: FormData
    ): Observable<void> {
        const route: string = routes.paymentReceiptPaid(
            this._workspaceId,
            contactId,
            policyId,
            paymentId,
            receiptPaidId
        );
        return this._httpClient.post<void>(route, requestBody);
    }

    private _calculatePaymentLifeTime(payment: Payment): Payment {
        const paymentAmountPaid: number = parseFloat(
            payment.paymentAmountPaid.toString()
        );
        const pendingAmount: number = !!payment.pendingAmount
            ? parseFloat(payment.pendingAmount.toString())
            : 0;
        const paymentAmount: number = !!payment.paymentAmount
            ? parseFloat(payment.paymentAmount.toString())
            : 0;
        let percentage: number = 0;
        if (!!!pendingAmount) {
            percentage = 100;
        } else {
            percentage = Math.round((paymentAmountPaid * 100) / paymentAmount);
        }
        payment.lifeTime = percentage;
        return payment;
    }
}
