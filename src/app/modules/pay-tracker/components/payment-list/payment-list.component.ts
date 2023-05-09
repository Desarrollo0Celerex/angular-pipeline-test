import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DumbComponent } from '@core/classes/dumb-component';
import { Payment } from '@core/interfaces/payment.interface';

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
    @Output() loadMoreContents: EventEmitter<void> = new EventEmitter<void>();
    @Output() loadPolicy: EventEmitter<void> = new EventEmitter<void>();
    @Output() paymentApplied: EventEmitter<void> = new EventEmitter<void>();
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
    modalIdSelectCancellationType: string =
        'agt-modal-select-cancellation-type';
    modalIdSelectPaymentType: string = 'agt-modal-select-payment-type';
    modalIdShowPaymentDetails: string = 'agt-modal-show-payment-details';

    constructor() {
        super();
    }

    get hasResults(): boolean {
        return this.payments.length > 0;
    }

    notifyPaymentApplied(): void {
        this.paymentApplied.emit();
    }

    requestLoadMoreContents(): void {
        this.loadMoreContents.emit();
    }

    requestLoadPolicy(): void {
        this.loadPolicy.emit();
    }

    trackByPayments(index: number, payment: Payment): string {
        return payment.paymentId;
    }

    showModalToApplyPayment(): void {
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

    showModalToSelectCancellationType(data: any): void {
        this.data = data;
        ModalPlugin.show(this.modalIdSelectCancellationType);
    }

    showModalToShowPaymentDetails(data: any): void {
        this.data = data;
        ModalPlugin.show(this.modalIdShowPaymentDetails);
    }

    showModalToSelectPaymentType(): void {
        ModalPlugin.show(this.modalIdSelectPaymentType);
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
