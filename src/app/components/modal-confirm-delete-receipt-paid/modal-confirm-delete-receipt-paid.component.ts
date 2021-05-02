import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-delete-receipt-paid',
  templateUrl: './modal-confirm-delete-receipt-paid.component.html',
  styles: [
  ]
})
export class ModalConfirmDeleteReceiptPaidComponent {
    @Input() modalId: string = '';
    @Output() deleteReceiptPaidConfimed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Click event to confirm delete receipt paid
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.deleteReceiptPaidConfimed.emit();
    }

}
