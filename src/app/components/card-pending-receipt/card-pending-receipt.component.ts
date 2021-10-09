import { Component, Input } from '@angular/core';

import { Payment } from '@interfaces/payment.interface';

@Component({
  selector: 'agt-card-pending-receipt',
  templateUrl: './card-pending-receipt.component.html',
  styles: [
  ]
})
export class CardPendingReceiptComponent {
    @Input() pendingReceipt: Payment | null = null;
}
