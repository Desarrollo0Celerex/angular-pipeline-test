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
    @Input() endorsementAmount: number = 0;
    @Input() policyAmount: number = 0;
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
