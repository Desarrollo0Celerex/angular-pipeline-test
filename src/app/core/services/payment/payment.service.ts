import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PAYMENT_ENDPOINTS } from '@configs/endpoints.config';
import { AuthService } from '@core/services/auth/auth.service';
import { ApiHttp } from '@core/http/api.http';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { SendReminder } from '@modules/pay-tracker/interfaces/send-reminder.interface';

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
        const whatsappLink = requestBody.canSendReminderByWhatsapp
            ? `https://api.whatsapp.com/send/?phone=${requestBody.phoneNumber}&text=Hola+${requestBody.contactName}%2C%0D%0A${requestBody.workspaceName}%2C+tu+br%C3%B3ker+de+seguros+agradece+tu+preferencia.`
            : '';
        return of(whatsappLink);
    }
}
