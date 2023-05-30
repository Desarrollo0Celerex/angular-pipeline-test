import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PAYMENT_REMINDER_TYPES } from '@core/constants/settings';
import { PaymentService } from '@core/services/payment/payment.service';
import { LoadingService } from '@core/services/loading/loading.service';
import { CalculatePaymentAmount } from '@core/interfaces/calculate-payment-amount.interface';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { SendReminder } from '@features/pay-tracker/interfaces/send-reminder.interface';
import { Reminder } from '@features/pay-tracker/interfaces/reminder.interface';
import { SmartComponent } from '@core/classes/smart-component';
import { ApiHttp } from '@core/http/api.http';
import { AuthService } from '@features/auth/services/auth.service';
import { CreatePaymentReminder } from '@features/pay-tracker/interfaces/create-payment-reminder.interface';
import { PAYMENT_REMINDER_ENDPOINTS } from '@core/constants/endpoints';
import { PayTrackerService } from '../pay-tracker/pay-tracker.service';
import { AlertHelper } from '@core/helpers/alert.helper';

@Injectable()
export class PaymentReminderService extends SmartComponent {
    reminderData: Reminder | undefined;
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _apiHttp: ApiHttp,
        private _authService: AuthService,
        private _loadingService: LoadingService,
        private _paymentService: PaymentService,
        private _payTrackerService: PayTrackerService
    ) {
        super();
    }

    createPaymentReminder(
        contactId: string,
        policyId: string,
        paymentId: string,
        requestBody: CreatePaymentReminder
    ): Observable<void> {
        return this._apiHttp.post(
            PAYMENT_REMINDER_ENDPOINTS.paymentReminders(
                this._workspaceId,
                contactId,
                policyId,
                paymentId
            ),
            requestBody
        );
    }

    generatePaymentReminderData(
        constactId: string,
        policyId: string,
        paymentId: string
    ): void {
        this._loadingService.show();
        const data = this.getReminderData();
        const fields: string =
            'contactShortName,workspaceName,policyNumber,coveredProperty,insurerName,currencyName,paymentDate,paymentPlanReceips,netPay,feePay,coverPay,extraPay,taxPay,discount,paymentSourceTypeId,tickets,paymentPlanId,pendingAmount,pendingReceipts,bills,titularName,insuranceTypeName,insurerShortName,validityStartDate,validityEndDate,paymentPlanName,workspaceCollectionWhatsappCode,workspaceCollectionWhatsappNumber,workspaceCollectionPhoneCode,workspaceCollectionPhoneNumber,workspaceCollectionEmail,insurerId,insuranceName,paymentStatusName';
        this._paymentService
            .getWorkspacePayment(paymentId, fields)
            .subscribe((payment) => {
                const calculatePaymentAmountData: CalculatePaymentAmount = {
                    paymentPlanReceips: payment.paymentPlanReceips,
                    netPay: payment.netPay,
                    feePay: payment.feePay,
                    coverPay: payment.coverPay,
                    extraPay: payment.extraPay,
                    taxPay: payment.taxPay,
                    discount: payment.discount,
                    paymentSourceTypeId: payment.paymentSourceTypeId,
                    tickets: payment.tickets,
                    paymentPlanId: payment.paymentPlanId,
                    pendingAmount: payment.pendingAmount,
                    pendingReceipts: payment.pendingReceipts,
                };
                const requestBody: SendReminder = {
                    ...data,
                    contactName: payment.contactShortName,
                    workspaceName: payment.workspaceName,
                    policyNumber: payment.policyNumber,
                    coveredProperty: payment.coveredProperty,
                    insurerName: payment.insurerName,
                    paymentAmount: UtilitiesHelper.calculatePaymentAmount(
                        calculatePaymentAmountData
                    ),
                    currencyName: payment.currencyName,
                    paymentDate: payment.paymentDate,
                    totalReceips: payment.bills,
                    titularName: payment.titularName,
                    insuranceTypeName: payment.insuranceTypeName,
                    insurerShortName: payment.insurerShortName,
                    validityStartDate: payment.validityStartDate,
                    validityEndDate: payment.validityEndDate,
                    paymentPlanName: payment.paymentPlanName,
                    workspaceCollectionWhatsappCode:
                        payment.workspaceCollectionWhatsappCode,
                    workspaceCollectionWhatsappNumber:
                        payment.workspaceCollectionWhatsappNumber,
                    workspaceCollectionPhoneCode:
                        payment.workspaceCollectionPhoneCode,
                    workspaceCollectionPhoneNumber:
                        payment.workspaceCollectionPhoneNumber,
                    workspaceCollectionEmail: payment.workspaceCollectionEmail,
                    insurerId: payment.insurerId,
                    insuranceName: payment.insuranceName,
                    paymentStatusName: payment.paymentStatusName,
                };
                this._sendPaymentReminder(
                    constactId,
                    policyId,
                    paymentId,
                    requestBody
                );
            });
    }

    getReminderData(): Reminder {
        return this.reminderData!;
    }

    saveReminderData(data: Reminder): void {
        this.reminderData = data;
    }

    private _createPaymentReminder(
        constactId: string,
        policyId: string,
        paymentId: string,
        receiptNumber: number,
        whatsappLink: string
    ): void {
        const requsetBody = {
            receiptNumber,
            paymentReminderTypeId: PAYMENT_REMINDER_TYPES.MANUAL,
        };
        this.createPaymentReminder(constactId, policyId, paymentId, requsetBody)
            .pipe(this.takeOne())
            .subscribe(() => {
                this._loadingService.hide();
                AlertHelper.paymentReminderSent();
                this._payTrackerService.reloadContent();
                if (whatsappLink) {
                    this._sendReminderByWhatsapp(whatsappLink);
                }
            });
    }

    private _sendPaymentReminder(
        constactId: string,
        policyId: string,
        paymentId: string,
        requestBody: SendReminder
    ): void {
        this._paymentService
            .sendPaymentReminder(requestBody)
            .pipe(this.takeOne())
            .subscribe((whatsappLink) => {
                this._createPaymentReminder(
                    constactId,
                    policyId,
                    paymentId,
                    requestBody.receiptNumber,
                    whatsappLink
                );
            });
    }

    private _sendReminderByWhatsapp(whatsappLink: string): void {
        const link = document.createElement('a');
        link.target = '_blank';
        link.href = whatsappLink;
        link.click();
        link.remove();
    }
}
