import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-no-fractional-receipt',
  templateUrl: './modal-show-no-fractional-receipt.component.html',
  styles: [
  ]
})
export class ModalShowNoFractionalReceiptComponent {
    @Input() currencyName: string = '';
    @Input() modalId: string = '';
    @Input() newAmount: number = 0;
    @Input() policyAmount: number = 0;
    @Output() endorsementApplicationWithoutFractionalReceiptConfirmed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Click event to confirm apply endorsement without fractional receipt
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.endorsementApplicationWithoutFractionalReceiptConfirmed.emit();
    }

}
