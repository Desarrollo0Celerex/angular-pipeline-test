import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptPaidService } from '@services/receipt-paid.service';

import { ModalShowReceiptAppliedDetailsComponent } from './modal-show-receipt-applied-details.component';

@NgModule({
  declarations: [
    ModalShowReceiptAppliedDetailsComponent
  ],
  exports: [
      ModalShowReceiptAppliedDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      ReceiptPaidService
  ]
})
export class ModalShowReceiptAppliedDetailsModule { }
