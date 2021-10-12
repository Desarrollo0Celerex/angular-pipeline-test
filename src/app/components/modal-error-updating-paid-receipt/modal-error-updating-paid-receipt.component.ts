import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-modal-error-updating-paid-receipt',
  templateUrl: './modal-error-updating-paid-receipt.component.html',
  styles: [
  ]
})
export class ModalErrorUpdatingPaidReceiptComponent {
    @Input() modalId: string = '';
}
