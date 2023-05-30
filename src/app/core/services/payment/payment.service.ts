import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
    AGENTHOS_NOTIFIER_ENDPOINTS,
    PAYMENT_ENDPOINTS,
} from '@core/constants/endpoints';
import { AuthService } from '@features/auth/services/auth.service';
import { ApiHttp } from '@core/http/api.http';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { SendReminder } from '@features/pay-tracker/interfaces/send-reminder.interface';
import { TotalPaymentsAmountData } from '@interfaces/total-payments-amount-data.interface';
import { ContainerCharts } from '@core/interfaces/container-charts.interface';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getContactPendingPaymentStats(
        contactId: string,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<ContainerCharts> {
        return this._apiHttp
            .param('filter', filters)
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .param('specialFilter', specialFilter)
            .get(
                PAYMENT_ENDPOINTS.contactPaymentStats(
                    this._workspaceId,
                    contactId
                )
            );
    }

    getPartnerPendingPaymentStats(
        partnerId: string,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<ContainerCharts> {
        return this._apiHttp
            .param('filter', filters)
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .param('specialFilter', specialFilter)
            .get(
                PAYMENT_ENDPOINTS.partnerPaymentStats(
                    this._workspaceId,
                    partnerId
                )
            );
    }

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

    getTotalWorkspacePaymentsAmount(
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<TotalPaymentsAmountData> {
        return this._apiHttp
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .get(
                PAYMENT_ENDPOINTS.totalWorkspacePaymentsAmount(
                    this._workspaceId
                )
            );
    }

    getWorkspacePayment(
        paymentId: string,
        fields: string = ''
    ): Observable<Payment> {
        return this._apiHttp
            .param('fields', fields)
            .get(
                PAYMENT_ENDPOINTS.workspacePayment(this._workspaceId, paymentId)
            );
    }

    getPartnerPayments(
        partnerId: string,
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
            .get(
                PAYMENT_ENDPOINTS.partnerPayments(this._workspaceId, partnerId)
            );
    }

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
            .get(PAYMENT_ENDPOINTS.workspacePayments(this._workspaceId));
    }

    sendPaymentReminder(requestBody: SendReminder): Observable<string> {
        return this._apiHttp.post(
            AGENTHOS_NOTIFIER_ENDPOINTS.paymentReminders,
            requestBody
        );
    }
}
