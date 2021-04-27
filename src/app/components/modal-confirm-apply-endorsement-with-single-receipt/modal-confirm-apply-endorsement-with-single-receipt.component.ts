import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'agt-modal-confirm-apply-endorsement-with-single-receipt',
  templateUrl: './modal-confirm-apply-endorsement-with-single-receipt.component.html',
  styles: [
  ]
})
export class ModalConfirmApplyEndorsementWithSingleReceiptComponent {
    @Input() currencyName: string = '';
    @Input() endorsementEmissionDate: string = '';
    @Input() modalId: string = '';
    @Input() newAmount: number = 0;
    @Input() policyAmount: number = 0;
    @Output() endorsementApplicationWithSingleReceipitConfirmed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Click event to confirm the endorsement applicatiion with single receipt
     */
    onClickConfirm(): void {
        this.endorsementApplicationWithSingleReceipitConfirmed.emit();
    }

}
