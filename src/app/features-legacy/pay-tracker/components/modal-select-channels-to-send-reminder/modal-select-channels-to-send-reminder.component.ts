import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PAYMENT_REMINDER_TYPES } from '@core/constants/settings';
import { LICENSES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { SmartComponent } from '@core/classes/smart-component';
import { Payment } from '@core/interfaces/payment.interface';
import { LoadingService } from '@core/services/loading/loading.service';
import { PaymentService } from '@core/services/payment/payment.service';
import { Reminder } from '@features-legacy/pay-tracker/interfaces/reminder.interface';
import { RequestReminderData } from '@features-legacy/pay-tracker/interfaces/request-reminder-data.interface';
import { PaymentReminderService } from '@features-legacy/pay-tracker/services/payment-reminder/payment-reminder.service';
import moment from 'moment';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-channels-to-send-reminder',
    templateUrl: './modal-select-channels-to-send-reminder.component.html',
    styles: [],
})
export class ModalSelectChannelsToSendReminderComponent extends SmartComponent {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Input() lastReminderDate: string = '';
    @Input() lastReminderTypeId: number = 0;
    @Input() totalReminders: number = 0;
    @Input() licenseId: number = 0;
    @Input() receiptNumber: number = 0;
    @Output() requestReminderData: EventEmitter<RequestReminderData> =
        new EventEmitter<RequestReminderData>();
    @Output() upgradePlan: EventEmitter<void> = new EventEmitter<void>();
    canShowAlertUpgradePlan = false;
    form: FormGroup = this._buildForm();
    private _canRequestEmail: boolean = false;
    private _canRequestPhoneNumber: boolean = false;
    private _canSendReminderByWallet: boolean = false;
    private _canSendReminderByEmail: boolean = false;
    private _canSendReminderByWhatsapp: boolean = false;
    private _reminderEmail: string = '';
    private _reminderPhoneNumber: string = '';

    constructor(
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _paymentService: PaymentService,
        private _paymentReminderService: PaymentReminderService,
        private _router: Router
    ) {
        super();
    }

    get canSendReminder(): boolean {
        return (
            this.form.controls.whatsapp.value || this.form.controls.email.value
        );
    }

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

    closeModal(): void {
        this._resetData();
        ModalPlugin.hide(this.modalId);
    }

    goToPolicyPaymentsRecord(): void {
        this.closeModal();
        this._router.navigateByUrl(
            ROUTES_NAME.paymentHistory(
                this.contactId,
                this.policyId,
                this.paymentId
            )
        );
    }

    private _resetData(): void {
        this.canShowAlertUpgradePlan = false;
        this._canRequestEmail = false;
        this._canRequestPhoneNumber = false;
        this._canSendReminderByWallet = false;
        this._canSendReminderByEmail = false;
        this._canSendReminderByWhatsapp = false;
        this._reminderEmail = '';
        this._reminderPhoneNumber = '';
        this.form.reset();
    }

    validChannels(): void {
        if (this.totalReminders > 0 && this.licenseId === LICENSES.LITE.ID) {
            this.canShowAlertUpgradePlan = true;
        } else {
            if (!this.canShowAlertUpgradePlan) {
                let fields: string = '';
                if (this.form.controls.whatsapp.value) {
                    this._canSendReminderByWhatsapp = true;
                    fields +=
                        'titularPhoneCode,titularPhoneNumber,paymentsPhoneCode,paymentsPhoneNumber,';
                }
                if (this.form.controls.email.value) {
                    this._canSendReminderByEmail = true;
                    fields += 'titularEmail,paymentsEmail';
                }
                this._loadPaymentData(fields);
            }
        }
    }

    requestUpgradePlan(): void {
        this.closeModal();
        this.upgradePlan.emit();
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            whatsapp: [false],
            email: [false],
        });
    }

    private _loadPaymentData(fields: string = ''): void {
        ModalPlugin.hide(this.modalId);
        this._loadingService.show();
        this._paymentService
            .getWorkspacePayment(this.paymentId, fields)
            .pipe(this.untilComponentDestroy())
            .subscribe((payment) => {
                this._generateReminderData(payment);
            });
    }

    private _generateReminderData(payment: Payment): void {
        if (this._canSendReminderByEmail) {
            this._reminderEmail = payment.titularEmail
                ? payment.titularEmail
                : payment.paymentsEmail
                ? payment.paymentsEmail
                : '';
            this._canRequestEmail = this._reminderEmail ? false : true;
        }
        if (this._canSendReminderByWhatsapp) {
            this._reminderPhoneNumber =
                payment.titularPhoneCode && payment.titularPhoneNumber
                    ? payment.titularPhoneCode +
                      '1' +
                      payment.titularPhoneNumber
                    : payment.paymentsPhoneCode && payment.paymentsPhoneNumber
                    ? payment.paymentsPhoneCode +
                      '1' +
                      payment.paymentsPhoneNumber
                    : '';
            this._canRequestPhoneNumber = this._reminderPhoneNumber
                ? false
                : true;
        }

        const reminderData: Reminder = {
            receiptNumber: this.receiptNumber,
            canSendReminderByWallet: this._canSendReminderByWallet,
            canSendReminderByWhatsapp: this._canSendReminderByWhatsapp,
            canSendReminderByEmail: this._canSendReminderByEmail,
            email: this._reminderEmail,
            phoneNumber: this._reminderPhoneNumber,
        };
        this._paymentReminderService.saveReminderData(reminderData);
        if (this._canRequestEmail || this._canRequestPhoneNumber) {
            this.requestReminderData.emit({
                canRequestEmail: this._canRequestEmail,
                canRequestPhoneNumber: this._canRequestPhoneNumber,
            });
            this._loadingService.hide();
            this._resetData();
        } else {
            this._resetData();
            this._paymentReminderService.generatePaymentReminderData(
                this.contactId,
                this.policyId,
                this.paymentId
            );
        }
    }
}
