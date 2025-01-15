import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-apply-endorsement-with-decrement',
    templateUrl: './modal-confirm-apply-endorsement-with-decrement.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmApplyEndorsementWithDecrementComponent {
    @Input() modalId: string = '';
    @Input() policyAmount: number = 0;
    @Input() endorsementAmount: number = 0;
    @Input() currencyName: string = '';
    @Input() paymentPlanName: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

    get endorsementAmountConverted(): number {
        let endorsementAmount: number = parseFloat(this.endorsementAmount.toString());
        return (endorsementAmount < 0) ? endorsementAmount * (-1) : endorsementAmount;
    }
}
