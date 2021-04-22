import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-no-fractional-receipt',
  templateUrl: './modal-show-no-fractional-receipt.component.html',
  styles: [
  ]
})
export class ModalShowNoFractionalReceiptComponent {
    @Input() modalId: string = '';
    @Output() endorsementApplicationWithoutFractionalReceiptConfirmed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Click event to confirm apply endorsement without fractional receipt
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.endorsementApplicationWithoutFractionalReceiptConfirmed.emit();
    }

}
