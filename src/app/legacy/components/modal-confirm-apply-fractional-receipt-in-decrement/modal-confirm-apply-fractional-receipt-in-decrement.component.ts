import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'agt-modal-confirm-apply-fractional-receipt-in-decrement',
    templateUrl: './modal-confirm-apply-fractional-receipt-in-decrement.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmApplyFractionalReceiptInDecrementComponent {
    @Input() modalId = '';
    @Input() policyAmount = 0;
    @Input() endorsementAmount = 0;
    @Input() currencyName = '';
    @Input() fractionalReceiptAmount = 0;
    @Input() fractionalReceiptStartDate = '';
    @Input() fractionalReceiptEndDate = '';
    @Input() paymentPlanName = '';
    @Output() actionConfirmed = new EventEmitter<void>();

    confirmAction(): void {
        this.actionConfirmed.emit();
    }
}
