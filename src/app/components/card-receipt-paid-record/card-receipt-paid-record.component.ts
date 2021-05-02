import { Component, Input, OnInit } from '@angular/core';

import { ReceiptPaid } from '@interfaces/receipt-paid.interface'

@Component({
  selector: 'agt-card-receipt-paid-record',
  templateUrl: './card-receipt-paid-record.component.html',
  styles: [
  ]
})
export class CardReceiptPaidRecordComponent implements OnInit {
    @Input() receiptPaid: ReceiptPaid | null = null;

    constructor() { }

    ngOnInit(): void {
    }

}
