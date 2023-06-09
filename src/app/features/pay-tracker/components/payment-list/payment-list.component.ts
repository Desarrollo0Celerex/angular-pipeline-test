import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DumbComponent } from '@core/classes/dumb-component';
import { Payment } from '@core/interfaces/payment.interface';
import { RequestReminderData } from '@features/pay-tracker/interfaces/request-reminder-data.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-payment-list',
    templateUrl: './payment-list.component.html',
    styles: [],
})
export class PaymentListComponent extends DumbComponent {
    @Input() contentName: string = '';
    @Input() isLoadedContent: boolean = false;
    @Input() isLoadingContent: boolean = false;
    @Input() noResultsButtonLabel: string = '';
    @Input() noResultsDetails: string = '';
    @Input() noResultsMessage: string = '';
    @Input() payments: Payment[] = [];
    @Input() totalItems: number = 0;
    @Input() isCalendarPage: boolean = false;
    @Output() loadMoreContents: EventEmitter<void> = new EventEmitter<void>();
    @Output() loadPolicy: EventEmitter<void> = new EventEmitter<void>();
    @Output() paymentApplied: EventEmitter<void> = new EventEmitter<void>();
    canReloadPaymentDetails = false;
    canReloadApplyPayment = false;
    canRequestEmail: boolean = false;
    canRequestPhoneNumber: boolean = false;
    data: any = { contactId: '', policyId: '', paymentId: '' };
    modalIdApplyPayment: string = 'agt-modal-apply-payment';
    modalIdConfirmGoToPaymentReceiptsPaid: string =
        'agt-modal-confirm-go-to-payment-receipts-paid';
    modalIdConfirmGoToPaymentReceiptsPending: string =
        'agt-modal-confirm-go-to-payment-receipts-pending';
    modalIdShowPolicyDetails: string = 'agt-modal-show-policy-details';
    modalIdDownloadPolicy: string = 'agt-modal-download-policy';
    modalIdDownloadEndorsement: string = 'agt-modal-download-endorsement';
    modalIdHandlePayment: string = 'agt-modal-handle-payment';
    modalIdRequestReminderData: string = 'agt-modal-request-reminder-data';
    modalIdSelectCalendar: string = 'agt-modal-select-calendar';
    modalIdSelectCancellationType: string =
        'agt-modal-select-cancellation-type';
    modalIdSelectChannelsToSendReminder: string =
        'agt-modal-select-channels-to-send-reminder';
    modalIdSelectPaymentType: string = 'agt-modal-select-payment-type';
    modalIdShowPaymentDetails: string = 'agt-modal-show-payment-details';
    modalIdSyncCalendar: string = 'agt-modal-sync-calendar';
    modalIdUpgradePlan: string = 'agt-modal-upgrade-plan';
    selectedCalendar = 0;
    selectedEventDescription = '';
    selectedEventDate = '';
    selectedEventTime = '';

    constructor() {
        super();
    }

    get hasResults(): boolean {
        return this.payments.length > 0;
    }

    get widthClass(): string {
        return this.isCalendarPage ? 'col-xl-6' : 'col-xl-4';
    }

    reloadContent(): void {
        this.paymentApplied.emit();
    }

    requestLoadMoreContents(): void {
        this.loadMoreContents.emit();
    }

    requestLoadPolicy(): void {
        this.loadPolicy.emit();
    }

    resetCanReloadApplyPayment(): void {
        this.canReloadApplyPayment = false;
    }

    resetCanReloadPaymentDetails(): void {
        this.canReloadPaymentDetails = false;
    }

    trackByPayments(index: number, payment: Payment): string {
        return payment.paymentId;
    }

    showModalToApplyPayment(): void {
        this.canReloadApplyPayment = true;
        ModalPlugin.show(this.modalIdApplyPayment);
    }

    showModalToConfirmGoToPaymentReceiptsPaid(data: any): void {
        this.data = data;
        ModalPlugin.show(this.modalIdConfirmGoToPaymentReceiptsPaid);
    }

    showModalToConfirmGoToPaymentReceiptsPending(data: any): void {
        this.data = data;
        ModalPlugin.show(this.modalIdConfirmGoToPaymentReceiptsPending);
    }

    showModalToShowPolicyDetails(data: any): void {
        this.data = data;
        ModalPlugin.show(this.modalIdShowPolicyDetails);
    }

    showModalToDownloadPolicy(data: any): void {
        this.data = data;
        ModalPlugin.show(this.modalIdDownloadPolicy);
    }

    showModalToDownloadEndorsemment(data: any): void {
        this.data = data;
        ModalPlugin.show(this.modalIdDownloadEndorsement);
    }

    showModalToHandlePayment(data: any): void {
        this.data = data;
        ModalPlugin.show(this.modalIdHandlePayment);
    }

    showModalToRequestReminderData(data: RequestReminderData): void {
        this.canRequestEmail = data.canRequestEmail;
        this.canRequestPhoneNumber = data.canRequestPhoneNumber;
        ModalPlugin.show(this.modalIdRequestReminderData);
    }

    showModalToSelectCalendar(data: {
        eventDate: string;
        eventTime: string;
        eventDescription: string;
    }): void {
        this.selectedEventDate = data.eventDate;
        this.selectedEventTime = data.eventTime;
        this.selectedEventDescription = data.eventDescription;
        ModalPlugin.show(this.modalIdSelectCalendar);
    }

    showModalToSelectCancellationType(data: any): void {
        this.data = data;
        ModalPlugin.show(this.modalIdSelectCancellationType);
    }

    showModalToSelectChannelsToSendReminder(): void {
        this.canRequestEmail = false;
        this.canRequestPhoneNumber = false;
        ModalPlugin.show(this.modalIdSelectChannelsToSendReminder);
    }

    showModalToShowPaymentDetails(data: any): void {
        this.data = data;
        this.canReloadPaymentDetails = true;
        ModalPlugin.show(this.modalIdShowPaymentDetails);
    }

    showModalToSelectPaymentType(): void {
        ModalPlugin.show(this.modalIdSelectPaymentType);
    }

    showModalToSyncCalendar(calendar: number): void {
        this.selectedCalendar = calendar;
        ModalPlugin.show(this.modalIdSyncCalendar);
    }

    showModalToUpgradePlan(): void {
        ModalPlugin.show(this.modalIdUpgradePlan);
    }

    markIsPreauthorized(): void {
        const payment: Payment | undefined = this.payments.find(
            (payment: Payment) => payment.paymentId === this.data.paymentId
        );
        if (payment) {
            payment.isPreauthorizedPayment = '1';
        }
    }
}
