import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-apply-endorsement-with-decrement',
  templateUrl: './modal-confirm-apply-endorsement-with-decrement.component.html',
  styles: [
  ]
})
export class ModalConfirmApplyEndorsementWithDecrementComponent {
    @Input() modalId: string = '';
    @Input() policyAmount: number = 0;
    @Input() newAmount: number = 0;
    @Input() currencyName: string = '';
    @Input() paymentPlanName: string = '';
    @Output() endorsementApplicationConfirmed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Click event to confirm apply endorsement with decrement
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.endorsementApplicationConfirmed.emit();
    }
}
