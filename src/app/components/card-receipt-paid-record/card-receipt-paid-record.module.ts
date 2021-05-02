import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardReceiptPaidRecordComponent } from './card-receipt-paid-record.component';

@NgModule({
  declarations: [CardReceiptPaidRecordComponent],
  exports: [CardReceiptPaidRecordComponent],
  imports: [
    CommonModule
  ]
})
export class CardReceiptPaidRecordModule { }
