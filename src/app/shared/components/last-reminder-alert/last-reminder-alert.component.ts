import { Component } from '@angular/core';
import { PAYMENT_REMINDER_TYPES } from '@core/constants/settings';
import { PAYMENT_ROUTES } from '@payment/constants/routes';
import { PaymentService } from '@payment/services/payment.service';
import moment from 'moment';

@Component({
    selector: 'agt-last-reminder-alert',
    templateUrl: './last-reminder-alert.component.html',
    styles: [],
    providers: [PaymentService],
    standalone: false
})
export class LastReminderAlertComponent {
    lastReminderDate = '';
    lastReminderTypeId = 0;
    totalReminders = 0;
    paymentRecordUrl = '';
    private _contactId = '';
    private _policyId = '';
    private _paymentId = '';

    constructor(private _paymentService: PaymentService) {}

    get alertIcon(): string {
        return this.lastReminderTypeId === PAYMENT_REMINDER_TYPES.MANUAL
            ? 'fe-bell'
            : 'fe-radio';
    }

    get alertMessage(): string {
        return this.lastReminderTypeId === PAYMENT_REMINDER_TYPES.MANUAL
            ? 'Se envió un recordatorio manual'
            : 'Se envió notificación automática';
    }

    get alertElapsedDays(): number {
        return this.totalReminders > 0
            ? moment().diff(moment(this.lastReminderDate), 'days')
            : 0;
    }

    get canShowAlert(): boolean {
        return this.totalReminders > 0;
    }

    showAlert(data: {
        contactId: string;
        policyId: string;
        paymentId: string;
    }): void {
        this._contactId = data.contactId;
        this._policyId = data.policyId;
        this._paymentId = data.paymentId;
        this._initVariables();
        this._loadPayment();
    }

    hideAlert(): void {
        this._initVariables();
    }

    private _generatePaymentRecordUrl(): string {
        return (
            '/' +
            PAYMENT_ROUTES.policyPaymentsRecord(
                this._contactId,
                this._policyId,
                this._paymentId
            )
        );
    }

    private _initVariables(): void {
        this.lastReminderDate = '';
        this.lastReminderTypeId = 0;
        this.totalReminders = 0;
        this.paymentRecordUrl = this._generatePaymentRecordUrl();
    }

    private _loadPayment(): void {
        const fields = '';
        this._paymentService
            .getWorkspacePayment(this._paymentId, fields)
            .subscribe((payment) => {
                this.lastReminderDate = payment.lastReminderDate;
                this.lastReminderTypeId = payment.lastReminderTypeId;
                this.totalReminders = payment.totalReminders;
            });
    }
}
